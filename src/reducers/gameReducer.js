import {
  MAKE_MOVE,
  RESET_GAME,
  JUMP_TO_MOVE,
  UPDATE_PLAYER_NAMES,
  PLAYER_X,
  PLAYER_O,
  STATUS_PLAYING,
  STATUS_FINISHED,
} from '../utils/constants';
import { getGameResult } from '../utils/gameLogic';

const INITIAL_BOARD = Array(9).fill(null);

export const initialState = {
  history: [INITIAL_BOARD],
  currentStep: 0,
  xWins: 0,
  oWins: 0,
  draws: 0,
  playerXName: 'X',
  playerOName: 'O',
};

export function getCurrentBoard(state) {
  return state.history[state.currentStep];
}

export function getCurrentPlayer(state) {
  return state.currentStep % 2 === 0 ? PLAYER_X : PLAYER_O;
}

export function getDerivedGameState(state) {
  const board = getCurrentBoard(state);
  const { winner, isDraw, isFinished } = getGameResult(board);
  const status = isFinished ? STATUS_FINISHED : STATUS_PLAYING;
  return { winner, isDraw, isFinished, status };
}

/**
 * @param {Object} state - Current state
 * @param {Object} action - { type, payload? }
 */
export function gameReducer(state, action) {
  switch (action.type) {
    case MAKE_MOVE: {
      const index = action.payload?.index;
      if (typeof index !== 'number' || index < 0 || index > 8) {
        return state;
      }
      const board = getCurrentBoard(state);
      const { isFinished } = getDerivedGameState(state);

      if (isFinished || board[index] !== null) {
        return state;
      }

      const player = getCurrentPlayer(state);
      const newBoard = board.slice(); 
      newBoard[index] = player;

      const newHistory = state.history.slice(0, state.currentStep + 1).concat([newBoard]);
      const nextState = {
        ...state,
        history: newHistory,
        currentStep: newHistory.length - 1,
      };

      const result = getGameResult(newBoard);
      if (result.isFinished) {
        return {
          ...nextState,
          xWins: result.winner === PLAYER_X ? (state.xWins ?? 0) + 1 : (state.xWins ?? 0),
          oWins: result.winner === PLAYER_O ? (state.oWins ?? 0) + 1 : (state.oWins ?? 0),
          draws: result.isDraw ? (state.draws ?? 0) + 1 : (state.draws ?? 0),
        };
      }
      return nextState;
    }

    case RESET_GAME:
      return {
        ...initialState,
        xWins: state.xWins ?? 0,
        oWins: state.oWins ?? 0,
        draws: state.draws ?? 0,
        playerXName: state.playerXName ?? 'X',
        playerOName: state.playerOName ?? 'O',
      };

    case UPDATE_PLAYER_NAMES: {
      const { playerXName, playerOName } = action.payload ?? {};
      return {
        ...state,
        ...(playerXName !== undefined && { playerXName: String(playerXName).trim() || 'X' }),
        ...(playerOName !== undefined && { playerOName: String(playerOName).trim() || 'O' }),
      };
    }

    case JUMP_TO_MOVE: {
      const { step } = action.payload;
      const clamped = Math.max(0, Math.min(step, state.history.length - 1));
      return {
        ...state,
        currentStep: clamped,
      };
    }

    default:
      return state;
  }
}