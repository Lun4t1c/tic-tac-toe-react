import { SquareState } from "../../../utils/types";
import Square from "../Square/Square";
import './Board.css'

const Board: React.FC<{ squares: SquareState[]; xIsNext: boolean; boardSize: number; onClick: (i: number) => void }> = ({ squares, xIsNext, boardSize, onClick }) => {
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

    const generateGridTemplate = (size: number) => {
        return `repeat(${size}, 7rem)`;
    };

    return (
        <div className="grid-container" style={{
            gridTemplateColumns: generateGridTemplate(boardSize),
            gridTemplateRows: generateGridTemplate(boardSize),
        }}>
            {Array.from({ length: boardSize * boardSize }, (_, index) => (
                <div key={index} className="grid-item">
                    {renderSquare(index)}
                </div>
            ))}
        </div>
    );
};

export default Board;