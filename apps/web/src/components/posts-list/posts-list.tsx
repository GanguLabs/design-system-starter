import { sortPostsByDate } from '@/lib/utils';
import { posts } from '@site/content';
import { PostItem } from '../post-item/post-item';

export default function PostsList() {
	const latestPosts = sortPostsByDate(
		posts.filter((post) => post.published)
	).slice(0, 5);
	return (
		<section className="postList">
			<h2>Latest Posts</h2>
			<ul>
				{latestPosts.map(({ slug, title, description, date, tags }) => (
					<li key={slug} className="postItem">
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
		</section>
	);
}
