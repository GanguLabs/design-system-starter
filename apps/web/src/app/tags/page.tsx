import { Tag } from '@/components/tag/tag';
import { getAllTags, sortTagsByCount } from '@/lib/utils';
import { posts } from '@site/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tags',
	description: 'Topics I have written about',
};

export default async function TagsPage() {
	const tags = getAllTags(posts);
	const sortedTags = sortTagsByCount(tags);

	return (
		<div>
			<h1>Tags</h1>
			<p>Topics I have written about</p>
			<hr />
			{sortedTags.length > 0 ? (
				<ul>
					{sortedTags.map((tag) => (
						<li key={tag} style={{ display: 'inline', marginRight: '10px' }}>
							<Tag tag={tag} count={tags[tag]} />
						</li>
					))}
				</ul>
			) : (
				<p>No tags found</p>
			)}
		</div>
	);
}
