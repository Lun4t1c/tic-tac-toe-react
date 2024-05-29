import React, { useState } from 'react';
import '../styles/GameLocalPage.css'
import { SquareState } from '../utils/types';
import { calculateWinner } from '../utils/helpers';
import Board from './Board';

const Game: React.FC = () => {
  const BOARD_SIZE = 4;

  const [history, setHistory] = useState<SquareState[][]>([Array(BOARD_SIZE * BOARD_SIZE).fill(null)]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentBoard = newHistory[newHistory.length - 1];
    const squares = [...currentBoard];

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, squares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

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
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="container">

      <div className='game-status-info'>
        {status}
      </div>

      <div className="game-board">
        <Board squares={current} xIsNext={xIsNext} boardSize={BOARD_SIZE} onClick={handleClick} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>

    </div>
  );
};

export default Game;