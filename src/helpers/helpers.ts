import { IBoardSize, IBoardState, ICell, NeighbourhoodIndexes } from '../types/board.types'

const getNextCellState = (cell: ICell, neighbourCells: ICell[]) => {
	const aliveNeighbours = neighbourCells.filter((isAlive) => isAlive).length;
	// A cell that is dead at time step t will be alive at time step t+1 if
	// exactly three of its eight neighbors were alive at time step t.
	if (!cell && aliveNeighbours === 3) return true;

	// A cell that is alive at time step t will remain alive at time step
	// if two or three of its neighbors are alive at time step t.
	if (cell) return [2, 3].includes(aliveNeighbours);

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
				
				// Check if neighbor is within bounds
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
		.map((cell, index) => getNextCellState(cell, getNeighbours(neighbourhoods[index], boardState) ));
};