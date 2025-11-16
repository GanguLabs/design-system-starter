import { pxSmall } from '@repo/styles/utility-classes.css';
import { slug } from 'github-slugger';
import Link from 'next/link';
interface TagProps {
	tag: string;
	current?: boolean;
	count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
	return (
		<Link
			className={pxSmall}
			style={{ background: current ? 'darkgray' : 'black' }}
			href={`/tags/${slug(tag)}`}
		>
			{tag}
		</Link>
	);
}
