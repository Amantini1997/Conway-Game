export type ICell = {
	isAlive: boolean,
	color: [number, number, number],
};

export type IBoardState = ICell[];

export type IBoardSize = { rows: number, cols: number };