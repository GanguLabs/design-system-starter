// import AnimatedLogo from '@/components/SVG/Logo/AnimatedLogo';
// import PostListPage from './blog/page';
import { metadata } from '@/app/layout';
import { gradientText, hero } from './home.css';

export default function Home() {
	return (
		<>
			<div className={hero}>
				{/* <AnimatedLogo
					animateOnce={true}
					initialInView={false}
					className={'m-auto animatedLogo'}
				/> */}
				<div>
					<div>
						<big aria-hidden="true">👋</big>
						<p>Hi, I am</p> {/* changes for narrator - accessibility */}
					</div>
					<h1 className={gradientText}>Anwesh Gangula</h1>
					<p>{metadata.description}</p>
					<p>
						Welcome to my "Digital Garden". This is where I would like to share
						& showcase:
					</p>
					<ul>
						<li>🏗️ things i'm building</li>
						<li>🎋 what I'm currently learning</li>
						<li>🥰 and things that inspire me</li>
					</ul>
					{/* <p>
						Added D3 JS implementation in Nextjs - <Link href={"./d3_Next13"}>here</Link>
					</p> */}
				</div>
			</div>
			{/* <section className="postList">
				<PostListPage />
			</section> */}
		</>
	);
}
