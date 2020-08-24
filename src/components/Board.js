import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

import { makeNewBoard } from '../daleks';

function Board({ size, elements, handleClick }) {
  const squares = makeNewBoard(size);

  elements.forEach(({ symbol, x, y }) => {
    squares[x][y] = symbol;
  });

  return (
    <div>
      {squares.map((rows, i) => (
        <div className="board-row" key={`${i + 0}`}>

          {rows.map((_, j) => {
            const place = `${i},${j}`;
            const value = squares[i][j];

            return (
              <Square
                key={place}
                {...{
                  i, j, value, handleClick,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Board;
