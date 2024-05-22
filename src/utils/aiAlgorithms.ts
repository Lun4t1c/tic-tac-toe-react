import { getRandomNumber } from "./helpers";
import { SquareState } from "./types";

export function makeAiMoveRandom(boardState: SquareState[]): number {
    let aiMove: number;
    do {
        aiMove = getRandomNumber(0, (boardState.length * boardState.length) - 1);
    } while (boardState[aiMove] !== null);

    return aiMove;
}

export function makeAiMoveMinMax(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}

export function makeAiMoveAlfaBetaPruning(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}

export function makeAiMoveDecisionTree(boardState: SquareState[]): number{
    throw new Error("Not implemented");
}