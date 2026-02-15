# TicTacToe — React HQ Bootcamp Assignment

A production-quality TicTacToe game built with React (functional components + hooks) and **useReducer** for state management. 

## Feature overview

- **Core game:** 3×3 board, X and O alternate, win/draw detection (all 8 lines), no overwriting filled cells.
- **Status:** Dynamic text for "Next player: X/O", "Winner: X/O", "Draw!".
- **State management:** All game state is managed with **useReducer** (no `useState` for board, player, winner). Actions: `MAKE_MOVE`, `RESET_GAME`, `JUMP_TO_MOVE`.
- **Move history & time travel:** List of moves with position (row, col). Click any move to jump back to that board state; current move is highlighted.
- **UI:** Centered grid, hover on empty squares, winning line highlight, X/O colors, responsive layout, accessible (ARIA, focus, keyboard).

## Architecture

- **Reducer** (`src/reducers/gameReducer.js`): Single source of truth. State shape: `{ history: [board, ...], currentStep }`. Current board = `history[currentStep]`; current player derived from step parity. Immutable updates only.
- **Game logic** (`src/utils/gameLogic.js`): Pure functions for `calculateWinner`, `isBoardFull`, `getGameResult`. Uses the 8 winning lines (3 rows, 3 columns, 2 diagonals).
- **Constants** (`src/utils/constants.js`): Action types and `WINNING_LINES`.
- **Hook** (`src/hooks/useGameReducer.js`): `useReducer` + derived values (board, currentPlayer, winner, isDraw, etc.) so components stay simple.
- **Components:** Presentational where possible — `Square`, `Board`, `StatusDisplay`, `MoveHistory`, `Scoreboard`. `App` wires the reducer to the UI (dispatch + derived state).

## Tech stack

- React 18 (functional components, hooks)
- useReducer for all game state
- PropTypes for type checking
- Vite for build and dev server
- CSS Modules for component styles