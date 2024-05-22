import { SquareState } from "./types";

export const calculateWinner = (squares: SquareState[]): SquareState => {
    // Calculate the dimensions of the board
    const size = Math.sqrt(squares.length);

    // Function to check if all elements in an array are the same and not null
    const allEqual = (arr: SquareState[]) => arr.every(val => val === arr[0] && val !== null);

    // Function to check if there is a winner in a set of squares
    const checkWinner = (a: number, b: number, c: number) =>
        squares[a] && allEqual([squares[a], squares[b], squares[c]]) ? squares[a] : null;

    // Generate all possible winning lines
    const lines: number[][] = [];
    // Rows
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 2; j++) {
            lines.push(Array.from({ length: 3 }, (_, index) => i * size + j + index));
        }
    }
    // Columns
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 2; j++) {
            lines.push(Array.from({ length: 3 }, (_, index) => i + (j + index) * size));
        }
    }
    // Diagonals
    for (let i = 0; i < size - 2; i++) {
        for (let j = 0; j < size - 2; j++) {
            lines.push([i * size + j, (i + 1) * size + (j + 1), (i + 2) * size + (j + 2)]);
            lines.push([(i + 2) * size + j, (i + 1) * size + (j + 1), i * size + (j + 2)]);
        }
    }

    // Check all possible winning lines
    for (const line of lines) {
        const winner = checkWinner(line[0], line[1], line[2]);
        if (winner) {
            return winner;
        }
    }

    return null;
};

export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}