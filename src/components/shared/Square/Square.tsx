import { useEffect, useState } from 'react';
import { SquareState } from "../../../utils/types";
import './Square.css'

const Square: React.FC<{ value: SquareState; hoverSymbol: string | null; onClick: () => void; }> = ({ value, hoverSymbol, onClick }) => {
    const [symbol, setSymbol] = useState<string>(value ? value : '');

    useEffect(() => {
        if (hoverSymbol)
            setSymbol(hoverSymbol);
    }, [hoverSymbol]);

    return (
        <div className={value ? 'square' : 'square-empty'} onClick={onClick}>
            {symbol}
        </div>
    );
};

export default Square;