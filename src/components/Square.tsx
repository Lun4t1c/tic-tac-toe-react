import { SquareState } from "../utils/types";
import '../styles/Square.css'

const Square: React.FC<{ value: SquareState; onClick: () => void }> = ({ value, onClick }) => {
    return (
        <div className="square" onClick={onClick}>
            {value}
        </div>
    );
};

export default Square;