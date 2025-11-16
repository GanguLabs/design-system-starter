import { Post } from '@site/content';

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
