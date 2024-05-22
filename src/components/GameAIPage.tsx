import React, { useEffect, useState } from 'react';
import '../styles/GameAIPage.css'
import { AiDifficulty, AlgorithmType, SquareState } from '../utils/types';
import { calculateWinner, getRandomNumber } from '../utils/helpers';
import Board from './Board';
import NumericSelector from './NumericSelector';

const Game: React.FC = () => {
    const SUPPORTED_ALGORITHMS: AlgorithmType[] = ['Random'];
    const BOARD_MIN_SIZE: number = 3;
    const BOARD_MAX_SIZE: number = 6;

    const [boardSize, setBoardSize] = useState<number>(5);
    const [history, setHistory] = useState<SquareState[][]>([Array(boardSize * boardSize).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const [lastAiTime, setLastAiTime] = useState<number>(-1);
    const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType>('Random');
    const [currentDifficulty, setCurrentDifficulty] = useState<AiDifficulty>('Medium');

    const current = history[stepNumber];
    const winner = calculateWinner(current);

    const initializeGame = (size: number): void => {
        setBoardSize(size);
        setHistory([Array(size * size).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
        setLastAiTime(-1);
    }

    let algorithmTypesTranslations: {
        [key in AlgorithmType]: string;
    } = {
        'Random': 'Random',
        'AlfaBetaPruning': 'Alfa beta pruning',
        'DecisionTree': 'Decision tree',
        'MinMax': 'MinMax'
    };

    let aiDifficultyTranslations: {
        [key in AiDifficulty]: string;
    } = {
        'Easy': 'Easy',
        'Medium': 'Medium',
        'Hard': 'Hard'
    };

    useEffect(() => {
        if (!winner && !current.includes(null)) {
            // If there is no winner and the board is full, return
            return;
        }

        if (!xIsNext) {
            // If it's not the player's turn, trigger AI move
            makeAiMove();
        }
    });

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const currentBoard = newHistory[newHistory.length - 1];
        const squares = [...currentBoard];

        if (winner || squares[i]) {
            return;
        }

        squares[i] = 'X';

        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const makeAiMove = (): void => {
        if (winner) return;

        const startTime = performance.now();

        const newHistory = history.slice(0, stepNumber + 1);
        const currentBoard = newHistory[newHistory.length - 1];
        const squares = [...currentBoard];

        let aiMove: number;
        do {
            aiMove = getRandomNumber(0, (boardSize * boardSize) - 1);
        } while (squares[aiMove] !== null);

        squares[aiMove] = xIsNext ? 'X' : 'O';

        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);

        setLastAiTime(performance.now() - startTime);
    }

    const resetGame = (): void => {
        setStepNumber(0);
        setXIsNext(true);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `${xIsNext ? 'Your turn' : 'AI\'s turn'}`;
    }

    return (
        <div className="container-grid">
            <div className="left-container" >
                {lastAiTime >= 0 && (
                    `Algorithm took ${lastAiTime}ms`
                )}

            </div>

            <div className="center-container">
                <div className='game-status-info'>
                    {status}
                </div>

                <div className="game-board">
                    <Board squares={current} xIsNext={xIsNext} boardSize={boardSize} onClick={handleClick} />
                </div>
            </div>

            <div className='right-container'>
                <div className='board-size-container'>
                    <NumericSelector value={boardSize} minValue={BOARD_MIN_SIZE} maxValue={BOARD_MAX_SIZE} onChange={initializeGame} />
                </div>

                <button className="algorithm-button" onClick={() => resetGame()}>
                    Reset
                </button>

                <div className="algorithm-types-container">
                    {Object.keys(algorithmTypesTranslations).map((key, index) => (
                        <button
                            disabled={!(SUPPORTED_ALGORITHMS.includes(key as AlgorithmType))}
                            className={key === currentAlgorithm ? 'algorithm-button-highlighted' : 'algorithm-button'}
                            key={index}
                            onClick={() => setCurrentAlgorithm(key as AlgorithmType)}
                        >
                            {algorithmTypesTranslations[key as AlgorithmType]}
                        </button>
                    ))}
                </div>

                <div className="difficulty-switch-container">
                    {Object.keys(aiDifficultyTranslations).map((key, index) => (
                        <button
                            className={key === currentDifficulty ? 'algorithm-button-highlighted' : 'algorithm-button'}
                            key={index}
                            onClick={() => setCurrentDifficulty(key as AiDifficulty)}
                        >
                            {aiDifficultyTranslations[key as AiDifficulty]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;