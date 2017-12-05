import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

import Grid from 'material-ui/Grid';


export default class InnWindow extends Component {

    state = {
        rested: false
    }

    componentWillMount() {
        log.Messages.push({ text: constants.Areas[1].enter })
    }

    leave = () => {
        log.Messages.push({ text: constants.Areas[1].exit })
        this.props.exitButton()
    }

    handleRest = () => {
        if (this.props.characterData.curHealth === this.props.characterData.maxHealth) {
            log.Messages.push({ text: `You already have full health.` })
            this.props.updateCharacter(this.props.characterData);
            this.setState({ rested: true })
            return;
        }
        if (this.props.characterData.gold < 25) {
            log.Messages.push({ text: `<b>You don't have enough gold.` })
            this.props.updateCharacter(this.props.characterData);
            this.setState({ rested: false })
        } else {
            log.Messages.push({ text: `You rest and recover <b>${this.props.characterData.maxHealth - this.props.characterData.curHealth} health.` })
            this.props.characterData.curHealth = this.props.characterData.maxHealth;
            this.props.characterData.gold -= 25;
            this.props.updateCharacter(this.props.characterData);
            this.setState({ rested: true })
        }
    }

    render() {
        const name = constants.Areas[1].name
        const header = constants.Areas[1].header
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

                    <Grid container spacing={0} elevation={5} className="buttonGrid">
                        <Grid item xs={4} >

                            <Button raised color="primary" disabled>
                                Info
                        </Button>
                        </Grid>

                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.handleRest} disabled={this.state.rested}>
                                Rest (25 Gold)
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
