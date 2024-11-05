import styled, { css } from 'styled-components';
import { IBoardSize, ICell } from '../types/board.types';

export const BoardContainer = styled.div<{ size: IBoardSize }>`
	display: grid;
	${({ size }) => css`
		grid-template-columns: repeat(${size.cols}, 1fr);
		grid-template-rows: repeat(${size.rows}, 1fr);
		aspect-ratio: ${size.rows / size.cols};
	`}
	width: 80vw;
`;

export const CellContainer = styled.div<{ color: ICell['color'] }>`
	background-color: ${({ color }) => color};
`;
