interface CalloutProps {
	type?: 'info' | 'warning' | 'error' | 'success';
	children?: React.ReactNode;
}

export function Callout({ type = 'info', children, ...props }: CalloutProps) {
	let bgColor;
	let borderColor;
	let textColor;

	// TODO: remove auto-generated condition for tailwind below
	switch (type) {
		case 'info':
			bgColor = 'bg-blue-50';
			borderColor = 'border-blue-400';
			textColor = 'text-blue-800';
			break;
		case 'warning':
			bgColor = 'bg-yellow-50';
			borderColor = 'border-yellow-400';
			textColor = 'text-yellow-800';
			break;
		case 'error':
			bgColor = 'bg-red-50';
			borderColor = 'border-red-400';
			textColor = 'text-red-800';
			break;
		case 'success':
			bgColor = 'bg-green-50';
			borderColor = 'border-green-400';
			textColor = 'text-green-800';
			break;
		default:
			bgColor = 'bg-gray-50';
			borderColor = 'border-gray-400';
			textColor = 'text-gray-800';
	}

	return (
		<div
			className={`rounded-md p-4 ${bgColor} border-l-4 ${borderColor} ${textColor}`}
			{...props}
		>
			{children}
		</div>
	);
}
