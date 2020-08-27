import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Square = ({
  id, i, j, value = null, handleClick,
}) => (
  <motion.button type="button" className="square" onClick={() => handleClick(i, j)}>
    <motion.div layoutId={id}>{value}</motion.div>
  </motion.button>
);

Square.propTypes = {
  id: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Square.defaultProps = {
  value: null,
};

export default Square;
