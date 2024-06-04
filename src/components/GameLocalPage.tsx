import React, { useState } from 'react';
import '../styles/GameLocalPage.css'
import { SquareState } from '../utils/types';
import { calculateWinner } from '../utils/helpers';
import Board from './Board';
import NumericSelector from './NumericSelector';

const Game: React.FC = () => {
  const BOARD_MIN_SIZE: number = 3;
  const BOARD_MAX_SIZE: number = 6;

  const [boardSize, setBoardSize] = useState<number>(() => {
    const item = localStorage.getItem('local-board-size');
    if (item)
      return parseInt(item);
    return BOARD_MIN_SIZE;
  });

  const [history, setHistory] = useState<SquareState[][]>([Array(boardSize * boardSize).fill(null)]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const initializeGame = (size: number): void => {
    setBoardSize(size);
    setHistory([Array(size * size).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  }

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

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="container">
      <div className='board-size-container'>
        <NumericSelector value={boardSize} minValue={BOARD_MIN_SIZE} maxValue={BOARD_MAX_SIZE} onChange={initializeGame} />
      </div>

      <div className='game-status-info'>
        {status}
      </div>

      <div className="game-board">
        <Board squares={current} xIsNext={xIsNext} boardSize={boardSize} onClick={handleClick} />
      </div>

    </div>
  );
};

export default Game;