import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import log from '../log.json'

const MessageItem = (props) => {
    const anim = props.anim;
    const text = props.text;
    const offset = props.offset;
    return (
        (text !== '') ?
            <Paper className={(anim) ? "messageItem" : ""} style={{ animationDelay: `${offset}s` }}>
                {(text.indexOf('<b>') === -1) ?
                    <Typography type="body2">
                        {text}
                    </Typography> :
                    <Typography type="body2">
                        {text.substring(0, text.indexOf('<b>'))}
                        <span style={{ fontWeight: 800 }}>
                            {text.substring(text.indexOf('<b>') + 3)}
                        </span>
                    </Typography>
                }

            </Paper> :
            <Divider className={(anim) ? "messageItem" : ""} style={{ animationDelay: `${offset}s` }} />)
}

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
            if (!entry.logged) {
                entry.logged = true;
                anim = true;
                offset += 0.15
            }
            if (entry.type === undefined)
                entry.type = "message";

            switch (entry.type) {
                case "message":
                    return (<MessageItem key={id} text={entry.text} anim={anim} offset={offset} />)
                    break;
                case "battle":
                    return (<div key={id + 200} style={{position:"relative"}}>
                        {entry.text.map((item, id) =>
                        {if(anim)offset += .15;
                        return <MessageItem key={id + 300} text={item} anim={anim} offset={offset} />}
                            
                        )}
                        <img className={"monsterIMG" + (anim ? " fadein" : "")} src={`/imgs/monsters/${entry.monster.replace(" ","_").toLowerCase()}.png`} />
                    </div>)
                    break;
                default:
                    break;
            }
        })
    }

    render() {
        if (log.Messages.length > 20)
            log.Messages.splice(0, log.Messages.length - 20)

        return (
            <Paper id="log" className="messageLog" elevation={0}>
                {this.GetMessageLog()}
            </Paper>

        );
    }
};
