import { SquareState } from "../utils/types";
import Square from "./Square";
import '../styles/Board.css'

const Board: React.FC<{ squares: SquareState[]; xIsNext: boolean; onClick: (i: number) => void }> = ({ squares, xIsNext, onClick }) => {
    const getHoverSymbol = (i: number): string => {
        switch (squares[i]) {
            case 'O':
            case 'X':
                return '';
            case null:
                return xIsNext ? 'X' : 'O';
        }
    }

    const renderSquare = (i: number) => {
        return <Square value={squares[i]} hoverSymbol={getHoverSymbol(i)} onClick={() => onClick(i)} />;
    };

    return (
        <div className="grid-container">
            <div className="grid-item">{renderSquare(0)}</div>
            <div className="grid-item">{renderSquare(1)}</div>
            <div className="grid-item">{renderSquare(2)}</div>
            <div className="grid-item">{renderSquare(3)}</div>
            <div className="grid-item">{renderSquare(4)}</div>
            <div className="grid-item">{renderSquare(5)}</div>
            <div className="grid-item">{renderSquare(6)}</div>
            <div className="grid-item">{renderSquare(7)}</div>
            <div className="grid-item">{renderSquare(8)}</div>
        </div>
    );
};

export default Board;