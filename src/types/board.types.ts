export type NeighbourhoodIndexes = number[];
export type ITile = boolean;

export type IBoardState = ITile[];
export type IBoardSize = { rows: number, cols: number };
export type CompressedBoard = number[];
export type ExportBoardData = { history: CompressedBoard[], size: IBoardSize };
