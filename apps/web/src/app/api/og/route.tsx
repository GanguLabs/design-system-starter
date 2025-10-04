import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { siteConfig } from '../../../../config/site';

export const runtime = 'edge';

const interBold = fetch(
	new URL('../../../../assets/fonts/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
export async function GET(req: NextRequest) {
	try {
		const fontBold = await interBold;

		const { searchParams } = new URL(req.url);
		const title = searchParams.get('title');
		if (!title || title.length > 100) {
			return new Response('No title provided', { status: 500 });
		}

		const heading = title.length > 140 ? title.slice(0, 140) + '...' : title;

		return new ImageResponse(
			(
				// ref: https://www.youtube.com/watch?v=tSI98g3PDyE&t=2h24m16s
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fff',
						fontSize: 32,
						fontWeight: 600,
					}}
				>
					<svg
						width="75"
						viewBox="0 0 75 65"
						fill="#000"
						style={{ margin: '0 75px' }}
					>
						<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
					</svg>
					<div style={{ marginTop: 40 }}>{siteConfig.name}</div>
					<div>Blog Post</div>
					<div>{heading}</div>
					<div
						style={{
							display: 'flex',
							gap: 16,
							marginTop: 40,
							fontSize: 24,
							fontWeight: 400,
						}}
					>
						<div>{siteConfig.url.replace('https://', '')}</div>
						<div>{siteConfig.author.toString()}</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Inter',
						data: fontBold,
						style: 'normal',
						weight: 700,
					},
				],
			}
		);
	} catch (err) {
		console.log('Error generating OG image', err);
		return new Response('Failed to generate the image', {
			status: 500,
		});
	}
}
