import { dFlex } from '@repo/styles/utility-classes.css';
import clsx from 'clsx';

export function SiteFooter() {
	return (
		<footer>
			<div className={clsx(dFlex)} style={{ gap: '1rem' }}>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="mailto:company@email.com"
				>
					Mail
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://twitter.com/anweshgangula"
				>
					Twitter
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://GitHub.com/anweshgangula"
				>
					GitHub
				</a>
			</div>
			<p>© 2024 anwesh Gangula</p>
		</footer>
	);
}
