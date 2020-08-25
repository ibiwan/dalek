import React, { useState } from 'react';
import Board from './Board';

import {
  BOARD_SIZE,
  getDist,
  getValidMoves,
  makeNewBoard,
  makeNewDaleks,
  movePlayer,
  moveDaleks,
  placeDoctor,
} from '../daleks';

function Game() {
  const [playerNo, setPlayerNo] = useState(0);

  const [stepNo, setStepNo] = useState(0);

  const [
    history,
    setHistory,
  ] = useState([{ elements: [], status: null }]);

  // console.log({ history });

  // const [players, setPlayers] = useState([
  //   { name: 'doctor', symbol: '☗', x: null, y: null },
  //   // donna: { symbol: '👰', x: null, y: null },
  // ]);

  // const nPlayers = Object.keys(players).length + 1;

  // console.log({ doctor });

  const [doctor,
    setDoctor,
  ] = useState(placeDoctor());
  const [

    daleks,
    setDaleks,
  ] = useState(makeNewDaleks([doctor]));

  console.log({ doctor, daleks });

  const elements = [
    doctor,
    ...daleks,
  ];

  const { squares, status } = history[stepNo];

  // console.log({ squares, winner });

  const handleClick = (x, y) => {
    console.log({ doctor });

    const validMoves = getValidMoves(doctor, elements);

    console.log({ validMoves });

    if (validMoves.length === 0) {
      alert('STUCK!');
    }
    if (!validMoves.some(({ x: mx, y: my }) => mx === x && my === y)) {
      console.log('invalid move requested');
      return;
    }

    setDoctor({ ...doctor, x, y });

    // const {
    //   newSquares: newSquares1,
    //   newPlayer,
    //   newStatus: newStatus1,
    // } = movePlayer(
    //   squares,
    //   doctor,
    //   { i, j },
    // );

    // console.log({ newSquares1, newPlayer, newStatus1 });

    // const { newSquares2, newDaleks, newStatus2 } = moveDaleks(newSquares1, daleks);

    // console.log({ newSquares2, newDaleks, newStatus2 });

    // const resetHistory = history.slice(0, stepNo + 1);
    // const newHistory = [
    //   ...resetHistory,
    //   {
    //     squares: newSquares,
    //     winner: getWinner(newSquares),
    //   },
    // ];

    // setHistory(newHistory);

    // setStepNo(stepNo + 1);
  };

  const jumpTo = (step) => {
    // setStepNo(step);
  };

  // let status;
  // if (winner) {
  //   status = `Winner: ${winner}`;
  // } else {
  //   status = `Next player: ${nextPlayer}`;
  // }

  return (
    <div className="game">
      <div className="game-board">
        <Board {...{
          handleClick,
          size: BOARD_SIZE,
          elements,
          // winner,
        }}
        />
      </div>
      <div className="game-info">
        {/* <div>{status}</div> */}
        <ol>
          {history.map((board, moveNo) => {
            const desc = moveNo ? `Go to move #${moveNo}` : 'Go to game start';
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={moveNo}>
                <button type="button" onClick={() => jumpTo(moveNo)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Game;
