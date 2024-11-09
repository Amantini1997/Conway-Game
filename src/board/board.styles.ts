import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IBoardSize } from '../types/board.types';
import { CellContainer } from './cell/cell.styles';

export const MainContainer = styled.div`
	margin: 20px auto;
	background-color: #ffffff;
	padding: 40px;
	border-radius: 15px;
	width: fit-content;
	max-width: calc(100% - 40px);
`;

export const BoardContainer = styled.div<{ $size: IBoardSize, $togglable?: boolean }>`
	display: grid;
	${({ $size }) => css`
		grid-template-columns: repeat(${$size.cols}, 1fr);
		grid-template-rows: repeat(${$size.rows}, 1fr);
		aspect-ratio: ${$size.cols / $size.rows};
	`}
	${({ $togglable }) => $togglable && css`
		* {
			cursor: pointer;
		}
	`}
	height: 53vh;
	width: 100%;
	margin: auto;
	transition: all .2s;
`;