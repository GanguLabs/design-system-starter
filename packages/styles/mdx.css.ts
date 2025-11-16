import { globalStyle } from '@vanilla-extract/css';

globalStyle('[data-rehype-pretty-code-figure] pre', {
	padding: 'inherit 0',
});

globalStyle('[data-rehype-pretty-code-figure] code', {
	fontSize: '0.875rem',
	lineHeight: '1.625',
	border: '0',
	padding: '0',
});

globalStyle('[data-rehype-pretty-code-figure] code[data-line-numbers]', {
	counterReset: 'line',
});

globalStyle(
	'[data-rehype-pretty-code-figure] code[data-line-numbers] > [data-line]::before',
	{
		counterIncrement: 'line',
		content: 'counter(line)',
		marginRight: '1rem',
		display: 'inline-block',
		width: '1rem',
		textAlign: 'right',
		color: '#6b7280', // text-gray-500
	}
);

globalStyle('[data-rehype-pretty-code-figure] [data-line]', {
	borderLeft: '2px solid transparent',
	padding: '0 0.75rem',
});

globalStyle('[data-rehype-pretty-code-figure] [data-highlighted-line]', {
	background: 'rgba(200, 200, 255, 0.1)',
	borderLeft: '2px solid #60a5fa', // border-l-blue-400
});

globalStyle('[data-rehype-pretty-code-figure] [data-highlighted-chars]', {
	borderRadius: '0.25rem',
	backgroundColor: 'rgba(63, 63, 70, 0.5)', // bg-zinc-600/50
	boxShadow: '0 0 0 4px rgba(82, 82, 91, 0.5)',
});

globalStyle('[data-rehype-pretty-code-figure] [data-chars-id]', {
	borderBottom: '2px solid',
	padding: '0.25rem',
	boxShadow: 'none',
});

globalStyle('[data-rehype-pretty-code-figure] [data-chars-id]:hover', {
	backgroundColor: 'rgba(100, 100, 100, 0.1)',
});
