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

export default class ShopWindow extends Component {

    render() {
        const name = constants.Areas[2].name
        const header = constants.Areas[2].header
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
                        Buy
                    </Button>
                    <Button raised color="primary" style={styles.button}>
                        Sell
                    </Button>
                    <Button raised color="primary" style={styles.button} onClick={this.props.exitButton}>
                        Leave
                    </Button>
                </div>
                <div>
                </div>
            </div>
        );
    }
};
