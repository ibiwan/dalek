/* eslint-disable no-console */
/* eslint-disable no-continue */

export const BOARD_SIZE = 10;
const DALEK_COUNT = 20;
const DALEK_SYMBOL = '☖';
const DOCTOR_SYMBOL = '☗';
const DONNA_SYMBOL = '👰';
const MAX_ATTEMPTS = 100;

export const PLAYER_TEMPLATES = [
  { name: 'Doctor', symbol: DOCTOR_SYMBOL },
  // { name: 'Donna', symbol: DONNA_SYMBOL },
];

export const NUM_PLAYERS = PLAYER_TEMPLATES.length;

export const getDist = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  useEuclidean = false,
) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  if (useEuclidean) {
    return Math.sqrt(dx * dx + dy * dy);
  }
  return Math.abs(dx) + Math.abs(dy);
};

const getDists = (square, squares) => squares.map(
  (aSquare) => getDist(aSquare, square),
);

const getMinDist = (square, squares) => Math.min(
  ...getDists(square, squares),
);

const getUniqueInitial = (takenSpaces, minDist = 0) => {
  let attempts = 0;
  let square;

  do {
    square = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };

    attempts += 1;
    if (attempts > MAX_ATTEMPTS) {
      return undefined;
    }
  } while (getMinDist(square, takenSpaces) < minDist);

  return square;
};

export const makeNewBoard = (
  size = BOARD_SIZE,
) => Array(size).fill().map(
  () => Array(size).fill(null),
);

export const placeDaleks = (existing) => {
  const initialSpaces = existing.map(({ loc }) => loc);
  return Array(DALEK_COUNT)
    .fill()
    .map(
      (_, i) => {
        const loc = getUniqueInitial(initialSpaces, 1);

        if (!loc) {
          return null;
        }

        initialSpaces.push(loc);

        return {
          name: `dalek-${i}`,
          symbol: DALEK_SYMBOL,
          loc,
        };
      },
    )
    .filter((x) => x);
};

export const placePlayers = (existing = []) => {
  const initialSpaces = [...existing];

  return PLAYER_TEMPLATES.map((player) => {
    const loc = getUniqueInitial(initialSpaces, 1);
    initialSpaces.push(loc);
    return {
      ...player,
      loc,
    };
  });
};

export const getValidMoves = (playerNo, players, daleks) => {
  const validMoves = [];
  const elements = [
    ...players.filter((player, i) => i !== playerNo),
    ...daleks,
  ];

  const { loc: { x, y } } = players[playerNo];

  for (let i = x - 1; i <= x + 1; i += 1) {
    for (let j = y - 1; j <= y + 1; j += 1) {
      if (x === i && y === j) {
        continue;
      }
      if (i < 0 || j < 0) {
        continue;
      }
      if (i >= BOARD_SIZE || j >= BOARD_SIZE) {
        continue;
      }
      if (elements.some(
        ({ loc: {
          x: elX,
          y: elY,
        } }) => elX === i && elY === j,
      )) {
        continue;
      }

      validMoves.push({ x: i, y: j });
    }
  }

  return validMoves;
};
