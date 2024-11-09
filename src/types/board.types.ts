export type NeighbourhoodIndexes = number[];
export type ICell = boolean;

export type IBoardState = ICell[];
export type IBoardSize = { rows: number, cols: number };
export type ExportBoardData = { history: IBoardState[], size: IBoardSize };
