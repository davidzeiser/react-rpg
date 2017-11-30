import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

const styles = {
    "button": {
        "margin": 10
    }
}

export default class InnWindow extends Component {

    state = {
        rested: false
    }

    componentWillMount() {        
        log.Messages.push({text: constants.Areas[1].enter})
    }

    leave = () => {
        log.Messages.push({text: constants.Areas[1].exit})
        this.props.exitButton()
    }

    handleRest = () => {
        if(this.props.characterData.curHealth === this.props.characterData.maxHealth) {
            log.Messages.push({text: `You already have full health.`})
            this.setState({rested: true})
            return;
        }
        if(this.props.characterData.gold < 25) {
            log.Messages.push({text: `You don't have enough gold.`})
            this.setState({rested: false})
        } else {
            log.Messages.push({text: `You rest and recover ${this.props.characterData.maxHealth - this.props.characterData.curHealth} health.`})
            this.props.characterData.curHealth = this.props.characterData.maxHealth;
            this.props.characterData.gold -= 25;
            this.props.updateCharacter(this.props.characterData);
            this.setState({rested: true})
        }
    }

    render() {
        const name = constants.Areas[1].name
        const header = constants.Areas[1].header
        return (

            <div>
                <div style={{ textAlign: 'center', margin: '20px 0 0 260px' }}>
                    <Typography type="display2">
                        {name}
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {header}
                    </Typography>
                    <Divider />
                    <MessageLog />
                    <Button raised color="primary" style={styles.button} disabled>
                        Info
                    </Button>
                    <Button raised color="primary" style={styles.button} onClick={this.handleRest} disabled={this.state.rested}>
                        Rest (25 Gold)
                    </Button>
                    <Button raised color="primary" style={styles.button} onClick={this.leave}>
                        Leave
                    </Button>                    
                </div>
                <div>
                </div>
            </div>
        );
    }
};
