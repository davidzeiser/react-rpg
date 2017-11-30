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

  onStartGame(character) {
    this.setState({character: character})
  }

  handleRestart = () => {
    console.log("app.js restart")
    log.Messages = [
      {
          "text": "Welcome to the game!"
      }
    ]
    this.setState({character: null})
  }

  render() {
    return (
     (this.state.character !== null) ? <Game character={this.state.character} restartGame={this.handleRestart}/> : <WelcomeScreen startGame={this.onStartGame}/> 
    );
  }
}

export default App;
