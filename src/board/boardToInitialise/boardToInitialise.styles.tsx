import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const BottomSection = styled.div`
	margin: 20px 20px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
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
