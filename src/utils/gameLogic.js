import { WINNING_LINES } from './constants';

/**
 * @param {Array<string|null>} board 
 * @returns {string|null} 
 */
export function calculateWinner(board) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * @param {Array<string|null>} board 
 * @returns {boolean}
 */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/**
 * @param {Array<string|null>} board 
 * @returns {{ winner: string|null, isDraw: boolean, isFinished: boolean }}
 */
export function getGameResult(board) {
  const winner = calculateWinner(board);
  const isDraw = !winner && isBoardFull(board);
  const isFinished = Boolean(winner) || isDraw;
  return { winner, isDraw, isFinished };
}