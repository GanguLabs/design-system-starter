import { PostItem } from '@/components/post-item/post-item';
import { QueryPagination } from '@/components/query-pagination/query-pagination';
import { sortPostsByDate } from '@/lib/utils';
import {
	alignContentStart,
	dFlex,
	flexColumn,
} from '@repo/styles/utility-classes.css';
import { posts } from '@site/content';
import clsx from 'clsx';

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
	return (
		<div>
			<div className={clsx(dFlex, flexColumn, alignContentStart)}>
				<div>
					<h1> Blog </h1>
					<p>My Ramblings on all things web dev</p>
				</div>
			</div>
			<hr />
			{displayPosts?.length > 0 ? (
				<ul className={clsx(dFlex, flexColumn)}>
					{displayPosts.map(({ slug, title, description, date }) => (
						<li key={slug}>
							<PostItem
								slug={slug}
								title={title}
								description={description}
								date={date}
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
