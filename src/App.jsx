import Board from './components/Board';
import StatusDisplay from './components/StatusDisplay';
import MoveHistory from './components/MoveHistory';
import Scoreboard from './components/Scoreboard';
import { useGameReducer } from './hooks/useGameReducer';
import { getWinningLine } from './utils/winningLine';
import { JUMP_TO_MOVE, MAKE_MOVE, RESET_GAME, UPDATE_PLAYER_NAMES } from './utils/constants';
import styles from './style/App.module.css';

function App() {
  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    isFinished,
    dispatch,
    history,
    currentStep,
    xWins,
    oWins,
    draws,
    playerXName,
    playerOName,
  } = useGameReducer();

  const winningLine = getWinningLine(board);

  const currentPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
  const winnerName = winner === 'X' ? playerXName : playerOName;
  const statusText = winner
    ? `Winner: ${winnerName}`
    : isDraw
      ? 'Draw!'
      : `Next player: ${currentPlayerName}`;
  const statusType = winner ? 'winner' : isDraw ? 'draw' : 'next';

  const handleSquareClick = (index) => {
    dispatch({ type: MAKE_MOVE, payload: { index } });
  };

  const handleReset = () => {
    dispatch({ type: RESET_GAME });
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      dispatch({ type: JUMP_TO_MOVE, payload: { step: currentStep - 1 } });
    }
  };

  const handleJumpToMove = (step) => {
    dispatch({ type: JUMP_TO_MOVE, payload: { step } });
  };

  const handlePlayerXNameChange = (e) => {
    dispatch({ type: UPDATE_PLAYER_NAMES, payload: { playerXName: e.target.value } });
  };

  const handlePlayerONameChange = (e) => {
    dispatch({ type: UPDATE_PLAYER_NAMES, payload: { playerOName: e.target.value } });
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>TicTacToe</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.gameSection}>
          <div className={styles.playerNames}>
            <label className={styles.nameLabel}>
              <span>Player X</span>
              <input
                type="text"
                value={playerXName}
                onChange={handlePlayerXNameChange}
                placeholder="Name for X"
                className={styles.nameInput}
                aria-label="Player X name"
              />
            </label>
            <label className={styles.nameLabel}>
              <span>Player O</span>
              <input
                type="text"
                value={playerOName}
                onChange={handlePlayerONameChange}
                placeholder="Name for O"
                className={styles.nameInput}
                aria-label="Player O name"
              />
            </label>
          </div>
          <StatusDisplay statusText={statusText} statusType={statusType} />
          <Board
            board={board}
            disabled={isFinished}
            winningLine={winningLine}
            onSelectSquare={handleSquareClick}
          />
          <div className={styles.gameButtons}>
            <button
              type="button"
              className={styles.undoButton}
              onClick={handleUndo}
              disabled={currentStep === 0}
              aria-label="Undo last move"
            >
              Undo move
            </button>
            <button
              type="button"
              className={styles.restartButton}
              onClick={handleReset}
              aria-label="Restart game"
            >
              Restart game
            </button>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <MoveHistory
            history={history}
            currentStep={currentStep}
            onJumpToMove={handleJumpToMove}
          />
          <Scoreboard
            xWins={xWins}
            oWins={oWins}
            draws={draws}
            playerXName={playerXName}
            playerOName={playerOName}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;