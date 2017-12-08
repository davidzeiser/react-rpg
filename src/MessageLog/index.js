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

    GetMessageLog = () => {
        let offset = 0;
        let anim = false;
        return log.Messages.map((entry, id) => {
            if (!entry.logged) { entry.logged = true; anim = true; offset += 0.15 }

            return (entry.text !== '') ?
                <Paper key={id} className={(anim) ? "messageItem" : ""} style={{ animationDelay: `${offset}s` }}>
                    {(entry.text.indexOf('<b>') === -1) ?
                        <Typography type="body2">
                            {entry.text}
                        </Typography> :
                        <Typography type="body2">
                            {entry.text.substring(0, entry.text.indexOf('<b>'))}
                            <span style={{ fontWeight: 800 }}>
                                {entry.text.substring(entry.text.indexOf('<b>') + 3)}
                            </span>
                        </Typography>
                    }

                </Paper>
                :
                <Divider className={(anim) ? "messageItem" : ""} key={id} style={{ animationDelay: `${offset}s` }} />
        })
        

}

render() {
    if (log.Messages.length > 200)
        log.Messages.splice(0, log.Messages.length - 200)    

    return (
        <Paper id="log" className="messageLog">
        {this.GetMessageLog()}
        </Paper>

    );
}
};
