import { useEffect, useState } from 'react';
import { SquareState } from "../utils/types";
import '../styles/Square.css'

const Square: React.FC<{ value: SquareState; hoverSymbol: string | null; onClick: () => void; }> = ({ value, hoverSymbol, onClick }) => {
    const [symbol, setSymbol] = useState<string>(value ? value : '');

    useEffect(() => {
        setSymbol(value ? value : '');
    }, [value]);

    const onMouseEnter = (): void => {
        if (hoverSymbol)
            setSymbol(hoverSymbol);
    }

    const onMouseLeave = (): void => {
        setSymbol(value ? value : '');
    }

    return (
        <div className={value ? 'square' : 'square-empty'} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {symbol}
        </div>
    );
};

export default Square;