import { Button } from '@mui/material';
import { Fragment, useCallback, useRef, useState } from 'react';
import { IBoardSize, IBoardState } from '../../types/board.types';
import { BoardContainer } from '../board.styles';
import { BottomSection, ButtonsContainer, Caption } from './boardToInitialise.styles';
import { Cell } from '../cell/cell.component';

const NO_PREVIOUS_TOGGLED_CELL = -1;
type Props = { size: IBoardSize, onSubmit: (board: IBoardState) => void };
export const BoardToInitialise = ({ size, onSubmit }: Props) => {
	const isMouseDown = useRef(false);
	const cells = useRef<boolean[]>(new Array(size.rows * size.cols).fill(false));
	const lastCellToggled = useRef(NO_PREVIOUS_TOGGLED_CELL);
	const setCellsAliveStatusRef = useRef([]);
	const [resetKey, setResetKey] = useState(0);

	const reset = useCallback(() => {
		cells.current = new Array(size.rows * size.cols).fill(false);
		lastCellToggled.current = NO_PREVIOUS_TOGGLED_CELL;
		setResetKey((key) => key + 1);
	}, [size]);

	const toggleCell = useCallback((index: number) => {
		lastCellToggled.current = index;
		const newState = !cells.current[index];
		cells.current[index] = newState;
		const setIsAliveCellAtIndex = setCellsAliveStatusRef.current[index] as any;
		setIsAliveCellAtIndex?.(newState);
	}, []);

	const startSelection = useCallback((index: number) => {
		toggleCell(index);
		isMouseDown.current = true;
	}, [toggleCell]);
	const endSelection = useCallback(() => isMouseDown.current = false, []);
	const onMouseMoveOnCell = useCallback((index: number) => {
		if (isMouseDown.current && lastCellToggled.current !== index) {
			toggleCell(index);
		}
	}, [toggleCell]);

	return (
		<Fragment>
			<BoardContainer
				key={resetKey}
				$size={size}
				$togglable
				onMouseUp={endSelection}
				onMouseLeave={endSelection}
			>
				{cells.current.map((isAlive, index) => (
					<Cell
						ref={setCellsAliveStatusRef}
						key={index}
						index={index}
						isAlive={isAlive}
						onMouseDown={() => startSelection(index)}
						onMouseMove={() => onMouseMoveOnCell(index)}
					/>
				))}
			</BoardContainer>
			<BottomSection>
				<Caption>
					Click on a cell or keep the mouse pressed and drag it over any cells
					<br />
					to toggle their status (alive/dead).
				</Caption>
				<ButtonsContainer>
					<Button variant='contained' onClick={reset}>Reset</Button>
					<Button variant='outlined' onClick={() => onSubmit(cells.current)}>Confirm</Button>
				</ButtonsContainer>
			</BottomSection>
		</Fragment>
	);
};
