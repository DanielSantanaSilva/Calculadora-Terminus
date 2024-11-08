import PropTypes from 'prop-types';

function Results({ x, y, z }) {
  return (
    <div id="results">
      <h3>Results:</h3>
      <p className="result">
        1° Number: <strong>{x !== null ? x * 2 + 11 : ''}</strong>
      </p>
      <p className="result">
        2° Number: <strong>
          {z !== null && y !== null ? z * 2 + y - 5 : ''}
        </strong>
      </p>
      <p className="result">
        3° Number: <strong>
          {x !== null && y !== null && z !== null ? Math.abs(z + y - x) : ''}
        </strong>
      </p>
    </div>
  );
}

Results.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number
};

export default Results;
