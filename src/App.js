import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
import WelcomeScreen from './WelcomeScreen'

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

  render() {
    return (
     (this.state.character !== null) ? <Game character={this.state.character}/> : <WelcomeScreen startGame={this.onStartGame}/> 
    );
  }
}

export default App;
