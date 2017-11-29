import React, { Component } from 'react';
import CharacterDrawer from '../CharacterDrawer';
import MainWindow from '../MainWindow';
import ActionBar from '../ActionBar';
import Button from 'material-ui/Button'

const gameState = {
    TOWN: 0,
    INN: 1,
    SHOP: 2,
    AREASELECT: 3,
    BATTLE: 4,
    GAMEOVER: 5
}

export default class Game extends Component {
 
  state = {
      character: this.props.character,
      gameState: gameState.TOWN
  }
 
  render() {
    const charData = this.state.character
    return (
    <div>       
      <CharacterDrawer characterData={charData} />
      <MainWindow characterData={charData} gameState={this.state.gameState} message={this.state.messagelog}/>      
      <ActionBar onClick={this.handleAction} gameState={this.state.gameState}/>
    </div>
    );
  }
};
