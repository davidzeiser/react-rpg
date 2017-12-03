import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';
import Grid from 'material-ui/Grid';
import ShopDialog from './ShopDialog';


export default class ShopWindow extends Component {
    state = {
        shopOpen: false
    }

    componentWillMount() {
        log.Messages.push({ text: constants.Areas[2].enter })
    }


    leave = () => {
        log.Messages.push({ text: constants.Areas[2].exit })
        this.props.exitButton()
    }

    openShop = () => {
        this.setState({shopOpen: true})
    }

    closeShop = () => {
        this.setState({shopOpen: false})
    }

    buyItem = (item) => {
        if(this.props.characterData.gold >= constants.Items[item].price) {
            this.props.characterData.inventory.push(item);
            this.props.characterData.gold -= constants.Items[item].price
            this.props.updateCharacter(this.props.characterData);
            log.Messages.push({text: `You bought a ${constants.Items[item].name} for <b>${constants.Items[item].price} gold`})
        }
    }

    sellItems = () => {
        let gold = 0;
        this.props.characterData.inventory.forEach(element => {
        
            gold += (constants.Items[element].price / 10)
        });
        console.log(this.props.characterData.gold)
        
        this.props.characterData.gold += parseInt(gold);

        this.props.characterData.inventory = [];
        this.props.updateCharacter(this.props.characterData);
        log.Messages.push({text: `You sold your items for <b>${gold} gold`})
    }


    render() {
        const name = constants.Areas[2].name
        const header = constants.Areas[2].header
        return (

            <div>
                <div className="area">
                    <Typography type="display2">
                        {name}
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {header}
                    </Typography>
                    <Divider />
                    {this.props.messageLog}
                    <ShopDialog open={this.state.shopOpen} handleRequestClose={this.closeShop} handleSellItem={this.sellItems} buyItem={this.buyItem} characterData={this.props.characterData}/>
                    <Grid container spacing={0} elevation={5} className="buttonGrid">
                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.openShop}>
                                Shop
                        </Button>
                        </Grid>
                        <Grid item xs={4} >
                            <Button raised color="primary" disabled>
                                Quests
                        </Button>
                        </Grid>

                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.leave}>
                                Leave
                        </Button>
                        </Grid>

                    </Grid>

                </div>
            </div>
        );
    }
};
