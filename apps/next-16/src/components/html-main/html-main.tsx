import { ReactNode } from 'react';
import { htmlMainStyles } from './html-main.css';

export default function HtmlMain({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return <main className={htmlMainStyles}>{children}</main>;
}
