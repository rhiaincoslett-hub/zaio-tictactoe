import PropTypes from 'prop-types';
import styles from '../style/Square.module.css';

function Square({ value, onSquareClick, disabled, isWinningCell }) {
  const isEmpty = value === null || value === '';
  const isClickable = !disabled && isEmpty;

  const valueClass = value === 'X' ? styles.playerX : value === 'O' ? styles.playerO : '';
  return (
    <button
      type="button"
      className={`${styles.square} ${valueClass} ${isWinningCell ? styles.winning : ''} ${!isClickable ? styles.filled : ''}`}
      onClick={onSquareClick}
      disabled={!isClickable}
      aria-label={isEmpty ? `Empty square` : `Square marked ${value}`}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null, '']),
  onSquareClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isWinningCell: PropTypes.bool,
};

Square.defaultProps = {
  value: null,
  disabled: false,
  isWinningCell: false,
};

export default Square;