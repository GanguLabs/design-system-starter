'use client';
import { useAdaptiveTheme } from './use-adaptive-theme';

export default function DemoPage() {
	const { lightness, setLightness, wrapper } = useAdaptiveTheme();
	const scales = wrapper.getNormalizedScales();

	return (
		<div
			className="p-8 min-h-screen"
			style={{ backgroundColor: 'var(--app-bg)' }}
		>
			<header className="mb-8 p-4 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
				<h1 className="text-xl font-bold mb-4">Leonardo Adaptive Demo</h1>

				<div className="flex flex-col gap-4">
					<label>
						Brightness (Lightness): {lightness}%
						<input
							type="range"
							min="0"
							max="100"
							value={lightness}
							onChange={(e) => setLightness(Number(e.target.value))}
							className="w-full"
						/>
					</label>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{scales.map((scale) => (
					<div key={scale.colorName} className="flex flex-col gap-2">
						<h2 className="font-mono text-sm uppercase">{scale.colorName}</h2>
						<div className="flex h-24 rounded-lg overflow-hidden border border-black/10">
							{scale.swatches.map((swatch) => (
								<div
									key={swatch.key}
									className="flex-1 flex items-center justify-center text-[10px] font-bold"
									style={{ backgroundColor: swatch.value }}
								>
									{swatch.key}
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<section
				className="mt-12 p-10 rounded-xl"
				style={{ backgroundColor: 'var(--gray-bg)', color: 'var(--gray-text)' }}
			>
				<h3 className="text-2xl font-bold">Contrast-Safe Container</h3>
				<p>
					This text always maintains a 4.5:1 ratio against the background color
					above.
				</p>
				<button
					className="mt-4 px-6 py-2 rounded"
					style={{
						backgroundColor: 'var(--blue-high)',
						color: 'var(--app-bg)',
					}}
				>
					Accessible Button
				</button>
			</section>
		</div>
	);
}
