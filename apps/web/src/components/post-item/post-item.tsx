import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface PostItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
}

export function PostItem({ slug, title, description, date }: PostItemProps) {
	return (
		<article>
			<div>
				<h2>
					<Link href={slug}>{title}</Link>
				</h2>
			</div>

			{description && <p>{description}</p>}
			<div>
				<dl>
					<dt>Published on</dt>
					<dd>
						<small>{formatDate(date)}</small>
					</dd>
				</dl>
				<Link href={slug}>Read more</Link>
			</div>
		</article>
	);
}
