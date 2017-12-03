import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
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
        if (log.Messages.length > 200)
            log.Messages.splice(0, log.Messages.length - 200)

        
        return (
            <Paper id="log" className="messageLog">
                {log.Messages.map((entry, id) =>
                    (entry.text !== '') ?
                        <Paper key={id}>
                            {(entry.text.indexOf('<b>') === -1) ?
                            <Typography type="body1">
                                {entry.text}
                            </Typography> :
                            <Typography type="body1">
                                {entry.text.substring(0,entry.text.indexOf('<b>'))}
                                <span style={{fontWeight:800}}>
                                    {entry.text.substring(entry.text.indexOf('<b>') +  3)}
                                        </span>
                            </Typography>
                            }
                            
                        </Paper>
                        :
                        <Divider key={id} />
                )
                }
            </Paper>

        );
    }
};
