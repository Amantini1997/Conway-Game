import { IBoardState, IBoardSize } from '../types/board.types';
import { MainContainer } from './board.styles';
import { BoardToInitialise } from './boardToInitialise/boardToInitialise.component';
import { BoardToPlay } from './boardToPlay/boardToPlay.component';

type Props = {
	size: IBoardSize;
	state: IBoardState | undefined;
	history: IBoardState[];
	onStateChange: (newState: IBoardState) => void;
}
export const Board = ({ size, state, onStateChange, history }: Props) => (
	<MainContainer>
		{!state?.length
			? (<BoardToInitialise size={size} onSubmit={onStateChange} />)
			: (<BoardToPlay size={size} state={state} onChange={onStateChange} history={history} />)
		}
	</MainContainer>
);