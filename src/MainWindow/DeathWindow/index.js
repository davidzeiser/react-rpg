import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

export default class ShopWindow extends Component {

    componentWillMount() {
        log.Messages.push({ text: constants.Areas[7].enter })
    }



    render() {
        const name = constants.Areas[7].name
        const header = constants.Areas[7].header
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
                    <div className="buttonBar">
                        <Button raised color="primary" onClick={this.props.restartGame}>
                            Restart
                    </Button>
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }
};
