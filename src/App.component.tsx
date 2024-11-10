import { useRef, useState } from 'react';
import { StartPage } from './startPage/startPage.component';
import { IBoardState, IBoardSize } from './types/board.types';
import { Board } from './board/board.component';
import { Background, Title } from './App.styles';

const NO_BOARD_LOADED = -2;

export const App = () => {
	const boardStateHistory = useRef<IBoardState[] | null>(null);
	const boardSize = useRef<IBoardSize>();
	const [currentBoardTime, setCurrentBoardTime] = useState(NO_BOARD_LOADED);
	const [currentBoard, setCurrentBoard] = useState<IBoardState>([]);
	
	const isBoardLoaded = currentBoardTime !== NO_BOARD_LOADED;

	const updateTimeAndBoard = (time: number) => {
		setCurrentBoardTime(time);
		setCurrentBoard(boardStateHistory.current?.[time] || []);
	};

	const onInitialiseBoardHistory = (stateHistory: IBoardState[], size: IBoardSize) => {
		boardStateHistory.current = stateHistory;
		boardSize.current = size;
		updateTimeAndBoard(stateHistory.length - 1);
	};

	const onStateChange = (newState: IBoardState) => {
		boardStateHistory.current?.push(newState);
		updateTimeAndBoard(currentBoardTime + 1);
	};

	return (
		<Background>
			<Title $shrink={isBoardLoaded}>The Conway Game</Title>
			{isBoardLoaded
				? (
					<Board
						history={boardStateHistory.current || []}
						size={boardSize.current as IBoardSize}
						state={currentBoard}
						onStateChange={onStateChange}
						lastTime={boardStateHistory.current ? boardStateHistory.current.length - 1 : 0}
						currentTime={currentBoardTime}
						goToTime={updateTimeAndBoard}
					/>
				)
				: (<StartPage onSubmit={onInitialiseBoardHistory} defaultBoardSize={boardSize.current} />)
			}
		</Background>
	);
};