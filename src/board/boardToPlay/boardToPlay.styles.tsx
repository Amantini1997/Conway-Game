import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	max-width: 300px;
`;

export const ControlsContainer = styled.div`
	margin: auto;
	display: flex;
	flex-direction: row;
	width: 300px;
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-radius: 10px;
`;

export const IconContainer = styled.div<{ disabled?: boolean }>`
	cursor: pointer;
	width: 40px;
	height: 40px;
	display: grid;
	place-content: center;
	margin: auto;

	svg {
		color: ${({ theme }) => theme.palette.primary.contrastText};
	}

	${({ disabled, theme }) => disabled && css`
		pointer-events: none;
		cursor: initial;

		svg {
			color: ${	theme.palette.grey[600]};
		}
	`}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	gap: 20px;
`;
