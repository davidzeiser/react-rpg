import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import log from '../../log.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
const styles = {
    "button": {
        "margin": 10
    }
}

export default class TownWindow extends Component {

    componentWillMount() {               
        if(this.props.lastArea !== 2 && this.props.lastArea !== 1)
            log.Messages.push({text: `You enter the town of Atrec`})
    }

    render() {
        const name = constants.Areas[0].name
        const header = constants.Areas[0].header
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
                    <Button raised color="primary" style={styles.button} onClick={this.props.shopButton}>
                        Shop
                    </Button>
                    <Button raised color="primary" style={styles.button} onClick={this.props.innButton}>
                        Inn
                    </Button>
                    <Button raised color="primary" style={styles.button} onClick={this.props.areaButton}>
                        Adventure
                    </Button>
                </div>
                <div>
                </div>
            </div>
        );
    }
};
