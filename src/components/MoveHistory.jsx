import PropTypes from 'prop-types';
import styles from '../style/MoveHistory.module.css';

function MoveHistory({ history, currentStep, onJumpToMove }) {
  const moves = history.map((_, step) => {
    const isCurrent = step === currentStep;
    const position = getMovePosition(history, step);
    const positionText =
      position >= 0 ? ` (row ${Math.floor(position / 3) + 1}, col ${(position % 3) + 1})` : '';
    return (
      <li key={step}>
        <button
          type="button"
          className={isCurrent ? styles.currentMove : ''}
          onClick={() => onJumpToMove(step)}
        >
          {step === 0 ? 'Game start' : `Move #${step}${positionText}`}
          {isCurrent ? ' (current)' : ''}
        </button>
      </li>
    );
  });

  return (
    <div className={styles.moveHistory}>
      <h3 className={styles.heading}>Move history</h3>
      <ol className={styles.list}>{moves}</ol>
    </div>
  );
}

function getMovePosition(history, step) {
  if (step <= 0) return -1;
  const prev = history[step - 1];
  const curr = history[step];
  for (let i = 0; i < 9; i++) {
    if (prev[i] !== curr[i]) return i;
  }
  return -1;
}

MoveHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null]))).isRequired,
  currentStep: PropTypes.number.isRequired,
  onJumpToMove: PropTypes.func.isRequired,
};

export default MoveHistory;