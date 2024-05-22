import '../styles/NumericSelector.css'

interface NumericSelectorProps {
    value: number;
    onChange: (value: number) => void;
}

const NumericSelector: React.FC<NumericSelectorProps> = ({ value, onChange }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        onChange(value - 1);
    };

    return (
        <div className="numeric-selector-container">
            <button className="selector-button" onClick={handleDecrement}>-</button>
            <div className="selector-value">{value}</div>
            <button className="selector-button" onClick={handleIncrement}>+</button>
        </div>
    );
};

export default NumericSelector;