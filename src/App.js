import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import WelcomeScreen from './WelcomeScreen'
import log from './log.json'

class App extends Component {
  constructor(){
    super()
    this.state = {
      character: null
    }
    this.onStartGame = this.onStartGame.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem('character'))
    {
      let char = JSON.parse(localStorage.getItem('character'))
      if(char.curHealth <= 0) char = null;
      this.setState({character: char})
    }
  }

  onStartGame(character) {
    this.setState({character: character})
    localStorage.setItem('character',JSON.stringify(character));
  }

  handleRestart = () => {
    log.Messages = [
      {
          "text": "Welcome to the game!"
      }
    ]
    this.setState({character: null})
    localStorage.setItem('character', null);
  }

  render() {
    return (
     (this.state.character !== null) ? <Game character={this.state.character} restartGame={this.handleRestart}/> : <WelcomeScreen startGame={this.onStartGame}/> 
    );
  }
}

export default App;
