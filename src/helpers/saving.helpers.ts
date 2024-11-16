import { ChangeEvent } from 'react';
import { CompressedBoard, ExportBoardData, IBoardSize, IBoardState } from '../types/board.types';

export const compressBoard = (board: IBoardState) => board
	.map((isAlive, index) => isAlive ? index : undefined)
	.filter((v) => v !== undefined) as CompressedBoard;

export const decompressBoard = (board: CompressedBoard, size: IBoardSize): IBoardState => {
	const uncompressedBoard = new Array(size.cols * size.rows).fill(false);
	board.forEach((i) => { uncompressedBoard[i] = true });
	return uncompressedBoard;
};

export const exportData = (history: IBoardState[], size: IBoardSize) => {
	const link = document.createElement("a");
	const data: ExportBoardData = { history: history.map(compressBoard), size };
	link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
	link.download = `conway_game_board_${size.cols}_x_${size.rows}.json`;
	link.click();
};

export const importData = (
	resolve: (history: IBoardState[], size: IBoardSize) => void,
	reject = alert,
) => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'application/json';
	// @ts-ignore
	input.onchange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/json") {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const { history, size } = JSON.parse(e.target?.result as string) as ExportBoardData;
					resolve(history.map((board) => decompressBoard(board, size)), size);
				} catch (error) {
					reject('Invalid JSON file');
				}
			};
			reader.readAsText(file);
		} else {
			reject('Invalid JSON file');
		}
	};
	input.click();
}