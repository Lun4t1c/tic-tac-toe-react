import { SquareState } from "../utils/types";

const Square: React.FC<{ value: SquareState; onClick: () => void }> = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;