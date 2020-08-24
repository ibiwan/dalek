export const BOARD_SIZE = 5;
const DALEK_COUNT = 16;
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
      console.log("COULDN'T FIND GOOD STARTING POINT; GIVING UP");
      break;
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
        initialSpaces.push(loc);

        return {
          symbol: DALEK_SYMBOL,
          ...loc,
        };
      },
    );
};

export const placeDoctor = (existing = []) => {
  const initialSpaces = [...existing];
  return {
    symbol: DOCTOR_SYMBOL,
    ...getUniqueInitial(initialSpaces, 0),
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
