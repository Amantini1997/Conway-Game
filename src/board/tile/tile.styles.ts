import styled from '@emotion/styled';

export const TileContainer = styled.div<{ $isAlive?: boolean }>`
	background-color: ${({ $isAlive }) => $isAlive ? '#127c12' : '#7c1212'};
	cursor: inherit;
	width: 100%;
	height: 100%;
	transition: background-color .2s;
`;
