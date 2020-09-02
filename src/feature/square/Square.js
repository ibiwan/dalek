import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectAnimationSeconds } from '../game/gameSlice';

const Square = ({
  id, i, j, value = null, handleClick,
}) => {
  const animationSeconds = useSelector(selectAnimationSeconds);

  return (
    <motion.button
      type="button"
      className="square"
      onClick={() => handleClick(i, j)}
    >
      <motion.div
        layoutId={id}
        transition={{ duration: animationSeconds }}
      >
        {value}
      </motion.div>
    </motion.button>
  );
};
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
