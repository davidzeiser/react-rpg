import React, { Component } from 'react';
import TownWindow from './TownWindow';
import ShopWindow from './ShopWindow';
import InnWindow from './InnWindow';
import AdventureWindow from './AdventureWindow';
import BattleWindow from './BattleWindow';
import DeathWindow from './DeathWindow';
import MessageLog from '../MessageLog'

export default class MainWindow extends Component {

    handleBeatDifficulty = (diff) => {
        if(diff+1 > this.state.zonesUnlocked)
          this.setState({zonesUnlocked:diff+1})
    
    }

    areas = this.props.states
    render() {
        let content = '';
        switch (this.props.gameState) {
            case this.areas.TOWN: content = <TownWindow
                messageLog={<MessageLog />}
                shopButton={() => this.props.changeState(this.areas.SHOP)}
                innButton={() => this.props.changeState(this.areas.INN)}
                areaButton={() => this.props.changeState(this.areas.AREASELECT)}
                characterData={this.props.characterData}
                lastArea={this.props.lastArea} />
                break;
            case this.areas.INN: content = <InnWindow
                messageLog={<MessageLog />}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                characterData={this.props.characterData}
                updateCharacter={this.props.updateCharacter}
            />
                break;
            case this.areas.SHOP: content = <ShopWindow
                messageLog={<MessageLog />}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}
            />
                break;
            case this.areas.AREASELECT: content = <AdventureWindow                
                messageLog={<MessageLog />}
                characterData={this.props.characterData}
                easyButton={() => this.props.changeState(this.areas.BATTLE1)}
                medButton={() => this.props.changeState(this.areas.BATTLE2)}
                hardButton={() => this.props.changeState(this.areas.BATTLE3)}
            />
                break;

            //todo: make these one thing
            case this.areas.BATTLE1: content = <BattleWindow
                messageLog={<MessageLog />}                
                difficulty={0}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />
                break;
            case this.areas.BATTLE2: content = <BattleWindow
                messageLog={<MessageLog />}                               
                difficulty={1}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />
                break;
            case this.areas.BATTLE3: content = <BattleWindow
                messageLog={<MessageLog />}                               
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                difficulty={2}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />
                break;
            case this.areas.GAMEOVER: content = <DeathWindow
                messageLog={<MessageLog />}
                restartGame={this.props.restartGame}
            />
                break;
                default: break;
        }
        return (
            <div style={{  width:"100%" }}>
                {this.props.MobileHeader}
                {content}
            </div>
        );
    }
};
