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

export default function Board(props) {
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
          onPress={() => this.props.onTilePress(0, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(0, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(0, 7)}
        </TouchableOpacity>
      </View>
      {/* line 2--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(1, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(1, 7)}
        </TouchableOpacity>
      </View>
      {/* line 3--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(2, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(2, 7)}
        </TouchableOpacity>
      </View>
      {/* line 4--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(3, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(3, 7)}
        </TouchableOpacity>
      </View>
      {/* line 5--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(4, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(4, 7)}
        </TouchableOpacity>
      </View>
      {/* line 6--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(5, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(5, 7)}
        </TouchableOpacity>
      </View>
      {/* line 7--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(6, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(6, 7)}
        </TouchableOpacity>
      </View>
      {/* line 8--------------------- */}

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 0)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 0)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 1)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 1)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 2)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 2)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 3)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 3)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 4)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 4)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 5)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 5)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 6)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 6)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.onTilePress(7, 7)}
          style={[styles.tile]}
        >
          {this.props.renderIcon(7, 7)}
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
});
