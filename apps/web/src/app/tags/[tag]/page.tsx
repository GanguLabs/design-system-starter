import { PostItem } from '@/components/post-item/post-item';
import { Tag } from '@/components/tag/tag';
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/utils';
import { posts } from '@site/content';
import { slug } from 'github-slugger';

interface TagePageProps {
	params: {
		tag: string;
	};
}

export default function TagPage({ params }: TagePageProps) {
	const { tag } = params;
	const title = tag.split('-').join(' ');

	const displayPosts = getPostsByTagSlug(posts, tag);
	const tags = getAllTags(posts);
	const sortedTags = sortTagsByCount(tags);

	return (
		<div>
			<div>
				<h1>Tag: {title}</h1>
				<p>Posts tagged with "{title}"</p>
			</div>
			<hr />
			{displayPosts.length > 0 ? (
				<ul>
					{displayPosts.map(({ slug, title, description, date, tags }) => (
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
			) : (
				<p>No posts found for this tag.</p>
			)}

			{sortedTags.length > 0 && (
				<div style={{ marginTop: '2rem' }}>
					<h2>Other Tags</h2>
					<ul>
						{sortedTags.map((t) => (
							<li key={t} style={{ display: 'inline', marginRight: '10px' }}>
								<Tag
									key={t}
									tag={t}
									count={tags[t]}
									current={slug(t) === tag}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
