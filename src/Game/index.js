import React, { Component } from 'react';
import CharacterDrawer from '../CharacterDrawer';
import MainWindow from '../MainWindow';
import Button from 'material-ui/Button'

const Areas = {
  TOWN: 0,
  INN: 1,
  SHOP: 2,
  AREASELECT: 3,
  BATTLE1: 4,
  BATTLE2: 5,
  BATTLE3: 6,
  GAMEOVER: 7
}

export default class Game extends Component {

  state = {
    character: this.props.character,
    gameState: Areas.TOWN,
    lastArea: 0
  }

  changeState = (state) => {
    this.setState({ lastArea: this.state.gameState, gameState: state })
  }

  handleCharacterUpdate = (char) => {
    this.setState({ character: char })
    if (char.curHealth <= 0) {
      this.changeState(Areas.GAMEOVER);
    }
  }

  render() {
    const charData = this.state.character
    return (
      <div>
        <CharacterDrawer characterData={charData} />
        <MainWindow
          characterData={charData}
          gameState={this.state.gameState}
          lastArea={this.state.lastArea}
          states={Areas}
          changeState={this.changeState}
          updateCharacter={this.handleCharacterUpdate}
          restartGame={this.props.restartGame}
        />
      </div>
    );
  }
};
