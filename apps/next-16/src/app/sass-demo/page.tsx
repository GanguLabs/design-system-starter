import type { Metadata } from 'next';
import '../../styles/sass-globals.scss';
import variables from './sass-demo.module.scss';

export const metadata: Metadata = {
	title: 'Sass Demo',
	description: 'Demo page using SASS',
};

export default function SassDemo() {
	return (
		<div>
			<h1>Demo page using SASS</h1>
			<div>
				<h2 className="italic">Anwesh Gangula</h2>
			</div>
			<p style={{ color: variables.primaryColor }}>
				I'm a software developer with a passion for building web applications
				and sharing knowledge through blogging.
			</p>

			<ul>
				<li className='red'>Red</li>
				<li className='secondary'>Green</li>
				<li>Blue</li>
			</ul>
		</div>
	);
}
