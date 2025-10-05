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
			style={{
				background: current ? 'white' : 'black',
				color: current ? 'black' : 'white',
				borderRadius: '9999px',
				fontSize: '0.75rem',
				fontWeight: 600,
				textDecoration: 'none',
			}}
			href={`/tags/${slug(tag)}`}
		>
			{tag} {count && <span>({count})</span>}
		</Link>
	);
}
