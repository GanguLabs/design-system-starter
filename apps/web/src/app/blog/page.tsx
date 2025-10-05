import Card from '@/components/card/card';
import { PostItem } from '@/components/post-item/post-item';
import { QueryPagination } from '@/components/query-pagination/query-pagination';
import { Tag } from '@/components/tag/tag';
import { getAllTags, sortPostsByDate, sortTagsByCount } from '@/lib/utils';
import {
	alignContentStart,
	dFlex,
	flexColumn,
} from '@repo/styles/utility-classes.css';
import { posts } from '@site/content';
import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'My Ramblings on all things web dev',
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
	searchParams?: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const page = Number(searchParams?.page || '1');
	const sortedPosts = sortPostsByDate(posts.filter((post) => post.published));
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

	const displayPosts = sortedPosts.slice(
		POSTS_PER_PAGE * (page - 1),
		POSTS_PER_PAGE * page
	);
	const tags = getAllTags(posts);
	const sortedTags = sortTagsByCount(tags);

	return (
		<div>
			<div className={clsx(dFlex, flexColumn, alignContentStart)}>
				<div>
					<h1> Blog </h1>
					<p>My Ramblings on all things web dev</p>
				</div>
			</div>
			<Card className="my-4 p-4">
				<h2>Tags</h2>
				{sortedTags.length > 0 ? (
					<div
						className={clsx(dFlex)}
						style={{ gap: '0.5rem', flexWrap: 'wrap' }}
					>
						{sortedTags.map((tag) => (
							<Tag key={tag} tag={tag} count={tags[tag]} />
						))}
					</div>
				) : (
					<p>No tags found</p>
				)}
			</Card>
			<hr />
			{displayPosts?.length > 0 ? (
				<ul className={clsx(dFlex, flexColumn)}>
					{displayPosts.map(({ slug, title, description, date, tags }) => (
						<li key={slug}>
							<PostItem
								slug={slug}
								title={title}
								description={description}
								date={date}
								tags={tags}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>Nothing to see here</p>
			)}
			<QueryPagination totalPages={totalPages} className="justify-end mt-4" />
		</div>
	);
}
