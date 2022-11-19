import type {FC} from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	Series,
	useCurrentFrame,
	useVideoConfig,
	spring,
} from 'remotion';
import {Message} from './Message';

export const FeatureExample1: FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	return (
		<AbsoluteFill color="white">
			<Series>
				<Series.Sequence durationInFrames={60}>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top: 10,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 1, 2]}
						style={{
							position: 'absolute',
							top: 90,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top: 250,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={2}
						style={{
							position: 'absolute',
							top: 330,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 4]}
						style={{
							position: 'absolute',
							top: 450,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[2, 1, 1]}
						style={{
							position: 'absolute',
							top: 570,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 3, 3]}
						style={{
							position: 'absolute',
							top: 730,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={4}
						style={{
							position: 'absolute',
							top: 890,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={13}
						style={{
							position: 'absolute',
							top: 1090,
							left: 20,
							width: 520,
						}}
					/>
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top:
								10 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 1, 2]}
						style={{
							position: 'absolute',
							top:
								90 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top:
								250 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={2}
						style={{
							position: 'absolute',
							top:
								330 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 4]}
						style={{
							position: 'absolute',
							top:
								450 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[2, 1, 1]}
						style={{
							position: 'absolute',
							top:
								570 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 3, 3]}
						style={{
							position: 'absolute',
							top:
								730 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={4}
						style={{
							position: 'absolute',
							top:
								890 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={13}
						style={{
							position: 'absolute',
							top:
								1090 -
								spring({
									frame: frame - 20,
									fps,
									from: 0,
									to: 580,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top: 10 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 1, 2]}
						style={{
							position: 'absolute',
							top: 90 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top: 250 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={2}
						style={{
							position: 'absolute',
							top: 330 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 4]}
						style={{
							position: 'absolute',
							top: 450 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[2, 1, 1]}
						style={{
							position: 'absolute',
							top: 570 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 3, 3]}
						style={{
							position: 'absolute',
							top: 730 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={4}
						style={{
							position: 'absolute',
							top: 890 - 580,
							left: 20,
							width: 520,
						}}
					/>
					<Message
						highlighted
						lines={13}
						style={{
							position: 'absolute',
							top: 1090 - 580,
							left: 20,
							width: 520,
						}}
					/>
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top:
								10 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 1, 2]}
						style={{
							position: 'absolute',
							top:
								90 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={1}
						style={{
							position: 'absolute',
							top:
								250 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={2}
						style={{
							position: 'absolute',
							top:
								330 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 4]}
						style={{
							position: 'absolute',
							top:
								450 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[2, 1, 1]}
						style={{
							position: 'absolute',
							top:
								570 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={[1, 3, 3]}
						style={{
							position: 'absolute',
							top:
								730 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						lines={4}
						style={{
							position: 'absolute',
							top:
								890 -
								spring({
									frame: frame - 60,
									fps,
									from: 580,
									to: 0,
									durationInFrames: 30,
									config: {stiffness: 10},
								}),
							left: 20,
							width: 520,
						}}
					/>
					<Message
						highlighted
						lines={13}
						style={{
							position: 'absolute',
							top: 1090 - 580,
							opacity: spring({
								frame: frame - 60,
								fps,
								from: 1,
								to: 0,
								durationInFrames: 30,
								config: {stiffness: 10},
							}),
							left: 20,
							width: 520,
						}}
					/>
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
