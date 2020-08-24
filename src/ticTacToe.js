const BOARD_SIZE = 5;

const makeNewBoard = () => Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null));

const makeWinLines = () => {
  const lines = [];
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const row = [];
    const col = [];
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      row.push([i, j]);
      col.push([j, i]);
    }
    lines.push(row);
    lines.push(col);

    diag1.push([i, i]);
    diag2.push([i, BOARD_SIZE - 1 - i]);
  }
  lines.push(diag1);
  lines.push(diag2);

  return lines;
};

const winLines = makeWinLines();

const checkLine = (squares, pairs) => pairs.reduce((acc, [i, j], k) => {
  const val = squares[i][j];
  if (k === 0) {
    return val;
  }
  if (acc === undefined || acc === val) {
    return acc;
  }
  return undefined;
}, undefined);

const getWinner = (squares) => {
  for (let i = 0; i < winLines.length; i += 1) {
    const winner = checkLine(squares, winLines[i]);
    if (winner) { return winner; }
  }
  return null;
};

export {
  getWinner,
  makeNewBoard,
};
