import PropTypes from 'prop-types';
import styles from '../style/Scoreboard.module.css';

function Scoreboard({ xWins, oWins, draws, playerXName, playerOName }) {
  const displayX = xWins ?? 0;
  const displayO = oWins ?? 0;
  const displayDraws = draws ?? 0;
  const xLabel = playerXName && playerXName !== 'X' ? `${playerXName} (X)` : 'X';
  const oLabel = playerOName && playerOName !== 'O' ? `${playerOName} (O)` : 'O';

  return (
    <div className={styles.scoreboard}>
      <h3 className={styles.heading}>Score</h3>
      <ul className={styles.list} aria-label="Game score">
        <li>{xLabel} wins: <strong>{displayX}</strong></li>
        <li>{oLabel} wins: <strong>{displayO}</strong></li>
        <li>Draws: <strong>{displayDraws}</strong></li>
      </ul>
    </div>
  );
}

Scoreboard.propTypes = {
  xWins: PropTypes.number,
  oWins: PropTypes.number,
  draws: PropTypes.number,
  playerXName: PropTypes.string,
  playerOName: PropTypes.string,
};

Scoreboard.defaultProps = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  playerXName: 'X',
  playerOName: 'O',
};

export default Scoreboard;