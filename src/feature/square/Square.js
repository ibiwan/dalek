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

/**
 *
 *
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Square = ({ id, i, j, value = null, handleClick }) => {
  return (
    <motion.button
      key={id}
      className="square"
      onClick={() => handleClick(i, j)}
    >
      <motion.div layoutId={id}>{value}</motion.div>
    </motion.button>
  );
};

Square.propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};

Square.defaultProps = {
  value: null
};

export default Square;

 */
