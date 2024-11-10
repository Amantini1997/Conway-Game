import { Button } from '@mui/material';
import { Fragment, useCallback, useRef, useState } from 'react';
import { IBoardSize, IBoardState, ITile } from '../../types/board.types';
import { BoardContainer } from '../board.styles';
import { BottomSection, ButtonsContainer, Caption } from './boardToInitialise.styles';
import { Tile } from '../tile/tile.component';

const NO_PREVIOUS_TOGGLED_TILE = -1;
type Props = { size: IBoardSize, onSubmit: (board: IBoardState) => void };
export const BoardToInitialise = ({ size, onSubmit }: Props) => {
	const isMouseDown = useRef(false);
	const tiles = useRef<ITile[]>(new Array(size.rows * size.cols).fill(false));
	const lastTileToggled = useRef(NO_PREVIOUS_TOGGLED_TILE);
	const setTilesAliveStatusRef = useRef([]);
	const [resetKey, setResetKey] = useState(0);

	const reset = useCallback(() => {
		tiles.current = new Array(size.rows * size.cols).fill(false);
		lastTileToggled.current = NO_PREVIOUS_TOGGLED_TILE;
		setResetKey((key) => key + 1);
	}, [size]);

	const toggleTile = useCallback((index: number) => {
		lastTileToggled.current = index;
		const newState = !tiles.current[index];
		tiles.current[index] = newState;
		const setIsAliveTileAtIndex = setTilesAliveStatusRef.current[index] as any;
		setIsAliveTileAtIndex?.(newState);
	}, []);

	const startSelection = useCallback((index: number) => {
		toggleTile(index);
		isMouseDown.current = true;
	}, [toggleTile]);
	const endSelection = useCallback(() => isMouseDown.current = false, []);
	const onMouseMoveOnTile = useCallback((index: number) => {
		if (isMouseDown.current && lastTileToggled.current !== index) {
			toggleTile(index);
		}
	}, [toggleTile]);

	return (
		<Fragment>
			<BoardContainer
				key={resetKey}
				$size={size}
				$togglable
				onMouseUp={endSelection}
				onMouseLeave={endSelection}
			>
				{tiles.current.map((isAlive, index) => (
					<Tile
						ref={setTilesAliveStatusRef}
						key={index}
						index={index}
						isAlive={isAlive}
						onMouseDown={() => startSelection(index)}
						onMouseMove={() => onMouseMoveOnTile(index)}
					/>
				))}
			</BoardContainer>
			<BottomSection>
				<Caption>
					Click on a tile or keep the mouse pressed and drag it over any tiles
					<br />
					to toggle their status (alive/dead).
				</Caption>
				<ButtonsContainer>
					<Button variant='contained' onClick={reset}>Reset</Button>
					<Button variant='outlined' onClick={() => onSubmit(tiles.current)}>Start</Button>
				</ButtonsContainer>
			</BottomSection>
		</Fragment>
	);
};
