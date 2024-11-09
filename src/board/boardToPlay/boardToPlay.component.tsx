import { Fragment, useEffect, useRef, useState } from 'react';
import { IBoardSize, IBoardState } from '../../types/board.types';
import { BoardContainer } from '../board.styles';
import { Cell } from '../cell/cell.component';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { PlayPauseContainer } from './boardToPlay.styles';
import { getNextBoardState } from '../../helpers/helpers';

type Props = {
	size: IBoardSize,
	state: IBoardState,
	onChange: (newState: IBoardState) => void,
};
export const BoardToPlay = ({ size, state, onChange }: Props) => {
	const [isPaused, setIsPaused] = useState(true);
	const intervalRef = useRef<NodeJS.Timer>();

	const animate = () => onChange(getNextBoardState(state, size));

	useEffect(() => {
		if (!isPaused) {
			intervalRef.current = setInterval(animate, 500);
			return () => clearTimeout(intervalRef.current);
		}
	// eslint-disable-next-line
	}, [isPaused]);

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
			<PlayPauseContainer onClick={() => setIsPaused(!isPaused)}>
				{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
			</PlayPauseContainer>
		</Fragment>
	);
};
