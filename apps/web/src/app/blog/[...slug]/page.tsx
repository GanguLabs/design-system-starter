import { MdxContent } from '@/components/mdx-components/mdx-components';
import { posts } from '@site/content';
import { notFound } from 'next/navigation';

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
