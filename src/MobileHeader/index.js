import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import Drawer from 'material-ui/Drawer';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import Select from 'material-ui/Select';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Hidden from 'material-ui/Hidden';
import Badge from 'material-ui/Badge';
import log from '../log.json';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import moneybagIcon from '../imgs/moneybag.svg'


const drawerWidth = 240;

const styles = theme => ({
    nameText: {
        paddingLeft: 5,
        paddingTop: 2
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    nameRoot: {
        marginBottom: 5,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    hpRoot: {
        margin: "0 4px 4px 4px",
        height: 24
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    }
});


class MobileHeader extends Component {

    state = {
        mobileOpen: false

    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleEquip = (item) => {
        item = parseInt(item);
        this.props.characterData.inventory.unshift(this.props.characterData.equipped[constants.Items[item].slot]);
        this.props.characterData.equipped[constants.Items[item].slot] = item;
        this.props.characterData.inventory.splice(this.props.characterData.inventory.indexOf(item), 1);
        log.Messages.push({ text: `You equip [${constants.Items[item].name}]` })
        this.props.updateCharacter(this.props.characterData);
        //constants.Items[item]
    }

    getItemList = () => {
        let temp = {};

        this.props.characterData.inventory.map((item, id) => {
            if (temp[item]) {
                temp[item] = temp[item] + 1
            }
            else {
                temp[item] = 1;
            }
        })

        return temp;

    }

    getArmorValue = () => {
        let armor = 0;
        for (let i = 1; i < 3; i++) {
            armor += constants.Items[this.props.characterData.equipped[i]].value;
        }
        return armor;
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                <Hidden mdUp>
            

                        <Grid container spacing={0} elevation={5}>
                            <Grid item xs={12}>
                                <Paper style={{ paddingBottom: 2 }} onClick={this.props.handleMobileToggle}>

                                    <Typography type="headline" gutterBottom className={classes.nameText}>
                                        {this.props.characterData.name}
                                        <span style={{ float: 'right',padding: '2px 4px 0 0' }}>
                                            <img src={moneybagIcon} alt="G" className="moneybagIcon" />

                                            {this.props.characterData.gold}
                                    </span>

                                    </Typography>

                                    <Typography type="headline" gutterBottom className={classes.nameText}>
                                    </Typography>

                                    <LinearProgress
                                        value={this.props.characterData.curHealth}
                                        color='accent'
                                        mode="determinate"
                                        classes={{ root: classes.hpRoot }}
                                    >
                                    </LinearProgress>
                                </Paper>
                            </Grid>
                        </Grid>

                </Hidden>
            </div>
        );
    }
};

MobileHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MobileHeader);
