import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

const styles = {
    "button": {
        "margin": 10
    }
}

export default class AdventureWindow extends Component {

    render() {
        const name = constants.Areas[3].name
        const header = constants.Areas[3].header
        return (

            <div>
                <div style={{ textAlign: 'center', margin: '20px 0 0 260px' }}>
                    <Typography type="display2">
                        {name}
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {header}
                    </Typography>
                    <Divider />
                    <Button raised color="primary" style={styles.button}>
                        Forest (easy)
                    </Button>
                    <Button raised color="primary" style={styles.button}>
                        Mountains (hard)
                    </Button>
                    <Button raised color="primary" style={styles.button}>
                        Castle (boss)
                    </Button>                    
                </div>
                <div>
                </div>
            </div>
        );
    }
};
