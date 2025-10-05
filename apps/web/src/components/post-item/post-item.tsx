import { formatDate } from '@/lib/utils';
import { dFlex } from '@repo/styles/utility-classes.css';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from '../tag/tag';

interface PostItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
	tags?: string[];
}

export function PostItem({
	slug,
	title,
	description,
	date,
	tags,
}: PostItemProps) {
	return (
		<article>
			<div>
				<h2>
					<Link href={'/' + slug}>{title}</Link>
				</h2>
			</div>

			{description && <p>{description}</p>}
			{tags && (
				<div
					className={clsx(dFlex)}
					style={{ gap: '0.5rem', flexWrap: 'wrap' }}
				>
					{tags.map((tag) => (
						<Tag key={tag} tag={tag} />
					))}
				</div>
			)}
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
