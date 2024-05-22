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
        <div>
            <button onClick={handleDecrement}>-</button>
            <input type="text" value={value} readOnly />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default NumericSelector;