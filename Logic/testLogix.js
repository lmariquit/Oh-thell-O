function calculateValidMoves(
  who = this.state.currentPLayer,
  gameBoard = this.state.gameBoard
) {
  let validBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (gameBoard[row][col] === 0) {
        // check above current spot
        let nw = validMove(who, -1, -1, row, col, gameBoard);
        let nn = validMove(who, -1, 0, row, col, gameBoard);
        let ne = validMove(who, -1, 1, row, col, gameBoard);
        // check alongside current spot
        let ww = validMove(who, 0, -1, row, col, gameBoard);
        let ee = validMove(who, 0, 1, row, col, gameBoard);
        // check bleow current spot
        let sw = validMove(who, 1, -1, row, col, gameBoard);
        let ss = validMove(who, 1, 0, row, col, gameBoard);
        let se = validMove(who, 1, 1, row, col, gameBoard);

        if (nw || nn || ne || ww || ee || sw || ss || se) {
          valid[row][col] = who;
        }
      }
    }
  }
  return validBoard;
}

// check if position at row, col contains the oppsite of currentPLayer on board && checks if the line adding deltaRow + row || deltaCol + col eventually ends in currentPLayer coloe
const validMove = (who, deltaRow, deltaCol, row, col, gameBoard) => {
  let other = this.state.currentPlayer === 1 ? -1 : 1;

  if (deltaRow + row < 0 || row + deltaRow > 7) {
    return false;
  }
  if (deltaRow + deltaRow + row < 0 || row + deltaRow + deltaRow > 7) {
    return false;
  }
  if (deltaCol + col < 0 || deltaCol + col > 7) {
    return false;
  }
  if (deltaCol + deltaCol + col < 0 || deltaCol + deltaCol + col > 7) {
    return false;
  }
  if (gameBoard[deltaRow + row][deltaCol + col] !== other) {
    return false;
  }
  return checkLineMatch(
    who,
    deltaRow,
    deltaCol,
    row + deltaRow + delatRow,
    col + deltaCol + deltaCol,
    gameBoard
  );
};

// check if there's opposing color on line starting at row,col and on
const checkLineMatch = (who, deltaRow, deltaCol, row, col, gameBoard) => {
  if (gameBoard[row][col] === who) {
    return true;
  }
  if (deltaRow + row < 0 || row + deltaRow > 7) {
    return false;
  }
  if (deltaRow + deltaRow + row < 0 || row + deltaRow + deltaRow > 7) {
    return false;
  }
  return checkLineMatch(
    who,
    deltaRow,
    deltaCol,
    row + deltaRow,
    col + deltaCol,
    gameBoard
  );
};
