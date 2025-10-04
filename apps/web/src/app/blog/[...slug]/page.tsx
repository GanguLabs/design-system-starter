import { MdxContent } from '@/components/mdx-components/mdx-components';
import '@repo/styles/mdx.css';
import { posts } from '@site/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';

interface PostPageProps {
	params: {
		slug: string[];
	};
}

async function getPostFromParams(params: PostPageProps['params']) {
	const slug = params?.slug?.join('/');
	const post = posts.find((post) => post.slugAsParams === slug);
	if (!post) {
		null;
	}
	return post;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const post = await getPostFromParams(params);

	if (!post) {
		return {
			// title: 'Post Not Found',
		};
	}

	const ogSearchParams = new URLSearchParams();
	ogSearchParams.set('title', post.title);

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			url: post.slug,
			images: [
				{
					url: `/api/og?${ogSearchParams.toString()}`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: [`/api/og?${ogSearchParams.toString()}`],
		},
	};
}

export async function generateStaticParams(): Promise<
	PostPageProps['params'][]
> {
	return posts.map((post) => ({
		slug: post.slug.split('/'), // .slice(1),
	}));
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPostFromParams(params);

	if (!post || !post.published) {
		return notFound();
	}
	return (
		<article>
			<h1>{post.title}</h1>
			{post.description ? <p>{post.description}</p> : null}
			<p>Published on: {new Date(post.date).toDateString()}</p>
			<hr />

			<MdxContent code={post.body} />
		</article>
	);
}
