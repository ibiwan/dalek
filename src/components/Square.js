import React from 'react';
import PropTypes from 'prop-types';

const Square = ({
  i, j, value = null, handleClick,
}) => (
  <button type="button" className="square" onClick={() => handleClick(i, j)}>
    {value || `${i},${j}`}
    {/* {value} */}
  </button>
);

Square.propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Square.defaultProps = {
  value: null,
};

export default Square;
