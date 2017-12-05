import React, { Component } from 'react';
import CharacterDrawer from '../CharacterDrawer';
import MainWindow from '../MainWindow';
import MobileHeader from '../MobileHeader';
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
    lastArea: 0,
    zonesUnlocked: 0
  }

  changeState = (state) => {
    this.setState({ lastArea: this.state.gameState, gameState: state, mobileIsOpen: false })
  }

  handleCharacterUpdate = (char) => {
    this.setState({ character: char })
    if (char.curHealth <= 0) {
      this.changeState(Areas.GAMEOVER);        
    }
    localStorage.setItem('character',JSON.stringify(char));
  }

  handleMobileToggle = () => {
    this.setState({ mobileIsOpen: !this.state.mobileIsOpen })
  }

  handleBeatDifficulty = (diff) => {
    if(diff+1 > this.state.zonesUnlocked)
      this.setState({zonesUnlocked:diff+1})

  }

  render() {
    const charData = this.state.character
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <CharacterDrawer
          characterData={charData}
          updateCharacter={this.handleCharacterUpdate}
          mobileIsOpen={this.state.mobileIsOpen}
          handleMobileToggle={this.handleMobileToggle}
        />

        <MainWindow
          MobileHeader={<MobileHeader characterData={charData} handleMobileToggle={this.handleMobileToggle} />}
          characterData={charData}
          zonesUnlocked={this.state.zonesUnlocked}
          beatDifficulty={this.handleBeatDifficulty}
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
