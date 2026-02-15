export const MAKE_MOVE = 'MAKE_MOVE';
export const RESET_GAME = 'RESET_GAME';
export const JUMP_TO_MOVE = 'JUMP_TO_MOVE';
export const UPDATE_PLAYER_NAMES = 'UPDATE_PLAYER_NAMES';

/* Player symbols */
export const PLAYER_X = 'X';
export const PLAYER_O = 'O';

/* Game status values */
export const STATUS_PLAYING = 'playing';
export const STATUS_FINISHED = 'finished';

export const WINNING_LINES = [
  [0, 1, 2], 
  [3, 4, 5], // row 1
  [6, 7, 8], // row 2
  [0, 3, 6], // col 0
  [1, 4, 7], // col 1
  [2, 5, 8], // col 2
  [0, 4, 8], // diagonal \
  [2, 4, 6], // diagonal /
];
