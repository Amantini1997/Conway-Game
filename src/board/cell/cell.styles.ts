import styled from 'styled-components';

export const CellContainer = styled.div<{ $isAlive?: boolean }>`
	background-color: ${({ $isAlive }) => $isAlive ? '#127c12' : '#7c1212'};
	cursor: inherit;
	width: 100%;
	transition: background-color .2s;
`;
