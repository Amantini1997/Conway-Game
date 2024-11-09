import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ExportBoardData, IBoardSize, IBoardState } from '../../types/board.types';
import { BoardContainer } from '../board.styles';
import { Cell } from '../cell/cell.component';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { PlayPauseContainer, Container } from './boardToPlay.styles';
import { getNextBoardState } from '../../helpers/helpers';
import { Button, Slider } from '@mui/material';

const VOLUME_MARKS = [
	{
	  value: 500,
	  label: '0.5s',
	},
	{
	  value: 2000,
	  label: '2s',
	},
];

type Props = {
	size: IBoardSize,
	state: IBoardState,
	history: IBoardState[],
	onChange: (newState: IBoardState) => void,
};
export const BoardToPlay = ({ size, state, history, onChange }: Props) => {
	const [isPaused, setIsPaused] = useState(true);
	const [speed, setSpeed] = useState(1000);
	const intervalRef = useRef<NodeJS.Timer>();

	const exportBoard = () => {
		const link = document.createElement("a");
		const data: ExportBoardData = { history, size };
		link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
		link.download = `conway_game_board_${size.cols}_x_${size.rows}.json`;
		link.click();
	};

	const animate = useCallback(() => {
		onChange(getNextBoardState(state, size));
	}, [state, size, onChange]);

	const speedToText = useCallback((s: number) => `${(s / 1000).toFixed(2)}s`, []);

	useEffect(() => {
		if (!isPaused) {
			intervalRef.current = setInterval(animate, speed);
			return () => clearInterval(intervalRef.current);
		}
	}, [isPaused, animate, speed]);

	return (
		<Fragment>
			<BoardContainer $size={size}>
				{state.map((isAlive, index) => (
					<Cell
						key={index}
						index={index}
						isAlive={isAlive}
					/>
				))}
			</BoardContainer>
			<br />
			<PlayPauseContainer onClick={() => setIsPaused(!isPaused)}>
				{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
			</PlayPauseContainer>
			<br />
			<Container>
				<Slider
					aria-label="Speed"
					getAriaValueText={speedToText}
					valueLabelFormat={speedToText}
					value={speed}
					onChange={(e, value) => setSpeed(value as number)}
					max={2000}
					min={500}
					step={100}
					valueLabelDisplay="auto"
					marks={VOLUME_MARKS}
				/>
				<Button onClick={exportBoard} variant='contained'>Export</Button>
			</Container>
		</Fragment>
	);
};
