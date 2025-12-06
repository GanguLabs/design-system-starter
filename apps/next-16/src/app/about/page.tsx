import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Me',
	description: 'Learn more about me and my background.',
};

export default function AboutPage() {
	return (
		<div>
			<h1>About Me</h1>
			<div>
				<img
					src="/avatar.jpg"
					alt="Anwesh Gangula"
					style={{ width: '150px', borderRadius: '75px' }}
				/>
				<h2>Anwesh Gangula</h2>
			</div>
			<p>
				I'm a software developer with a passion for building web applications
				and sharing knowledge through blogging.
			</p>
		</div>
	);
}
