import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';

export default class MainWindow extends Component {


    render() {
        const name = constants.Areas[this.props.gameState].name
        const header = constants.Areas[this.props.gameState].header
        return (
            // other windows
            <div>
                <div style={{ textAlign: 'center', margin: '20px 0 0 260px' }}>
                    <Typography type="display2">
                        {name}
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {header}
                    </Typography>
                    <Divider />
                </div>
                <div>
                </div>
            </div>
        );
    }
};
