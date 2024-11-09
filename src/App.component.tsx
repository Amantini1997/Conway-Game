import { useRef, useState } from 'react';
import { StartPage } from './startPage/startPage.component';
import { IBoardState, IBoardSize } from './types/board.types';
import { Board } from './board/board.component';
import { Background, Title } from './App.styles';

const NO_BOARD_LOADED = -2;
const BOARD_NOT_INITIALISED = -1;

export const App = () => {
	// const boardStateHistory = useRef<IBoardState[] | null>(null);
	// const boardSize = useRef<IBoardSize | null>(null);
	// const [currentBoardTime, setCurrentBoardTime] = useState(NO_BOARD_LOADED);
	const boardStateHistory = useRef<IBoardState[] | null>([]);
	const boardSize = useRef<IBoardSize>({ cols: 25, rows: 25 });
	const [currentBoardTime, setCurrentBoardTime] = useState(BOARD_NOT_INITIALISED);

	const isBoardLoaded = currentBoardTime !== NO_BOARD_LOADED;

	const goBackToStartPage = () => {
		boardStateHistory.current = [];
		setCurrentBoardTime(NO_BOARD_LOADED);
	}

	const onInitialiseBoardHistory = (stateHistory: IBoardState[], size: IBoardSize) => {
		boardStateHistory.current = stateHistory;
		boardSize.current = size;
		setCurrentBoardTime(stateHistory.length - 1);
	};

	const onStateChange = (newState: IBoardState) => {
		setCurrentBoardTime(currentBoardTime + 1);
		boardStateHistory.current?.push(newState);
	};

	return (
		<Background>
			<Title variant='h2'>The Conway Game</Title>
			{isBoardLoaded
				? (
					<Board
						size={boardSize.current as IBoardSize}
						key={currentBoardTime}
						state={boardStateHistory.current?.[currentBoardTime]}
						onStateChange={onStateChange}
						goBackToStartPage={goBackToStartPage}
					/>
				)
				: (<StartPage onInitialiseBoardHistory={onInitialiseBoardHistory} defaultBoardSize={boardSize.current} />)
			}
		</Background>
	);
};