import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MessageLog from '../../MessageLog'
import log from '../../log.json';

import Grid from 'material-ui/Grid';


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
                <Grid container spacing={0} elevation={5} className="buttonGrid">
                    <Grid item xs={4} >

                        <Button raised color="primary" onClick={this.props.easyButton}>
                            Forest (easy)
                            </Button>
                    </Grid>

                    <Grid item xs={4} >

                        <Button raised color="primary" onClick={this.props.medButton} disabled>
                            Mountains (hard)
                            </Button>
                    </Grid>

                    <Grid item xs={4} >
                        <Button raised color="primary" onClick={this.props.hardButton} disabled>
                            Castle (boss)
                            </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
};
