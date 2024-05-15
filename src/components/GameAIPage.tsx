import React, { useEffect, useState } from 'react';
import '../styles/GameLocalPage.css'
import { SquareState } from '../utils/types';
import { calculateWinner, getRandomNumber } from '../utils/helpers';
import Board from './Board';
//import Board from './Board';

const Game: React.FC = () => {
    const [history, setHistory] = useState<SquareState[][]>([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current);

    useEffect(() => {
        if (!winner && !current.includes(null)) {
            // If there is no winner and the board is full, return
            return;
        }

        if (!xIsNext) {
            // If it's not the player's turn, trigger AI move
            makeAiMove();
        }
    }, [history, xIsNext]);

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const currentBoard = newHistory[newHistory.length - 1];
        const squares = [...currentBoard];

        if (winner || squares[i]) {
            return;
        }

        //squares[i] = xIsNext ? 'X' : 'O';
        squares[i] = 'X';

        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const makeAiMove = (): void => {
        if (winner) return;

        const newHistory = history.slice(0, stepNumber + 1);
        const currentBoard = newHistory[newHistory.length - 1];
        const squares = [...currentBoard];

        let aiMove: number;
        do {
            aiMove = getRandomNumber(0, 8);
        } while (squares[aiMove] !== null);

        squares[aiMove] = xIsNext ? 'X' : 'O';

        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const moves = history.map((_, move) => {
        const desc = move ? `Go to move #${move}` : 'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `${xIsNext ? 'Your turn' : 'AI\'s turn'}`;
    }

    return (
        <div className="container">

            <div className='game-status-info'>
                {status}
            </div>

            <div className="game-board">
                <Board squares={current} xIsNext={xIsNext} onClick={handleClick} />
            </div>

            <div className="game-info">
                <ol>{moves}</ol>
            </div>

        </div>
    );
};

export default Game;