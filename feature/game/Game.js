import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from 'feature/board/Board';
import styles from './game.module.css'

import { BOARD_SIZE } from './daleks';

import {
  playerMoveAttempted,
  selectSprites,
  selectStatus,
} from './gameSlice';

function Game() {
  const sprites = useSelector(selectSprites);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  return (
    <div className={styles.game} >
      <div>
        <div className={styles.gameInfo}>
          <div>{status}</div>
        </div>
        <Board {...{
          handleClick: (x, y) => dispatch(playerMoveAttempted({ x, y })),
          size: BOARD_SIZE,
          sprites,
        }}
        />
      </div>
    </div>
  );
}

export default Game;
