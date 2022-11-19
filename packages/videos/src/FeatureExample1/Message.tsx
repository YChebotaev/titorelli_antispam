import type {FC, CSSProperties} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const TextLine: FC<{
	size?: number;
	highlighted?: boolean;
}> = ({size, highlighted = false}) => (
	<div
		style={{
			width: size ? `${100 / size}%` : '100%',
			height: 20,
			...(highlighted
				? {
						background:
							'linear-gradient(90deg, hsl(0deg 100% 89%) 0%, hsl(0deg 80% 93%) 100%)',
				  }
				: {
						background:
							'linear-gradient(90deg, rgba(228,228,228,1) 0%, rgba(236,236,236,1) 100%)',
				  }),
		}}
	/>
);

export const Message: FC<{
	lines?: number | number[];
	highlighted?: boolean;
	initialVisible?: boolean;
	style?: CSSProperties;
}> = ({lines = 1, highlighted = false, initialVisible = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'column',
				justifyContent: 'center',
				width: '80%',
				gap: 20,
				padding: 20,
				borderRadius: 15,
				boxShadow: '#00000061 0px 1px 2px -1px',
				opacity: initialVisible
					? 1
					: spring({
							frame,
							fps,
							config: {stiffness: 100},
							durationInFrames: 30,
					  }),
				...(highlighted
					? {
							backgroundColor: '#fff3f3',
					  }
					: {
							backgroundColor: 'white',
					  }),
				...style,
			}}
		>
			{Array.isArray(lines)
				? lines.map((size, i) => (
						<TextLine key={i} size={size} highlighted={highlighted} />
				  ))
				: Array(lines)
						.fill(0)
						.map((_, i) => <TextLine key={i} highlighted={highlighted} />)}
		</div>
	);
};
