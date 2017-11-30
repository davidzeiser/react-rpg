import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';
import TownWindow from './TownWindow';
import ShopWindow from './ShopWindow';
import InnWindow from './InnWindow';
import AdventureWindow from './AdventureWindow';

export default class MainWindow extends Component {
    states = this.props.states
    

    goShop = () =>
    {

    }

    render() {
        let content = '';
        switch (this.props.gameState) {
            case this.states.TOWN: content = <TownWindow 
            shopButton={() => this.props.changeState(this.states.SHOP)} 
            innButton={() => this.props.changeState(this.states.INN)}
            areaButton={() => this.props.changeState(this.states.AREASELECT)}/>
            break;
            case this.states.INN: content = <InnWindow 
            exitButton={() => this.props.changeState(this.states.TOWN)}
            />
            break;
            case this.states.SHOP: content = <ShopWindow 
            exitButton={() => this.props.changeState(this.states.TOWN)}/>
            break;
            case this.states.AREASELECT: content = <AdventureWindow />
            break;
                
        }
        return (
            // other windows
            <div>
                {content}
            </div>
        );
    }
};
