import { getNextBoardState } from './helpers/helpers';

describe('board evolution', () => {
	describe('getNextBoardState', () => {
		test('blinker pattern', () => {
			const boardState = [
				false, false, false,
				true,  true,  true,
				false, false, false,
			];
			const boardSize = { cols: 3, rows: 3 };
			const expectedNextState = [
				false, true, false,
				false, true, false,
				false, true, false
			];
			expect(getNextBoardState(boardState, boardSize)).toEqual(expectedNextState);
		});
		test('chess pattern', () => {
			const boardState = Array(25).fill(false).map((c, index) => index % 2 === 0);
			const boardSize = { cols: 5, rows: 5 };
			const expectedNextState = [
				false, true,  true,  true,  false,
				true,  false, false, false, true,
				true,  false, false, false, true,
				true,  false, false, false, true,
				false, true,  true,  true,  false,
			];
			expect(getNextBoardState(boardState, boardSize)).toEqual(expectedNextState);
		});
	})
})
