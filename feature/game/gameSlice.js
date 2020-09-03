/* eslint-disable no-param-reassign */ // inapplicable in slice files because immer
/* eslint-disable no-console */

import { createSlice } from '@reduxjs/toolkit';

import {
  getDalekMoves,
  isValidMove,
  placeDaleks,
  placePlayers,
  timePromise,
  collideDaleks,

} from './daleks';

let nPlayers = 1;
const animationSeconds = 0.4;

const newDaleks = placeDaleks();
const newPlayers = placePlayers(nPlayers, newDaleks);

nPlayers = newPlayers.length;

const [playerOne] = newPlayers; // first player

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    animationSeconds,
    playerNo: 0,
    stepNo: 0,
    players: newPlayers,
    daleks: newDaleks,
    rubble: [],
    isPlayersTurn: true,
    status: `First move: ${playerOne.symbol} ${playerOne.name}`,
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

      players[playerNo].loc = { x, y };
    },
    advancePlayer: (
      state,
      { payload: reset = false },
    ) => {
      const { playerNo } = state;

      state.playerNo = reset ? 0 : playerNo + 1;
      state.isPlayersTurn = state.playerNo < nPlayers;
    },
    advanceStatus: (state) => {
      const { playerNo, players, isPlayersTurn } = state;

      if (isPlayersTurn) {
        const {
          name,
          symbol,
        } = players[playerNo];

        state.status = `Next Move: ${symbol} ${name}`;
      } else {
        state.status = 'The Daleks Advance';
      }
    },
    daleksMoved: (state) => {
      const {
        players,
        daleks,
      } = state;

      getDalekMoves(players, daleks);
      state.playerNo = 0;
    },
    daleksCrashed: (state) => {
      const { daleks, rubble } = state;
      const {
        nextDaleks,
        nextRubble,
      } = collideDaleks(daleks, rubble);
      state.daleks = nextDaleks;
      state.rubble = nextRubble;
    },
  },
});

export const {
  advancePlayer,
  advanceStatus,
  playerMoveAllowed,
  daleksMoved,
  daleksCrashed,
} = gameSlice.actions;

export const maybeDaleksMove = () => (dispatch, getState) => {
  const { game: { isPlayersTurn } } = getState();

  if (isPlayersTurn) {
    return;
  }

  timePromise()
    .then(() => { dispatch(daleksMoved()); })
    .then(() => { dispatch(daleksCrashed()); })
    .then(() => timePromise(animationSeconds * 1000))
    .then(() => { dispatch(advancePlayer(true)); })
    .then(() => { dispatch(advanceStatus()); });
};

export const playerMoveAttempted = ({ x, y }) => (dispatch, getState) => {
  const { game: {
    isPlayersTurn,
    playerNo,
    players,
    daleks,
    rubble,
  } } = getState();

  if (!isPlayersTurn) {
    return;
  }

  if (!isValidMove(playerNo, players, daleks, rubble, { x, y })) {
    console.log('invalid move requested');
    return;
  }

  timePromise()
    .then(() => { dispatch(playerMoveAllowed({ loc: { x, y } })); })
    .then(() => timePromise(animationSeconds * 1000))
    .then(() => { dispatch(advancePlayer()); })
    .then(() => { dispatch(advanceStatus()); })
    .then(() => { dispatch(maybeDaleksMove()); });
};

export const selectStatus = (state) => state.game.status;
export const selectSprites = ({
  game: {
    players,
    daleks,
    rubble,
  },
}) => [
  ...players,
  ...daleks,
  ...rubble,
];
export const selectAnimationSeconds = (state) => state.game.animationSeconds;

export default gameSlice.reducer;
