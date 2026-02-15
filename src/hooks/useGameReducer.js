import { useReducer } from 'react';
import { gameReducer, initialState, getCurrentBoard, getCurrentPlayer, getDerivedGameState } from '../reducers/gameReducer';

export function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const board = getCurrentBoard(state);
  const currentPlayer = getCurrentPlayer(state);
  const { winner, isDraw, isFinished, status } = getDerivedGameState(state);

  return {
    state,
    dispatch,
    board,
    currentPlayer,
    winner,
    isDraw,
    isFinished,
    status,
    history: state.history,
    currentStep: state.currentStep,
    xWins: state.xWins ?? 0,
    oWins: state.oWins ?? 0,
    draws: state.draws ?? 0,
    playerXName: state.playerXName ?? 'X',
    playerOName: state.playerOName ?? 'O',
  };
}