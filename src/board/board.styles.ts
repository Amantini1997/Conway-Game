import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IBoardSize } from '../types/board.types';

export const MainContainer = styled.div`
	margin: 20px auto;
	background-color: ${({ theme }) => theme.palette.primary.contrastText};
	padding: 40px;
	border-radius: 15px;
	width: 700px;
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
	max-height: 53vh;
	max-width: 100%;
	margin: auto;
	transition: all .2s;
`;