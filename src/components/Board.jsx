import PropTypes from 'prop-types';
import Square from './Square';
import styles from '../style/Board.module.css';

function Board({ board, disabled, winningLine, onSelectSquare }) {
  const winningSet = winningLine ? new Set(winningLine) : null;

  return (
    <div className={styles.board} role="grid" aria-label="Game board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onSquareClick={() => onSelectSquare(Number(index))}
          disabled={disabled}
          isWinningCell={winningSet ? winningSet.has(index) : false}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  disabled: PropTypes.bool,
  winningLine: PropTypes.arrayOf(PropTypes.number),
  onSelectSquare: PropTypes.func.isRequired,
};

Board.defaultProps = {
  disabled: false,
  winningLine: null,
};

export default Board;