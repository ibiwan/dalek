/* eslint-disable no-param-reassign */ // inapplicable in slice files because immer
/* eslint-disable no-console */

import { createSlice } from '@reduxjs/toolkit';

import {
  NUM_PLAYERS,
  getValidMoves,
  placeDaleks,
  placePlayers,
} from './daleks';

const newPlayers = placePlayers();
console.log({ newPlayers });

const [{ name, symbol }] = newPlayers; // first player

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playerNo: 0,
    stepNo: 0,
    players: newPlayers,
    daleks: placeDaleks(newPlayers),
    status: `First move: ${symbol} ${name}`,
  },
  reducers: {
    playerMoved: (
      state,
      {
        payload: {
          loc: {
            x,
            y,
          },
        },
      },
    ) => {
      const {
        playerNo,
        players,
        daleks,
      } = state;
      const player = players[playerNo];

      // console.log({ NUM_PLAYERS, playerNo, players, player, daleks, x, y });

      const validMoves = getValidMoves(playerNo, players, daleks);
      // console.log({ validMoves });

      // if (validMoves.length === 0) {
      //   alert('STUCK!');
      // }

      if (!validMoves.some(({ x: mx, y: my }) => mx === x && my === y)) {
        console.log('invalid move requested');
        return;
      }

      // advance turn counter
      let newPlayerNo = playerNo + 1;
      if (newPlayerNo >= NUM_PLAYERS) {
        newPlayerNo = 0;

        // dispatch daleks' moves
      }
      const {
        name: newName,
        symbol: newSymbol,
      } = players[newPlayerNo];

      // updates
      player.loc = { x, y };
      state.playerNo = newPlayerNo;
      state.status = `Next Move: ${newSymbol} ${newName}`;
    },
    daleksMoved: () => {},
  },
});

export const {
  playerMoved,
  daleksMoved,
} = gameSlice.actions;

export const selectPlayers = (state) => state.game.players;
export const selectDaleks = (state) => state.game.daleks;
export const selectStatus = (state) => state.game.status;
export const selectCurrentPlayer = (state) => state.game.player[state.game.playerNo];

export default gameSlice.reducer;
