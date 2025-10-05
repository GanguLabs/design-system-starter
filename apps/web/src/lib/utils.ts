import { Post } from '@site/content';
import { slug } from 'github-slugger';

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function sortPostsByDate(posts: Array<Post>): Array<Post> {
	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export function getAllTags(posts: Array<Post>) {
	const tags: Record<string, number> = {};
	posts.forEach((post) => {
		post.tags?.forEach((tag) => {
			tags[tag] = (tags[tag] ?? 0) + 1;
		});
	});
	return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
	return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tagSlug: string) {
	return posts.filter((post) => {
		if (!post.tags) return false;
		const slugifiedTags = post.tags.map((tag) => slug(tag));
		return slugifiedTags.includes(tagSlug);
	});
}
