import Cell, { CELL_STATUS } from './Cell.js';
import { SIZE, getAllMoves } from './GameLogic.js';

export default class OtelloBoard {
  constructor(props) {
    this.state = {
      gameState: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      currentPlayer: 1,
      playerOneName: '',
      playerTwoName: '',
    };
  }

  componentDidMount() {
    this.initializeGame();
  }
  initialValues() {
    let middle = SIZE / 2 - 1;
    this.setState({
      gameState: (this.gameState[SIZE * middle + middle] = 1),
    });
    this.setState({
      gameState: (this.gameState[SIZE * middle + middle + 1] = -1),
    });
    this.setState({
      gameState: (this.gameState[SIZE * (middle + 1) + middle] = -1),
    });
    this.setState({
      gameState: (this.gameState[SIZE * (middle + 1) + middle + 1] = 1),
    });
  }

  // count remaining
  get whiteCount() {
    let count = 0;
    this.cells.map(cell => {
      if (cell.status === CELL_STATUS.WHITE) {
        count++;
      }
    });
    return count;
  }

  get blackCount() {
    let count = 0;
    this.cells.map(cell => {
      if (cell.status === CELL_STATUS.BLACK) {
        count++;
      }
    });
    return count;
  }

  get emptyCount() {
    return SIZE * SIZE - this.whiteCount - this.blackCount;
  }

  // Turns

  changeTurn() {
    this.turn =
      this.turn === CELL_STATUS.BLACK ? CELL_STATUS.WHITE : CELL_STATUS.BLACK;
  }

  // Game logic

  updateBoard(pos) {
    let moves = getAllMoves(pos, this.turn, this.cells);
    // Do the change
    if (moves.length > 0) {
      /* console.log(JSON.stringify(moves))*/
      this.cells[pos].status = this.turn;
      this.turnMoveTiles(moves, this.turn);
      this.changeTurn();
      if (!this.calculateIfValidMovesExist()) {
        this.changeTurn();
      }
    }
  }

  calculateIfValidMovesExist() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === 0) {
        let moves = getAllMoves(i, this.turn, this.cells);
        if (moves.length > 1) {
          return true;
        }
      }
    }
    return false;
  }

  turnMoveTiles(moves, status) {
    for (let i = 0; i < moves.length; i++) {
      this.cells[moves[i]].status = status;
    }
  }
}
