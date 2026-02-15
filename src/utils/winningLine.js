import { WINNING_LINES } from './constants';
import { calculateWinner } from './gameLogic';

/**
 * @param {Array<string|null>} board
 * @returns {number[]|null}
 */
export function getWinningLine(board) {
  const winner = calculateWinner(board);
  if (!winner) return null;

  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}