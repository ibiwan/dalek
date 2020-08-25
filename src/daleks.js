/* eslint-disable no-continue */

export const BOARD_SIZE = 10;
const DALEK_COUNT = 20;
const DALEK_SYMBOL = '☖';
const DOCTOR_SYMBOL = '☗';
const MAX_ATTEMPTS = 100;

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

export const makeNewDaleks = (existing = []) => {
  const initialSpaces = [...existing];
  return Array(DALEK_COUNT)
    .fill()
    .map(
      () => {
        const loc = getUniqueInitial(initialSpaces, 1);

        if (!loc) {
          return null;
        }

        initialSpaces.push(loc);

        return {
          symbol: DALEK_SYMBOL,
          ...loc,
        };
      },
    )
    .filter((x) => x);
};

export const placeDoctor = (existing = []) => {
  const initialSpaces = [...existing];
  console.log({ initialSpaces });
  const loc = getUniqueInitial(initialSpaces, 1);
  console.log({ loc });
  return {
    symbol: DOCTOR_SYMBOL,
    ...loc,
  };
};

export const movePlayer = (
//   squares,
//   // name,
//   { symbol, x, y },
//   { i, j },
) => {
  console.log('CALL: movePlayer');

  //   console.log({ squares,
  //     symbol,
  //     x,
  //     y,
  //     new: { i, j } });

  //   const newSquares = squares.map((row) => [...row]);

  //   console.log({ newSquares });

//   return {
//     newSquares,
//     newPlayer: {},
//     newStatus: null,
//   };
};

export const moveDaleks = (
//   squares,
//   daleks,
) => {
//   console.log({ squares, daleks });

  //   const newSquares = squares.map((row) => [...row]);

//   return {
//     newSquares,
//     newDaleks: [],
//   };
};

export const getValidMoves = (orig, elements) => {
  const validMoves = [];

  for (let i = orig.x - 1; i <= orig.x + 1; i += 1) {
    for (let j = orig.y - 1; j <= orig.y + 1; j += 1) {
      if (orig.x === i && orig.y === j) {
        continue;
      }
      if (i < 0 || j < 0) {
        continue;
      }
      if (i >= BOARD_SIZE || j >= BOARD_SIZE) {
        continue;
      }
      if (elements.some(
        (dalek) => dalek.x === i && dalek.y === j,
      )) {
        continue;
      }

      validMoves.push({ x: i, y: j });
    }
  }

  return validMoves;
};
