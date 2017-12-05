import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import constants from '../../../constants.json';
import Badge from 'material-ui/Badge';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';


const styles = {
    button: {
        height: 48,
        textAlign: "left"

    },
    badge: {
        width: "100%",
        marginTop: 12
    }
}

class ShopDialog extends React.Component {



    render() {
        const { fullScreen } = this.props;

        return (

            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                onRequestClose={this.props.handleRequestClose}
                
            >
                <DialogTitle>Click to buy an item<span style={{ float: "right" }}>{this.props.characterData.gold + "G"}</span></DialogTitle>
                <DialogContent>
                    <Grid container spacing={0} elevation={5} className="buttonGrid">

                        {constants.Items.map((item, id) =>
                            (id > 4)
                                ? (<Grid item xs={12} key={id}>

                                    <Button
                                        color="primary"
                                        onClick={() => this.props.buyItem(id)}
                                        style={styles.button}
                                        disabled={this.props.characterData.gold < item.price}
                                    >
                                        <Grid item xs={6} >
                                            {item.name}
                                        </Grid>
                                        <Grid item xs={3} >
                                            {(item.slot === 0) ? item.value.join("-") : item.value}
                                        </Grid>
                                        <Grid item xs={3} style={{ textAlign: 'right' }}>
                                            {item.price + "g"}
                                        </Grid>
                                    </Button>

                                </Grid>) : null
                        )}

                    </Grid>

                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleSellItem} color="primary" autoFocus disabled={this.props.characterData.inventory.length < 1}>
                        Sell Items
            </Button>
                    <Button onClick={this.props.handleRequestClose} color="primary" autoFocus>
                        Leave
            </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

ShopDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ShopDialog);