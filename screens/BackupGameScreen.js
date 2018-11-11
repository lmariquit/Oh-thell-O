/* eslint-disable complexity */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
// import { SIZE, getAllMoves } from '../Logic/GameLogic.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const squares = [];
    for (let i = 0; i < 8; i++) {
      squares.push(Array(8).fill(null));
    }
    squares[3][3] = 'O';
    squares[3][4] = 'X';
    squares[4][3] = 'X';
    squares[4][4] = 'O';
    this.state = {
      history: [
        {
          squares: squares,
          col: null,
          row: null,
          xScore: 2,
          oScore: 2,
          jumpNext: false,
        },
      ],
      gameState: this.state.history[0].squares,
      stepNumber: 0,
      xIsNext: true,
    };

    // this.state = {
    //   gameState: [
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //   ],
    //   validMoves: [
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //   ],
    //   currentPlayer: 1,
    //   playerOneName: '',
    //   playerOneCount: 0,
    //   playerTwoName: '',
    //   playerTwoCount: 0,
    //   SIZE: 8,
    //   SIZE2: 64,
    //   // OP: {
    //   //   MINUS: 0,
    //   //   PLUS: 1,
    //   // },
    // };
  }

  componentDidMount() {
    this.initializeGame();
    this.blackCount();
    this.whiteCount();
  }

  // componentDidUpdate() {
  //   this.blackCount();
  //   this.whiteCount();
  // }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      currentPlayer: 1,
    });
    this.calculateValidMoves(this.state.currentPlayer, this.state.gameState);
  };

  calculateWinner(squares, xIsNext) {
    const count = countXO(squares);
    if (!searchValidSquares(squares, xIsNext)) {
      return winner(count.xCount, count.oCount);
    }
    return null;
  }

  winner(xCount, oCount) {
    if (xCount > oCount) {
      return 'X';
    } else if (xCount < oCount) {
      return 'O';
    } else {
      return 'Draw';
    }
  }

  countXO(squares) {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (squares[i][j] === 'X') {
          xCount++;
        } else if (squares[i][j] === 'O') {
          oCount++;
        }
      }
    }
    return { xCount: xCount, oCount: oCount };
  }

  onNewGamePress = () => {
    this.initializeGame();
  };

  // eslint-disable-next-line complexity
  // calculateValidMoves(who, gameBoard) {
  //   let other = this.state.currentPlayer === 1 ? -1 : 1;

  //   let validBoard = [
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0],
  //   ];

  //   for (let row = 0; row < 8; row++) {
  //     for (let col = 0; col < 8; col++) {
  //       // console.log('gameBoard: ', gameBoard);
  //       if (gameBoard[row][col] === 0) {
  //         // check above current spot
  //         let nw = this.validMove(who, -1, -1, row, col, gameBoard);
  //         let nn = this.validMove(who, -1, 0, row, col, gameBoard);
  //         let ne = this.validMove(who, -1, 1, row, col, gameBoard);
  //         // check alongside current spot
  //         let ww = this.validMove(who, 0, -1, row, col, gameBoard);
  //         let ee = this.validMove(who, 0, 1, row, col, gameBoard);
  //         // check below current spot
  //         let sw = this.validMove(who, 1, -1, row, col, gameBoard);
  //         let ss = this.validMove(who, 1, 0, row, col, gameBoard);
  //         let se = this.validMove(who, 1, 1, row, col, gameBoard);

  //         if (nw || nn || ne || ww || ee || sw || ss || se) {
  //           validBoard[row][col] = who;
  //         }
  //         // console.log(
  //         //   `calculated validBoard[${row}][${col}]: ${validBoard[row][col]} `
  //         // );
  //       }
  //     }
  //   }
  //   this.setState({ validMoves: validBoard });
  //   // console.log(`calculated valid moves board: `, this.state.validMoves);

  //   return validBoard;
  // }

  // // check if position at row, col contains the oppsite of currentPLayer on board && checks if the line adding deltaRow + row || deltaCol + col eventually ends in currentPlayer coloe
  // // eslint-disable-next-line complexity
  // validMove = (who, deltaRow, deltaCol, row, col, gameBoard) => {
  //   let other = this.state.currentPlayer === 1 ? -1 : 1;

  //   if (deltaRow + row < 0 || row + deltaRow > 7) {
  //     return false;
  //   }
  //   if (deltaCol + col < 0 || deltaCol + col > 7) {
  //     return false;
  //   }
  //   if (gameBoard[deltaRow + row][deltaCol + col] != other) {
  //     return false;
  //   }
  //   if (deltaRow + deltaRow + row < 0 || row + deltaRow + deltaRow > 7) {
  //     return false;
  //   }
  //   if (deltaCol + deltaCol + col < 0 || deltaCol + deltaCol + col > 7) {
  //     return false;
  //   }
  //   // console.log('hitting checkLineMatch return line 185');
  //   return this.checkLineMatch(
  //     who,
  //     deltaRow,
  //     deltaCol,
  //     row + deltaRow + deltaRow,
  //     col + deltaCol + deltaCol,
  //     gameBoard
  //   );
  // };

  // // check if there's opposing color on line starting at row,col and on
  // checkLineMatch = (who, deltaRow, deltaCol, row, col, gameBoard) => {
  //   if (gameBoard[row][col] === who) {
  //     return true;
  //   }
  //   if (deltaRow + row < 0 || row + deltaRow > 7) {
  //     return false;
  //   }
  //   if (deltaCol + col < 0 || col + deltaCol > 7) {
  //     return false;
  //   }
  //   // console.log(
  //   //   'row: ',
  //   //   row,
  //   //   ' col: ',
  //   //   col,
  //   //   ' gameState: ',
  //   //   this.state.gameState[row][col]
  //   // );
  //   // return true;
  //   this.checkLineMatch(
  //     who,
  //     deltaRow,
  //     deltaCol,
  //     row + deltaRow,
  //     col + deltaCol,
  //     gameBoard
  //   );
  // };

  turnAllStones(squares, xIsNext, row, col) {
    if (
      turnLineStones(squares, xIsNext, row, col, -1, -1) ||
      turnLineStones(squares, xIsNext, row, col, -1, 0) ||
      turnLineStones(squares, xIsNext, row, col, -1, 1) ||
      turnLineStones(squares, xIsNext, row, col, 0, -1) ||
      turnLineStones(squares, xIsNext, row, col, 0, 1) ||
      turnLineStones(squares, xIsNext, row, col, 1, -1) ||
      turnLineStones(squares, xIsNext, row, col, 1, 0) ||
      turnLineStones(squares, xIsNext, row, col, 1, 1)
    ) {
      return true;
    }
    return false;
  }

  turnLineStones(squares, xIsNext, row, col, addRow, addCol) {
    let rowCount = addRow;
    let colCount = addCol;
    let indexes = [];
    while (
      -1 < row - rowCount &&
      8 > row - rowCount &&
      -1 < col - colCount &&
      8 > col - colCount
    ) {
      const square = squares[row - rowCount][col - colCount];
      if (square === null) {
        return false;
      }
      if ((xIsNext && square === 'X') || (!xIsNext && square === 'O')) {
        if (rowCount !== addRow || colCount !== addCol) {
          turnStones(squares, indexes, xIsNext);
          return true;
        }
        return false;
      }
      indexes.push([row - rowCount, col - colCount]);
      rowCount += addRow;
      colCount += addCol;
    }
    return false;
  }

  turnStones(squares, indexes, xIsNext) {
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (xIsNext) {
        squares[index[0]][index[1]] = 'X';
      } else {
        squares[index[0]][index[1]] = 'O';
      }
    }
  }

  searchValidSquares(squares, xIsNext) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (squares[i][j] !== null) continue;
        if (this.isValidSquare(squares, xIsNext, i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  // eslint-disable-next-line complexity
  isValidSquare(squares, xIsNext, row, col) {
    if (
      this.isValidLine(squares, xIsNext, row, col, -1, 0) ||
      this.isValidLine(squares, xIsNext, row, col, -1, -1) ||
      this.isValidLine(squares, xIsNext, row, col, -1, 1) ||
      this.isValidLine(squares, xIsNext, row, col, 0, -1) ||
      this.isValidLine(squares, xIsNext, row, col, 0, 1) ||
      this.isValidLine(squares, xIsNext, row, col, 1, -1) ||
      this.isValidLine(squares, xIsNext, row, col, 1, 0) ||
      this.isValidLine(squares, xIsNext, row, col, 1, 1)
    ) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line complexity
  isValidLine(squares, xIsNext, row, col, addRow, addCol) {
    let rowCount = addRow;
    let colCount = addCol;
    while (
      -1 < row - rowCount &&
      8 > row - rowCount &&
      -1 < col - colCount &&
      8 > col - colCount
    ) {
      const square = squares[row - rowCount][col - colCount];
      if (square === null) {
        return false;
      }
      if ((xIsNext && square === 'X') || (!xIsNext && square === 'O')) {
        if (rowCount === addRow && colCount === addCol) {
          return false;
        } else {
          return true;
        }
      }
      rowCount += addRow;
      colCount += addCol;
    }
    return false;
  }

  onTilePress = (row, col) => {
    //Don't allow tiles to change:
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    //Grab current Player
    let currentPlayer = this.state.xIsNext;
    // console.log(
    //   'currentPlayer before calculate moves: ',
    //   this.state.currentPlayer
    // );

    // calculate valid moves:
    this.searchValidSquares(this.state.gameState, currentPlayer);

    // //Set correct tile:
    let arr = this.state.gameState.slice();
    console.log(
      `tilePress validMoves[${row}][${col}]: `,
      this.state.validMoves[row][col]
    );
    if (this.state.validMoves[row][col] === this.state.currentPlayer) {
      arr[row][col] = currentPlayer;
    }
    this.setState({ gameState: arr });

    //swap players:
    let nextPlayer = currentPlayer === 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // check score:
    this.blackCount();
    this.whiteCount();

    //Check for Winners
    // let winner = this.getWinner();
    // if (winner === 1) {
    //   Alert.alert('Player one wins!');
    //   this.initializeGame();
    // }
    // if (winner === -1) {
    //   Alert.alert('Player two wins!');
    //   this.initializeGame();
    // }
  };

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={[styles.container, styles.welcome]}>
        <Text> Welcome to Othello</Text>
        {/* line 1--------------------- */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(0, 7)}
          </TouchableOpacity>
        </View>
        {/* line 2--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(1, 7)}
          </TouchableOpacity>
        </View>
        {/* line 3--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(2, 7)}
          </TouchableOpacity>
        </View>
        {/* line 4--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(3, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(3, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(3, 7)}
          </TouchableOpacity>
        </View>
        {/* line 5--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(4, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(4, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(4, 7)}
          </TouchableOpacity>
        </View>
        {/* line 6--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(5, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(5, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(5, 7)}
          </TouchableOpacity>
        </View>
        {/* line 7--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(6, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(6, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(6, 7)}
          </TouchableOpacity>
        </View>
        {/* line 8--------------------- */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(7, 0)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 1)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 2)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 3)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 3)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 4)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 4)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 5)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 5)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 6)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 6)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(7, 7)}
            style={[styles.tile]}
          >
            {this.renderIcon(7, 7)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }} />
        <Button title="New Game" onPress={this.onNewGamePress} />

        <View style={{ paddingTop: 50 }} />
        <Text>
          {this.state.currentPlayer === 1 ? 'Player One' : 'Player Two'}s turn!
        </Text>

        <View style={{ paddingTop: 50 }} />
        <Text>
          White: {this.state.playerTwoCount} Black: {this.state.playerOneCount}{' '}
        </Text>
      </View>
    );
  }
}

// const WindowSize = Dimensions.get('window');
// const BoardWidth = WindowSize.width;
// const CellSize = Math.floor(BoardWidth / SIZE);
// const PieceSize = Math.floor(CellSize * 0.8);
// const PieceMargin = (CellSize - PieceSize) / 2;
// const PieceRadius = PieceSize / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tile: {
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 20,
  },
  tileO: {
    color: 'green',
    fontSize: 20,
  },
  welcome: {
    fontSize: 40,
    paddingBottom: 50,
  },
  // grid: {
  //   backgroundColor: 'green',
  //   width: CellSize,
  //   height: CellSize,
  //   zIndex: 0,
  //   borderWidth: StyleSheet.hairlineWidth,
  // },
  white: {
    backgroundColor: 'white',
  },
  transparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  black: {
    backgroundColor: 'black',
  },
  // piece: {
  //   width: PieceSize,
  //   height: PieceSize,
  //   margin: PieceMargin,
  //   borderWidth: 2,
  //   zIndex: 1,
  //   borderRadius: PieceRadius,
  // },
});
