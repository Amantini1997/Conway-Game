import { Button } from '@mui/material';
import { Fragment, useCallback, useRef } from 'react';
import { IBoardSize, IBoardState } from '../../types/board.types';
import { BoardContainer } from '../board.styles';
import { BottomSection, ButtonsContainer, Caption } from './boardToInitialise.styles';
import { Cell } from '../cell/cell.component';

type Props = { size: IBoardSize, onSubmit: (board: IBoardState) => void };
export const BoardToInitialise = ({ size, onSubmit }: Props) => {
	const isMouseDown = useRef(false);
	const cells = useRef<boolean[]>(new Array(size.rows * size.cols).fill(false));
	const lastCellToggled = useRef(-1);
	const setCellsAliveStatusRef = useRef([]);

	const resetState = useCallback(() => {
		cells.current = new Array(size.rows * size.cols).fill(false);
		lastCellToggled.current = -1;
	}, [size]);

	const toggleCell = useCallback((index: number) => {
		if (lastCellToggled.current === index) return;
		lastCellToggled.current = index;
		const newState = !cells.current[index];
		cells.current[index] = newState;
		const setIsAliveCellAtIndex = setCellsAliveStatusRef.current[index] as any;
		setIsAliveCellAtIndex?.(newState);
	}, []);

	const startSelection = useCallback(() => { isMouseDown.current = true }, []);
	const endSelection = useCallback(() => { isMouseDown.current = false }, []);
	const toggleStateIfMouseIsDown = useCallback((index: number) => {
		if (isMouseDown.current) {
			toggleCell(index);
		}
	}, [toggleCell]);

	return (
		<Fragment>
			<BoardContainer
				$size={size}
				$togglable
				onMouseDown={startSelection}
				onMouseUp={endSelection}
				onMouseLeave={endSelection}
			>
				{cells.current.map((isAlive, index) => (
					<Cell
						ref={setCellsAliveStatusRef}
						key={index}
						index={index}
						isAlive={isAlive}
						onMouseMove={() => toggleStateIfMouseIsDown(index)}
						onClick={() => toggleCell(index)}
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
					<Button variant='contained' onClick={resetState}>Reset</Button>
					<Button variant='outlined' onClick={() => onSubmit(cells.current)}>Confirm</Button>
				</ButtonsContainer>
			</BottomSection>
		</Fragment>
	);
};
