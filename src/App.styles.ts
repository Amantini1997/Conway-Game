import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Background = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: linear-gradient(#1c78c5, #104479);
	overflow-y: auto;
`;

export const Title = styled(Typography)`
	width: 100%;
	text-align: center;
	color: #ffffff;
	margin-top: 30px;
`;