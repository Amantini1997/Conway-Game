import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Form = styled.form`
	margin: 100px auto;
	border-radius: 20px;
	background-color: #ffffff;
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	width: 300px;
	height: fit-content;
	box-shadow: 5px 8px 19px 0px #00000088;
	color: #202020;
`;

export const TitleContainer = styled.div`
	text-align: center;
`;

export const Subtitle = styled((props: any) => <Typography variant='body2' {...props} />)`
	font-size: 12px;
	margin-top: -3px;
	margin-bottom: 5px;
	color: #606060;
	line-height: 14px;
`;

export const InputsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: inherit;
`;
