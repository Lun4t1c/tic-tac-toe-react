import { calculateWinner, getRandomNumber } from "./helpers";
import { SquareState } from "./types";

export function makeAiMoveRandom(boardState: SquareState[]): number {
    let aiMove: number;
    do {
        aiMove = getRandomNumber(0, (boardState.length * boardState.length) - 1);
    } while (boardState[aiMove] !== null);

    return aiMove;
}

export function makeAiMoveMinMax(boardState: SquareState[]): number{
    const aiPlayer = 'O';
    const humanPlayer = 'X';
    
    function minimax(board: SquareState[], depth: number, maximizingPlayer: boolean): number {
        console.log('depth: ', depth);
        // Base case: if the game is over, return the score
        const winner = calculateWinner(board);
        if (winner === aiPlayer) {
            return 10 - depth;
        } else if (winner === humanPlayer) {
            return depth - 10;
        } else if (!board.includes(null)) {
            return 0;
        }
        
        // Recursive case: continue searching for the best move
        if (maximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = aiPlayer;
                    const score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(bestScore, score);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = humanPlayer;
                    const score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(bestScore, score);
                }
            }
            return bestScore;
        }
    }
    
    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === null) {
            boardState[i] = aiPlayer;
            const score = minimax(boardState, 0, false);
            boardState[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

export function makeAiMoveAlfaBetaPruning(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}

export function makeAiMoveDecisionTree(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}