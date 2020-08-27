import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from '../board/Board';

import { BOARD_SIZE } from './daleks';

import {
  playerMoved,
  selectPlayers,
  selectDaleks,
  selectStatus,
} from './gameSlice';

function Game() {
  const daleks = useSelector(selectDaleks);
  const players = useSelector(selectPlayers);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const elements = [
    ...players,
    ...daleks,
  ];

  return (
    <div className="game">
      <div className="game-board">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <Board {...{
          handleClick: (x, y) => dispatch(playerMoved({ loc: { x, y } })),
          size: BOARD_SIZE,
          elements,
        }}
        />
      </div>
    </div>
  );
}

export default Game;
