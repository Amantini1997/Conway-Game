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

export const ModalContainer = styled.div`
	border-radius: 12px;
	background-color: ${({ theme }) => theme.palette.primary.contrastText};
	margin: auto;
	margin-top: 34%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 350px;
	padding-bottom: 20px;
	overflow: hidden;
`;

export const GameOverTitle = styled.b`
	font-size: 20px;
	width: 100%;
	display: grid;
	place-content: center;
	background-color: ${({ theme }) => theme.palette.primary.main};
	color: ${({ theme }) => theme.palette.primary.contrastText};
	height: 40px;
`;

export const GameOverMessage = styled.div`
	padding: 30px 40px;
`;
