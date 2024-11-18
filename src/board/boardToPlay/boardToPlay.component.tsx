import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { IBoardSize, IBoardState } from '../../types/board.types';
import { BoardContainer, GameOverMessage, GameOverTitle, ModalContainer } from '../board.styles';
import { Tile } from '../tile/tile.component';
import { ControlsContainer, Container, IconContainer } from './boardToPlay.styles';
import { getNextBoardState, isGameStuckInCyclicalState, isGameStuckInStableState } from '../../helpers/board.helpers';
import { Button, Modal, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { exportData } from '../../helpers/saving.helpers';

const VOLUME_MARKS = [
	{
	  value: 100,
	  label: '0.1s',
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
	currentTime: number,
	lastTime: number,
	goToTime: (time: number) => void,
	onChange: (newState: IBoardState) => void,
};
export const BoardToPlay = ({ size, state, onChange, history, goToTime, currentTime, lastTime }: Props) => {
	const [isPaused, setIsPaused] = useState(true);
	const [speed, setSpeed] = useState(1000);
	const intervalRef = useRef<NodeJS.Timer>();
	const [showModal, setShowModal] = useState(false);
	const gameOverState = useRef<{ index: number, isCyclical: boolean }>();
	const atCurrentTimeGameIsOver = gameOverState.current?.index === currentTime;

	const isGameOver = () => {
		if (gameOverState.current?.index) return atCurrentTimeGameIsOver;

		if (isGameStuckInStableState(history)) {
			gameOverState.current = { index: currentTime, isCyclical: false };
			return true;
		}
		if (isGameStuckInCyclicalState(history)) {
			gameOverState.current = { index: currentTime, isCyclical: true };
			return true;
		}
		return false;
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const animate = () => {
		// TODO - make this togglable from UI
		if (isGameOver()) {
			setIsPaused(true);
			setShowModal(true);
			clearInterval(intervalRef.current)
			return;
		}
		if (currentTime < lastTime) {
			onChange(history[currentTime + 1]);
		} else {
			onChange(getNextBoardState(state, size));
		}
	};
	const speedToText = useCallback((s: number) => `${(s / 1000).toFixed(1)}s`, []);

	useEffect(() => {
		if (!isPaused) {
			intervalRef.current = setInterval(animate, speed);
			return () => clearInterval(intervalRef.current);
		}
	}, [isPaused, animate, speed]);

	return (
		<Fragment>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<ModalContainer>
					<GameOverTitle>Game Over</GameOverTitle>
					<GameOverMessage>
						{gameOverState.current?.isCyclical ? (
							<>
								<b>Cycle detected: </b>
								from here on, the board pattern would only repeat itself
							</>
						) : (
							<>
								<b>End of life: </b>
								there are no more living cells
							</>
						)}
					</GameOverMessage>
					<Button onClick={() => setShowModal(false)} variant='contained'>Close</Button>
				</ModalContainer>
			</Modal>
			<BoardContainer $size={size}>
				{state.map((isAlive, index) => (
					<Tile
						key={index}
						index={index}
						isAlive={isAlive}
					/>
				))}
			</BoardContainer>
			<br />
			<ControlsContainer>
				<IconContainer disabled={!isPaused || currentTime <= 1} onClick={() => goToTime(0)}>
					<FastRewindIcon />
				</IconContainer>
				<IconContainer disabled={!isPaused || currentTime === 0} onClick={() => goToTime(currentTime - 1)}>
					<SkipPreviousIcon />
				</IconContainer>
				{atCurrentTimeGameIsOver ? (
					<IconContainer disabled>
						<StopIcon />
					</IconContainer>
				) : (
					<IconContainer onClick={() => setIsPaused(!isPaused)}>
						{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
					</IconContainer>
				)}
				<IconContainer disabled={!isPaused || currentTime === lastTime} onClick={() => goToTime(currentTime + 1)}>
					<SkipNextIcon />
				</IconContainer>
				<IconContainer disabled={!isPaused || currentTime >= (lastTime - 1)} onClick={() => goToTime(lastTime)}>
					<FastForwardIcon />
				</IconContainer>
			</ControlsContainer>
			<br />
			<Container>
				<Slider
					aria-label="Speed"
					getAriaValueText={speedToText}
					valueLabelFormat={speedToText}
					value={speed}
					onChange={(e, value) => setSpeed(value as number)}
					max={2000}
					min={100}
					step={100}
					valueLabelDisplay="auto"
					marks={VOLUME_MARKS}
				/>
				<Button onClick={() => exportData(history, size)} variant='contained'>Export</Button>
			</Container>
		</Fragment>
	);
};
