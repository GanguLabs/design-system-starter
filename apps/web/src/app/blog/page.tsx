import { PostItem } from '@/components/post-item/post-item';
import { sortPostsByDate } from '@/lib/utils';
import {
	alignContentStart,
	dFlex,
	flexColumn,
} from '@repo/styles/utility-classes.css';
import { posts } from '@site/content';
import clsx from 'clsx';

export default async function BlogPage() {
	const sortedPosts = sortPostsByDate(posts.filter((post) => post.published));
	const displayPosts = sortedPosts;
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
		</div>
	);
}
