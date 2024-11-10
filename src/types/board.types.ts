export type NeighbourhoodIndexes = number[];
export type ITile = boolean;

export type IBoardState = ITile[];
export type IBoardSize = { rows: number, cols: number };
export type ExportBoardData = { history: IBoardState[], size: IBoardSize };
