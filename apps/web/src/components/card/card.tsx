export default function Card({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={className + ' my_card'}
			style={{
				borderRadius: '0.5rem',
				backgroundColor: 'rgba(218, 218, 218, 0.39)',
				padding: '1.5rem',
				boxShadow:
					'0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
				transition: 'box-shadow 0.3s ease-in-out',
			}}
		>
			{children}
		</div>
	);
}
