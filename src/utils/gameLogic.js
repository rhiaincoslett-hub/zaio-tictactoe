import { WINNING_LINES } from './constants';

/**
 * Determines if there is a winner on the given board.
 * Checks all 8 winning lines (3 rows, 3 columns, 2 diagonals).
 *
 * @param {Array<string|null>} board - Array of 9 cells (null = empty)
 * @returns {string|null} - 'X', 'O', or null if no winner
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
 * Checks if the board is full (draw condition).
 * Draw = all cells filled AND no winner.
 *
 * @param {Array<string|null>} board - Array of 9 cells
 * @returns {boolean}
 */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/**
 * Derives game result from board state.
 *
 * @param {Array<string|null>} board - Array of 9 cells
 * @returns {{ winner: string|null, isDraw: boolean, isFinished: boolean }}
 */
export function getGameResult(board) {
  const winner = calculateWinner(board);
  const isDraw = !winner && isBoardFull(board);
  const isFinished = Boolean(winner) || isDraw;
  return { winner, isDraw, isFinished };
}
