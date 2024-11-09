import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 300px;
	margin: auto;
`;

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
		color: ${({ theme }) => theme.palette.primary.contrastText};
	}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	gap: 20px;
`;
