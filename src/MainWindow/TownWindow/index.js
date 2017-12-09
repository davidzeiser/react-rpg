import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import log from '../../log.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

export default class TownWindow extends Component {

    componentWillMount() {
        if (this.props.lastArea !== 2 && this.props.lastArea !== 1) {
            log.Messages.push({ text: `You enter the town of Atrec` })
            this.props.characterData.day++;
        }
    }

    render() {

        const name = constants.Areas[0].name
        const header = constants.Areas[0].header
        return (

            <div>
                <div className="area">
                    <Typography type="display2">
                        {`${name}`} 
                        <span className="daySpan">   Day {`${this.props.characterData.day}`}</span>
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {header}
                    </Typography>
                    <Divider />
                    {this.props.messageLog}
                    <Grid container spacing={0} elevation={5} className="buttonGrid">
                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.props.shopButton}>
                                Market
                        </Button>
                        </Grid>

                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.props.innButton}>
                                Inn
                        </Button>
                        </Grid>

                        <Grid item xs={4} >
                            <Button raised color="primary" onClick={this.props.areaButton}>
                                Adventure
                        </Button>
                        </Grid>
                    </Grid>


                </div>
                <div>
                </div>
            </div>
        );
    }
};
