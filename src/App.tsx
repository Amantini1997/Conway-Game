import { useRef, useState } from 'react';
import './App.css';
import { StartPage } from './startPage/startPage.component';
import { IBoardState, IBoardSize } from './types/board.types';
import { Board } from './board/board.component';

const NO_BOARD_LOADED = -1;

function App() {
	const boardStateHistory = useRef<IBoardState[] | null>(null);
	const boardSize = useRef<IBoardSize | null>(null);
	const [currentBoardTime, setCurrentBoardTime] = useState(NO_BOARD_LOADED);

	const onInitialiseBoardHistory = (stateHistory: IBoardState[], size: IBoardSize) => {
		boardStateHistory.current = stateHistory;
		boardSize.current = size;
		setCurrentBoardTime(stateHistory.length - 1);
	};

	if (currentBoardTime === NO_BOARD_LOADED) {
		return (<StartPage onInitialiseBoardHistory={onInitialiseBoardHistory} />);
	}

	return (
		<Board
			size={boardSize.current as IBoardSize}
			state={boardStateHistory.current?.at(-1)}
			key={currentBoardTime}
		/>
	);
};

export default App;
