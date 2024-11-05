import { IBoardState, IBoardSize } from '../types/board.types';
import { BoardContainer, CellContainer } from './board.styles';

type Props = {
	size: IBoardSize;
	// time: number;
	state?: IBoardState;
}
export const Board = ({ size, state }: Props) => {
	if (!state) {
		return (
			<BoardContainer size={size}>
				<CellContainer color={[20, 20, 20]} />
				<CellContainer color={[20, 20, 20]} />
				<CellContainer color={[20, 20, 20]} />
				<CellContainer color={[20, 20, 20]} />
			</BoardContainer>
		);
	}

	return (
		<BoardContainer size={size}>
			{state?.map((cell) => (<CellContainer color={cell.color} />))}
		</BoardContainer>
	);
};
