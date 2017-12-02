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

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});


class CharacterDrawer extends Component {

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
        this.props.characterData.inventory.splice(this.props.characterData.inventory.indexOf(item),1);
        log.Messages.push({text:`You equip [${constants.Items[item].name}]`})
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
        const itemList = this.getItemList();
        const drawer = (
            <div>
                <Grid container spacing={0} elevation={5}>
                    <Grid item xs={12}>
                        <Paper>

                            <Typography type="headline" gutterBottom>
                                {this.props.characterData.name}
                            </Typography>
                        </Paper>
                        <Paper>

                            <LinearProgress
                                value={this.props.characterData.curHealth}
                                color='accent'
                                mode="determinate"
                                style={{ height: "24px" }}
                            >
                            </LinearProgress>
                            <Typography type="caption">
                                {`Gold: ${this.props.characterData.gold}    Exp: ${this.props.characterData.exp}    Armor: ${this.getArmorValue()}`}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item sm={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Weapon
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">


                                {`${constants.Items[this.props.characterData.equipped[0]].name}`}

                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper className={classes.paper}>
                            <Typography type="title" gutterBottom className="itemValue" style={{ "lineHeight": "40px" }}>
                                {`${constants.Items[this.props.characterData.equipped[0]].value.join("-")}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Armor
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">
                                {`${constants.Items[this.props.characterData.equipped[1]].name}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper className={classes.paper}>
                            <Typography type="title" gutterBottom className="itemValue" style={{ "lineHeight": "40px" }}>
                                {`${constants.Items[this.props.characterData.equipped[1]].value}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Head
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">
                                {`${constants.Items[this.props.characterData.equipped[2]].name}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper className={classes.paper}>
                            <Typography type="title" gutterBottom className="itemValue" style={{ "lineHeight": "40px" }}>
                                {`${constants.Items[this.props.characterData.equipped[2]].value}`}
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>




                <Divider />

                <Paper>
                    <List>
                        {
                            Object.keys(itemList).map((item,id) =>
                                <Badge badgeContent={itemList[item]} color="primary" key={id} classes={{ root: "inventoryItem" }}>
                                    <ListItem button onClick={() => this.handleEquip(item)} style={{ width: "100%" }}>

                                        <Typography type="title">
                                            {constants.Items[item].name}
                                        </Typography>

                                    </ListItem>
                                </Badge>
                            )


                        }
                    </List>
                </Paper>
            </div>);

        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        type="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onRequestClose={this.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        type="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>






            </div>
        );
    }
};

CharacterDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CharacterDrawer);
