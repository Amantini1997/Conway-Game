import { IBoardSize, IBoardState, ITile, NeighbourhoodIndexes } from '../types/board.types'
import { isEqual } from 'lodash';

const getNextTileState = (tile: ITile, neighbourTiles: ITile[]) => {
	const aliveNeighbours = neighbourTiles.filter((isAlive) => isAlive).length;
	// A tile that is dead at time step t will be alive at time step t+1 if
	// exactly three of its eight neighbors were alive at time step t.
	if (!tile && aliveNeighbours === 3) return true;

	// A tile that is alive at time step t will remain alive at time step
	// if two or three of its neighbors are alive at time step t.
	if (tile) return [2, 3].includes(aliveNeighbours);

	return false; 
}

const cachedNeighbourhoods: Record<string, NeighbourhoodIndexes[]> = {};
export const getNeighbourhoods = ({ cols, rows }: IBoardSize) => {
	let neighbourhoods = cachedNeighbourhoods[`${cols}-${rows}`];
	if (neighbourhoods) return neighbourhoods;
	neighbourhoods = [];

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const neighbours = [];
			const transformations = [
				[-1, -1], [-1, 0], [-1, 1],
				[ 0, -1],          [ 0, 1],
				[ 1, -1], [ 1, 0], [ 1, 1]
			];

			for (const [tr, tc] of transformations) {
				const newRow = row + tr;
				const newCol = col + tc;
				
				if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
					const neighborIndex = newRow * cols + newCol;
					neighbours.push(neighborIndex);
				}
			}
			
			neighbourhoods.push(neighbours);
		}
	}
	cachedNeighbourhoods[`${cols}-${rows}`] = neighbourhoods;
	return neighbourhoods;
}

const getNeighbours = (neighbourhood: NeighbourhoodIndexes, boardState: IBoardState) => neighbourhood.map((i) => boardState[i]);

export const getNextBoardState = (boardState: IBoardState, boardSize: IBoardSize) => {
	const neighbourhoods = getNeighbourhoods(boardSize);
	return boardState
		.map((tile, index) => getNextTileState(tile, getNeighbours(neighbourhoods[index], boardState) ));
};

export const isGameStuckInCyclicalState = (history: IBoardState[]) => {
	if (history.length <= 1) return false;
	return isEqual(history.at(-1), history.at(-3));
};

export const isGameStuckInStableState = (history: IBoardState[]) => {
	if (history.length <= 1) return false;
	return isEqual(history.at(-1), history.at(-2));
};