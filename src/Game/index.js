import React, { Component } from 'react';
import CharacterDrawer from '../CharacterDrawer';
import MainWindow from '../MainWindow';
import ActionBar from '../ActionBar';
import Button from 'material-ui/Button'

const gameStates = {
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
      gameState: gameStates.TOWN
  }
 
  changeState = (state) => {
    this.setState({gameState: state})
  }

  handleCharacterUpdate = (char) =>
  {
    this.setState({character: char})
  }

  render() {
    const charData = this.state.character
    return (
    <div>       
      <CharacterDrawer characterData={charData} />
      <MainWindow characterData={charData} gameState={this.state.gameState} states={gameStates} changeState={this.changeState} updateCharacter={this.handleCharacterUpdate}/>      
      <ActionBar onClick={this.handleAction} gameState={this.state.gameState}/>
    </div>
    );
  }
};
