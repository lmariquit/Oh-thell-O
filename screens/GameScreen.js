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
  ImageBackground,
} from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
// import { SIZE, getAllMoves } from '../Logic/GameLogic.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      validMoves: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      history: [],
      era: 0,
      currentPlayer: 1,
      playerOneName: '',
      playerOneCount: 0,
      playerTwoName: '',
      playerTwoCount: 0,
    };
    // this.undoMove = this.undoMove.bind(this);
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

  initializeGame = async () => {
    console.log('\n-----------------initializeGame()');
    await this.setState({
      gameState: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      currentPlayer: 1,
    });
    await this.calculateValidMoves(
      this.state.currentPlayer,
      this.state.gameState
    );
    // this.historyPush();
  };

  async whiteCount() {
    let count = 0;
    let cells = this.state.gameState;
    cells.map(row => {
      row.map(elem => {
        if (elem === 2) {
          count++;
        }
      });
    });
    await this.setState({ playerTwoCount: count });
  }

  async blackCount() {
    let count = 0;
    let cells = this.state.gameState;

    cells.map(row => {
      row.map(elem => {
        if (elem === 1) {
          count++;
        }
      });
    });
    await this.setState({ playerOneCount: count });
  }

  emptyCount() {
    return this.state.SIZE2 - this.whiteCount - this.blackCount;
  }

  //returns 1 if player 1 wins, 2 for player 2 win, and 0 if no winner
  // getWinner = () => {
  // TO-DO
  // };

  onNewGamePress = () => {
    this.initializeGame();

    // this.setState({
    //   gameState: [
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 2, 1, 0, 0, 0],
    //     [0, 0, 0, 1, 2, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //   ],
    //   currentPlayer: 1,
    // });
    // this.initializeGame();

    this.whiteCount();
    this.blackCount();
  };

  // eslint-disable-next-line complexity
  // eslint-disable-next-line max-statements
  async calculateValidMoves(who, gameBoard) {
    await this.setState({
      validMoves: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    });
    let validMoveCounter = 0;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (gameBoard[row][col] === this.state.currentPlayer) {
          // console.log(
          //   `gameboard[${row}][${col}] before calculate moves`,
          //   gameBoard[row][col]
          // );

          // check above current spot
          /*nw*/ if (this.validMove(who, -1, -1, row, col, gameBoard)) {
            validMoveCounter++;
          }
          /*nn*/ if (this.validMove(who, -1, 0, row, col, gameBoard)) {
            validMoveCounter++;
          }
          /*ne*/ if (this.validMove(who, -1, 1, row, col, gameBoard)) {
            validMoveCounter++;
          }
          // check alongside current spot
          /*ww*/ if (this.validMove(who, 0, -1, row, col, gameBoard)) {
            validMoveCounter++;
          }

          /*ee*/ if (this.validMove(who, 0, 1, row, col, gameBoard)) {
            validMoveCounter++;
          }
          // check below current spot
          /*sw*/ if (this.validMove(who, 1, -1, row, col, gameBoard)) {
            validMoveCounter++;
          }
          /*ss*/ if (this.validMove(who, 1, 0, row, col, gameBoard)) {
            validMoveCounter++;
          }
          /*se*/ if (this.validMove(who, 1, 1, row, col, gameBoard)) {
            validMoveCounter++;
          }

          if (!validMoveCounter > 0) {
            let other = this.state.currentPlayer === 1 ? 2 : 1;
            this.setState({
              currentPlayer: other,
            });
          }
        }
      }
    }
    // console.log('calculated valid move: ', validBoard);
    // this.setState({ validMoves: validBoard });
  }

  // check if position at row, col contains the oppsite of currentPLayer on board && checks if the line adding deltaRow + row || deltaCol + col eventually ends in currentPlayer coloe
  // eslint-disable-next-line complexity
  validMove = (who, deltaRow, deltaCol, row, col, gameBoard) => {
    // console.log('validMove gameboard param: ', gameBoard);
    let other = this.state.currentPlayer === 1 ? 2 : 1;

    if (deltaRow + row < 0 || row + deltaRow > 7) {
      return false;
    }
    if (deltaCol + col < 0 || deltaCol + col > 7) {
      return false;
    }
    if (gameBoard[deltaRow + row][deltaCol + col] !== other) {
      return false;
    }
    if (deltaRow + deltaRow + row < 0 || row + deltaRow + deltaRow > 7) {
      return false;
    }
    if (deltaCol + deltaCol + col < 0 || deltaCol + deltaCol + col > 7) {
      return false;
    }
    // console.log(
    //   `line182 who: ${who} row${row} col${col} dRow${deltaRow} dCol${deltaCol} gameBoard[${row}][${col}]: `,
    //   gameBoard[row][col],
    //   'ckLnMtch: ',
    //   this.checkLineMatch(
    //     who,
    //     deltaRow,
    //     deltaCol,
    //     row + deltaRow,
    //     col + deltaCol,
    //     gameBoard
    //   )
    // );
    return this.checkLineMatch(
      who,
      deltaRow,
      deltaCol,
      row + deltaRow,
      col + deltaCol,
      gameBoard
    );
  };

  // check if there's opposing color on line starting at row,col and on
  checkLineMatch = async (who, deltaRow, deltaCol, row, col, gameBoard) => {
    let other = this.state.currentPlayer === 1 ? 2 : 1;

    if (gameBoard[row][col] === 0) {
      let validBoard = this.state.validMoves.slice();
      validBoard[row][col] = 'v';
      await this.setState({ validMoves: validBoard });

      return true;
    }
    // if (gameBoard[row][col] === other) {
    //   this.checkLineMatch(
    //     who,
    //     deltaRow,
    //     deltaCol,
    //     row + deltaRow,
    //     col + deltaCol,
    //     gameBoard
    //   );
    // }
    if (gameBoard[row][col] === who) {
      return false;
    }

    if (deltaRow + row < 0 || row + deltaRow > 7) {
      return false;
    }
    if (deltaCol + col < 0 || col + deltaCol > 7) {
      return false;
    }

    // return true;
    return this.checkLineMatch(
      who,
      deltaRow,
      deltaCol,
      row + deltaRow,
      col + deltaCol,
      gameBoard
    );
  };

  turnTiles(who, row, col, gameBoard) {
    // if (this.state.currentPlayer === 1) {
    //   let other = 2;
    // } else {
    //   let other = 1;
    // }

    // if (gameBoard[row][col] === this.state.currentPlayer) {

    // check above current spot
    let nw = this.validSwap(who, -1, -1, row, col, gameBoard);
    let nn = this.validSwap(who, -1, 0, row, col, gameBoard);
    let ne = this.validSwap(who, -1, 1, row, col, gameBoard);
    // check alongside current spot
    let ww = this.validSwap(who, 0, -1, row, col, gameBoard);

    let ee = this.validSwap(who, 0, 1, row, col, gameBoard);
    // check below current spot
    let sw = this.validSwap(who, 1, -1, row, col, gameBoard);
    let ss = this.validSwap(who, 1, 0, row, col, gameBoard);
    let se = this.validSwap(who, 1, 1, row, col, gameBoard);

    // if(nw || nn || ne || ww || ee || sw || ss || se){
    //   validBoard[row][col] = 'v';

    // }
    // }
  }

  validSwap(who, deltaRow, deltaCol, row, col, gameBoard) {
    let other = this.state.currentPlayer === 1 ? 2 : 1;

    if (deltaRow + row < 0 || row + deltaRow > 7) {
      return false;
    }
    if (deltaCol + col < 0 || deltaCol + col > 7) {
      return false;
    }
    if (gameBoard[deltaRow + row][deltaCol + col] !== other) {
      return false;
    }
    // if (deltaRow + deltaRow + row < 0 || row + deltaRow + deltaRow > 7) {
    //   return false;
    // }
    // if (deltaCol + deltaCol + col < 0 || deltaCol + deltaCol + col > 7) {
    //   return false;
    // }
    console.log(
      `hitting validSwap line 341 newPiece on gameBoard[${row}][${col}]: `,
      gameBoard[row][col]
    );
    // if (
    //   this.checkTurnLine(
    //     who,
    //     deltaRow,
    //     deltaCol,
    //     row + deltaRow,
    //     col + deltaCol,
    //     gameBoard
    //   )
    // ) {
    //   gameBoard[row][col] = this.state.currentPlayer;
    // }
    return this.checkTurnLine(
      who,
      deltaRow,
      deltaCol,
      row + deltaRow,
      col + deltaCol,
      gameBoard
    );

    // return this.checkTurnLine(
    //   who,
    //   deltaRow,
    //   deltaCol,
    //   row + deltaRow,
    //   col + deltaCol,
    //   gameBoard
    // );
  }

  checkTurnLine = async (who, deltaRow, deltaCol, row, col, gameBoard) => {
    console.log(`hitting checkTurnLine line 376 row${row} col${col}`);
    if (deltaRow + row < 0 || row + deltaRow > 7) {
      return false;
    }
    if (deltaCol + col < 0 || deltaCol + col > 7) {
      return false;
    }

    // if (gameBoard[row][col] === other) {
    //   this.checkTurnLine(
    //     who,
    //     deltaRow,
    //     deltaCol,
    //     row + deltaRow,
    //     col + deltaCol,
    //     gameBoard
    //   );
    // }
    if (gameBoard[row][col] === 0) {
      return false;
    }
    if (
      gameBoard[row + deltaRow][col + deltaCol] === this.state.currentPlayer
    ) {
      gameBoard[row][col] = this.state.currentPlayer;
      await this.turnLine(
        who,
        deltaRow,
        deltaCol,
        row - deltaRow,
        col - deltaCol,
        gameBoard
      );

      await this.setState({ gameState: gameBoard });

      return true;
    }

    // return true;
    // return this.checkTurnLine(
    //   who,
    //   deltaRow,
    //   deltaCol,
    //   row + deltaRow,
    //   col + deltaCol,
    //   gameBoard
    // );
  };

  async turnLine(who, deltaRow, deltaCol, row, col, gameBoard) {
    let other = this.state.currentPlayer === 1 ? 2 : 1;
    console.log(`hitting turnLine line 428 row${row} col${col}`);
    if (gameBoard[row][col] === other) {
      gameBoard[row][col] = this.state.currentPlayer;

      this.turnLine(
        who,
        deltaRow,
        deltaCol,
        row - deltaRow,
        col - deltaCol,
        gameBoard
      );
    }
    if (gameBoard[row][col] === this.state.currentPlayer) {
      await this.setState({ gameState: gameBoard });
    }
    if (gameBoard[row][col] === 0) {
      return false;
    }
    if (deltaRow - row < 0 || row - deltaRow > 7) {
      return false;
    }
    if (deltaCol - col < 0 || col - deltaCol > 7) {
      return false;
    }
  }

  // async historyPush() {
  //   let prevHistory = this.state.history.slice();

  //   let recentHistory = {};
  //   recentHistory.gameState = this.state.gameState.slice();
  //   recentHistory.validMoves = this.state.validMoves.slice();
  //   recentHistory.history = this.state.history.slice();
  //   recentHistory.era = this.state.era;
  //   recentHistory.currentPlayer = this.state.currentPlayer;
  //   recentHistory.playerOneCount = this.state.playerOneCount;
  //   recentHistory.playerOneName = this.state.playerOneName.slice();
  //   recentHistory.playerTwoCount = this.state.playerTwoCount;
  //   recentHistory.playerTwoName = this.state.playerTwoName.slice();

  //   let currEra = this.state.era + 1;
  //   await this.setState({ era: currEra });

  //   prevHistory.push(recentHistory);

  //   await this.setState({ history: prevHistory });
  // }

  getWinner() {
    console.log('hitting getWinner line 478');
    if (64 - this.state.playerOneCount - this.state.playerTwoCount < 1) {
      return this.state.playerOneCount > this.state.playerTwoCount ? 1 : 2;
    }
  }

  // undoMove() {
  //   let history = this.state.history.slice();
  //   let currEra = this.state.era;

  //   // console.log('undoMove this.state', this.state);

  //   this.setState({
  //     gameState: history[currEra].gameState,
  //     validMoves: history[currEra].validMoves,
  //     era: history[currEra].era,
  //     currentPlayer: history[currEra].currentPlayer,
  //     playerOneCount: history[currEra].playerOneCount,
  //     playerTwoCount: history[currEra].playerTwoCount,
  //     history: history[currEra].history,
  //   });
  // }

  onTilePress = async (row, col) => {
    console.log(`\nonTilePress row${row} col${col}`);
    //Don't allow tiles to change:
    let value = this.state.validMoves[row][col];
    if (value !== 'v') {
      return;
    }

    //Grab current Player
    let currentPlayer = this.state.currentPlayer;

    // calculate valid moves:
    // this.calculateValidMoves(currentPlayer, this.state.gameState);
    // console.log(
    //   `onTilePress validMoves[${row}][${col}]: `,
    //   this.state.validMoves[row][col]
    // );

    // //Set correct tile:
    let arr = this.state.gameState.slice();

    arr[row][col] = currentPlayer;
    console.log(`hitting onTilePress line 526 row${row} col${col}`);
    await this.turnTiles(currentPlayer, row, col, arr);

    await this.setState({ gameState: arr });

    // Save to history:
    // this.historyPush();
    // console.log(
    //   'this.state.history[last].era: ',
    //   this.state.history[this.state.currEra].era
    // );

    //swap players:
    if (this.state.currentPlayer === 1) {
      await this.setState({ currentPlayer: 2 });
    } else {
      await this.setState({ currentPlayer: 1 });
    }
    // let nextPlayer = currentPlayer === 1 ? 2 : 1;
    // this.setState({ currentPlayer: nextPlayer });

    // check score:
    await this.blackCount();
    await this.whiteCount();

    // check new valid moves
    console.log(`hitting 549 in onTilePress row${row} col${col}`);
    await this.calculateValidMoves(
      this.state.currentPlayer,
      this.state.gameState
    );

    // Check for Winners
    let winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Player one wins!');
      this.initializeGame();
    }
    if (winner === 2) {
      Alert.alert('Player two wins!');
      this.initializeGame();
    }
  };

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    if (this.state.validMoves[row][col] === 'v') {
      return <Icon name="check" style={styles.check} />;
    }
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case 2:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/blueMetal1.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={[styles.container, styles.welcome]}>
          <Text> Welcome to O.thell.O</Text>
          {/* X axis Label--------------------- */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={[styles.blankTile]} />

            <Text style={[styles.numTile]}>1</Text>

            <Text style={[styles.numTile]}>2</Text>

            <Text style={[styles.numTile]}>3</Text>

            <Text style={[styles.numTile]}>4</Text>

            <Text style={[styles.numTile]}>5</Text>

            <Text style={[styles.numTile]}>6</Text>

            <Text style={[styles.numTile]}>7</Text>

            <Text style={[styles.numTile]}>8</Text>

            <View style={[styles.blankTile]} />
          </View>
          {/* line 1--------------------- */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={[styles.letterTile]}>1</Text>

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
            <Text style={[styles.letterTile]}>1</Text>
          </View>
          {/* line 2--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>2</Text>

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
            <Text style={[styles.letterTile]}>2</Text>
          </View>
          {/* line 3--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>3</Text>

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
            <Text style={[styles.letterTile]}>3</Text>
          </View>
          {/* line 4--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>4</Text>

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
            <Text style={[styles.letterTile]}>4</Text>
          </View>

          {/* line 5--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>5</Text>

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
            <Text style={[styles.letterTile]}>5</Text>
          </View>
          {/* line 6--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>6</Text>

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
            <Text style={[styles.letterTile]}>6</Text>
          </View>
          {/* line 7--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>7</Text>

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
            <Text style={[styles.letterTile]}>7</Text>
          </View>
          {/* line 8--------------------- */}

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.letterTile]}>8</Text>

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
            <Text style={[styles.letterTile]}>8</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={[styles.blankTile]} />

            <Text style={[styles.numTile]}>1</Text>

            <Text style={[styles.numTile]}>2</Text>

            <Text style={[styles.numTile]}>3</Text>

            <Text style={[styles.numTile]}>4</Text>

            <Text style={[styles.numTile]}>5</Text>

            <Text style={[styles.numTile]}>6</Text>

            <Text style={[styles.numTile]}>7</Text>

            <Text style={[styles.numTile]}>8</Text>

            <View style={[styles.blankTile]} />
          </View>

          <View style={{ paddingTop: 30, fontSize: 50 }} />
          <Button title="New Game" onPress={this.onNewGamePress} />

          {/* <View style={{ paddingTop: 30, fontSize: 50 }} />
        <Button title="Undo Move" onPress={this.undoMove} /> */}
          <View
            style={{
              paddingTop: 20,
              backgroundColor: 'white',
              width: '40%',
              height: '10%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20,
            }}
          >
            <View style={{ paddingTop: 20 }}>
              <Text>
                Current Player: {this.state.currentPlayer === 1 ? 'X' : 'O'}
                {'\n'}
                Valid Moves: <Icon name="check" />
              </Text>
            </View>

            <View style={{ paddingTop: 20 }}>
              <Text>
                O: {this.state.playerTwoCount} X: {this.state.playerOneCount}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
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
  },
  tile: {
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
  },
  numTile: {
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'midnightblue',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTile: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'midnightblue',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankTile: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
  },
  tileX: {
    color: 'red',
    fontSize: 30,
  },
  check: {
    color: 'yellowgreen',
    fontSize: 30,
  },
  tileO: {
    color: 'green',
    fontSize: 30,
  },
  welcome: {
    height: 40,
    fontSize: 40,
    paddingBottom: 50,
    color: 'white',
  },
  info: {
    height: 40,
    fontSize: 40,
    paddingBottom: 50,
    // backgroundColor: 'midnightblue',
    color: 'white',
  },
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
