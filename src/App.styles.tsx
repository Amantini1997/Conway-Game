import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

export const Background = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: linear-gradient(#1c78c5, #104479);
	overflow-y: auto;
`;

export const Title = styled((props: any) => <Typography variant='h2' {...props} />)`
	pointer-events: none;
	${({ $clickable }) => $clickable && css`
		pointer-events: unset;
		font-size: 30px;
		cursor: pointer;
	`}
	transition: font-size .3s;
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.palette.primary.contrastText};
	margin-top: 30px;
`;