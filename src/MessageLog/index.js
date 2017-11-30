import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import log from '../log.json'

export default class MessageLog extends Component {
    componentDidMount() {
        const out = document.getElementById("log")
        if (out !== null) {            
                out.scrollTop = out.scrollHeight - out.clientHeight;
        }
    }

    componentDidUpdate() {
        const out = document.getElementById("log")
        if (out !== null) {            
                out.scrollTop = out.scrollHeight - out.clientHeight;
        }
    }

    render() {        
        return (


            <Paper id="log" className="messageLog">
                {log.Messages.map((entry, id) =>
                    (entry.text !== '') ? 
                    <Paper key={id}>
                        <Typography type="body1">
                            {entry.text}
                        </Typography>
                    </Paper>
                    :
                    <Divider key={id}/>
                )
                }
            </Paper>

        );
    }
};
