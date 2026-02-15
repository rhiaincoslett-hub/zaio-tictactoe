import PropTypes from 'prop-types';
import styles from '../style/StatusDisplay.module.css';

function StatusDisplay({ statusText, statusType }) {
  return (
    <div
      className={`${styles.status} ${styles[statusType] || ''}`}
      role="status"
      aria-live="polite"
    >
      {statusText}
    </div>
  );
}

StatusDisplay.propTypes = {
  statusText: PropTypes.string.isRequired,
  statusType: PropTypes.oneOf(['next', 'winner', 'draw']),
};

StatusDisplay.defaultProps = {
  statusType: 'next',
};

export default StatusDisplay;