import { IBoardState, IBoardSize } from '../types/board.types';
import { MainContainer } from './board.styles';
import { BoardToInitialise } from './boardToInitialise/boardToInitialise.component';
// import { Button, Container } from '@mui/material';
import { BoardToPlay } from './boardToPlay/boardToPlay.component';

type Props = {
	size: IBoardSize;
	state: IBoardState | undefined;
	history: IBoardState[];
	onStateChange: (newState: IBoardState) => void;
	goBackToStartPage: () => void;
}
export const Board = ({ size, state, onStateChange, goBackToStartPage, history }: Props) => (
	<MainContainer>
		{!state?.length
			? (<BoardToInitialise size={size} onSubmit={onStateChange} />)
			: (<BoardToPlay size={size} state={state} onChange={onStateChange} history={history} />)
		}
		{/* <br />
		<Container fixed>
			<Button color='error' variant='contained' onClick={goBackToStartPage}>Home Page</Button>
		</Container> */}
	</MainContainer>
);