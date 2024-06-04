import { calculateWinner, getRandomNumber } from "./helpers";
import { SquareState } from "./types";

export function makeAiMoveRandom(boardState: SquareState[]): number {
    let aiMove: number;
    do {
        aiMove = getRandomNumber(0, (boardState.length * boardState.length) - 1);
    } while (boardState[aiMove] !== null);

    return aiMove;
}

//v0.1
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

//v0.1
export function makeAiMoveAlfaBetaPruning(boardState: SquareState[]): number{
    const aiPlayer = 'O';
    const humanPlayer = 'X';
    
    function alphabeta(board: SquareState[], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number {
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
                    const score = alphabeta(board, depth + 1, alpha, beta, false);
                    board[i] = null;
                    bestScore = Math.max(bestScore, score);
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = humanPlayer;
                    const score = alphabeta(board, depth + 1, alpha, beta, true);
                    board[i] = null;
                    bestScore = Math.min(bestScore, score);
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        }
    }
    
    let bestMove = -1;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === null) {
            boardState[i] = aiPlayer;
            const score = alphabeta(boardState, 0, alpha, beta, false);
            boardState[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
            alpha = Math.max(alpha, bestScore);
        }
    }
    
    return bestMove;
}

export function makeAiMoveMonteCarlo(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}