import { compressBoard, decompressBoard } from '../../src/helpers/saving.helpers';

describe('compression algorithms:', () => {
	const size = { cols: 10, rows: 10 };
	const boardArrLen = size.cols * size.rows;
	const board = Array(boardArrLen).fill(false).map((c, index) => index % 2 === 0);
	const compressedBoard = Array(boardArrLen / 2).fill(0).map((c, index) => index * 2);

	test('compression', () => {
		expect(compressBoard(board)).toEqual(compressedBoard);
	});
	test('decompression', () => {
		expect(decompressBoard(compressedBoard, size)).toEqual(board);
	});
});
