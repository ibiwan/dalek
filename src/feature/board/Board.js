import React from 'react';
import PropTypes from 'prop-types';
import { AnimateSharedLayout } from 'framer-motion';

import Square from '../square/Square';
import { makeNewBoard } from '../game/daleks';

function Board({ size, sprites, handleClick }) {
  const squares = makeNewBoard(size);

  sprites.forEach(({
    name,
    symbol,
    loc: { x, y } = {},
  }) => {
    squares[x][y] = { name, symbol };
  });

  return (
    <AnimateSharedLayout>
      {squares.map((rows, i) => (
        <div className="board-row" key={`${i + 0}`}>

          {rows.map((_, j) => {
            const place = `${i},${j}`;

            const {
              symbol: value = '',
              name: key = '',
            } = squares[i][j] || {};

            return (
              <Square
                key={key || place}
                id={key}
                {...{
                  i, j, value, handleClick,
                }}
              />
            );
          })}
        </div>
      ))}
    </AnimateSharedLayout>
  );
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
  sprites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Board;
