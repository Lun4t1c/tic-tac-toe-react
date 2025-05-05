import './NumericSelector.css'

interface NumericSelectorProps {
    value: number;
    minValue: number;
    maxValue: number;
    onChange: (value: number) => void;
}

const NumericSelector: React.FC<NumericSelectorProps> = ({ value, minValue, maxValue, onChange }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        onChange(value - 1);
    };

    return (
        <div className="numeric-selector-container">
            <button className="selector-button" onClick={handleDecrement} disabled={value === minValue}>-</button>
            <div className="selector-value">{value}</div>
            <button className="selector-button" onClick={handleIncrement} disabled={value === maxValue}>+</button>
        </div>
    );
};

export default NumericSelector;