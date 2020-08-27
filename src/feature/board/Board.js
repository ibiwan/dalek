import React from 'react';
import PropTypes from 'prop-types';

import Square from '../square/Square';

import { makeNewBoard } from '../game/daleks';

function Board({ size, elements, handleClick }) {
  const squares = makeNewBoard(size);

  elements.forEach(({ symbol, loc: { x, y } }) => {
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

/**
 *
 *
import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import { AnimateSharedLayout } from "framer-motion";
import { DOCTOR_SYMBOL } from "../daleks";
import { makeNewBoard } from "../daleks";

function Board({ size, elements, handleClick }) {
  const squares = makeNewBoard(size);

  elements.forEach(({ symbol, x, y }) => {
    squares[x][y] = symbol;
  });

  return (
    <AnimateSharedLayout>
      {squares.map((rows, i) => (
        <div className="board-row" key={`${i + 0}`}>
          {rows.map((_, j) => {
            const place = `${i},${j}`;
            const value = squares[i][j];
            const key = value === DOCTOR_SYMBOL ? "doctor" : place;

            return (
              <Square
                key={place}
                id={key}
                {...{
                  i,
                  j,
                  value,
                  handleClick
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
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Board;

 */
