import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Form = styled.form`
	margin: 100px auto;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.palette.primary.contrastText};
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	width: 300px;
	height: fit-content;
	box-shadow: 5px 8px 19px 0px #00000088;
	color: ${({ theme }) => theme.palette.grey[900]};
`;

export const TitleContainer = styled.div`
	text-align: center;
`;

export const Subtitle = styled((props: any) => <Typography variant='body2' {...props} />)`
	font-size: 12px;
	margin-top: -3px;
	margin-bottom: 5px;
	color: ${({ theme }) => theme.palette.grey[700]};
	line-height: 14px;
`;

export const InputsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: inherit;
`;
