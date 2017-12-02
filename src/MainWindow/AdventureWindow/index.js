import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

export default class AdventureWindow extends Component {

    componentWillMount() {
        log.Messages.push({ text: constants.Areas[3].enter })
    }


    render() {
        const name = constants.Areas[3].name
        const header = constants.Areas[3].header
        return (

            <div className="area">
                <Typography type="display2">
                    {name}
                </Typography>
                <Typography type="title" gutterBottom>
                    {header}
                </Typography>
                <Divider />
                {this.props.messageLog}
                <div className="buttonBar">
                    <Button raised color="primary" onClick={this.props.easyButton}>
                        Forest (easy)
                    </Button>
                    <Button raised color="primary" onClick={this.props.medButton} disabled>
                        Mountains (hard)
                    </Button>
                    <Button raised color="primary" onClick={this.props.hardButton} disabled>
                        Castle (boss)
                    </Button>
                </div>
            </div>
        );
    }
};
