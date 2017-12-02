import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

import Grid from 'material-ui/Grid';


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
                    <Grid container spacing={0} elevation={5} className="buttonGrid">
                        <Grid item xs={12} >

                        <Button raised color="primary" onClick={this.props.restartGame}>
                            Restart
                    </Button>
                    </Grid>
                    </Grid>

                       
                </div>
            </div>
        );
    }
};
