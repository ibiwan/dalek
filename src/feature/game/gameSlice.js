/* eslint-disable no-param-reassign */ // inapplicable in slice files because immer
/* eslint-disable no-console */

import { createSlice } from '@reduxjs/toolkit';

import {
  getDalekMoves,
  isValidMove,
  placeDaleks,
  placePlayers,
} from './daleks';

let nPlayers = 3;

const newDaleks = placeDaleks();
const newPlayers = placePlayers(nPlayers, newDaleks);

nPlayers = newPlayers.length;

const [{ name, symbol }] = newPlayers; // first player

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playerNo: 0,
    stepNo: 0,
    players: newPlayers,
    daleks: newDaleks,
    status: `First move: ${symbol} ${name}`,
  },
  reducers: {
    playerMoveAllowed: (
      state,
      { payload: {
        loc: { x, y },
      } },
    ) => {
      const {
        playerNo,
        players,
      } = state;

      // advance turn counter
      const newPlayerNo = playerNo + 1;

      players[playerNo].loc = { x, y };
      state.playerNo = newPlayerNo;

      if (newPlayerNo < nPlayers) {
        const {
          name: newName,
          symbol: newSymbol,
        } = players[newPlayerNo];

        state.status = `Next Move: ${newSymbol} ${newName}`;
      } else {
        state.status = 'The Daleks Advance';
      }
    },
    daleksMoved: (state) => {
      const {
        playerNo,
        players,
        daleks,
      } = state;

      if (playerNo < nPlayers) {
        return;
      }

      const nextDaleks = getDalekMoves(players, daleks);

      state.daleks = nextDaleks;
      state.playerNo = 0;
      state.status = `Next Move: ${symbol} ${name}`;
    },
  },
});

export const {
  playerMoveAllowed,
  daleksMoved,
} = gameSlice.actions;

export const selectPlayers = (state) => state.game.players;
export const selectDaleks = (state) => state.game.daleks;
export const selectStatus = (state) => state.game.status;

export const playerMoveAttempted = ({ x, y }) => (dispatch, getState) => {
  const { game: {
    playerNo,
    players,
    daleks,
  } } = getState();

  if (playerNo === nPlayers) {
    return;
  }

  if (!isValidMove(playerNo, players, daleks, { x, y })) {
    console.log('invalid move requested');
    return;
  }

  dispatch(playerMoveAllowed({ loc: { x, y } }));

  setImmediate(() => dispatch(daleksMoved()));
};

export default gameSlice.reducer;
