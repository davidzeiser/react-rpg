import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';
import TownWindow from './TownWindow';
import ShopWindow from './ShopWindow';
import InnWindow from './InnWindow';
import AdventureWindow from './AdventureWindow';
import BattleWindow from './BattleWindow';
import DeathWindow from './DeathWindow';

export default class MainWindow extends Component {
    areas = this.props.states
    render() {
        let content = '';
        switch (this.props.gameState) {
            case this.areas.TOWN: content = <TownWindow
                shopButton={() => this.props.changeState(this.areas.SHOP)}
                innButton={() => this.props.changeState(this.areas.INN)}
                areaButton={() => this.props.changeState(this.areas.AREASELECT)}
                lastArea={this.props.lastArea} />
                break;
            case this.areas.INN: content = <InnWindow
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                characterData={this.props.characterData}
                updateCharacter={this.props.updateCharacter}
            />
                break;
            case this.areas.SHOP: content = <ShopWindow
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
            />
                break;
            case this.areas.AREASELECT: content = <AdventureWindow
                easyButton={() => this.props.changeState(this.areas.BATTLE1)}
                medButton={() => this.props.changeState(this.areas.BATTLE2)}
                hardButton={() => this.props.changeState(this.areas.BATTLE3)}
            />
                break;

            //todo: make these one thing
            case this.areas.BATTLE1: content = <BattleWindow
                difficulty={0}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />
                break;
            case this.areas.BATTLE2: content = <BattleWindow
                difficulty={1}
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />
                break;
            case this.areas.BATTLE3: content = <BattleWindow
                exitButton={() => this.props.changeState(this.areas.TOWN)}
                difficulty={2}
                updateCharacter={this.props.updateCharacter}
                characterData={this.props.characterData}                
            />

                break;
            case this.areas.GAMEOVER: content = <DeathWindow
                restartGame={this.props.restartGame}
            />
                break;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
};
