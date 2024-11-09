import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const PlayPauseContainer = styled.div`
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-radius: 50%;
	cursor: pointer;
	margin: auto;
	width: 40px;
	height: 40px;
	display: grid;
	place-content: center;
	margin: auto;

	svg {
		color: #ffffff;
	}
`;

export const Caption = styled((props: any) => (<Typography {...props} variant='caption' />))`
	text-align: center;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	gap: 20px;
`;
