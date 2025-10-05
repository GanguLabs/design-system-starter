import {
	dInlineBlock,
	pxMedium,
	pySmall,
} from '@repo/styles/utility-classes.css';
import clsx from 'clsx';

export default function Badge({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={clsx(dInlineBlock, pySmall, pxMedium, className)}
			style={{
				borderRadius: '9999px',
				backgroundColor: '#b3b3b3',
				color: 'black',
				fontSize: '0.75rem',
				fontWeight: 600,
			}}
		>
			{children}
		</span>
	);
}
