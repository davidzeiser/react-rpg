import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';

import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';


import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Badge from 'material-ui/Badge';
import log from '../log.json';
import Grid from 'material-ui/Grid';

import moneybagIcon from '../imgs/moneybag.svg'

const drawerWidth = 240;

const styles = theme => ({
    nameText: {
        paddingLeft: 5
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


class CharacterDrawer extends Component {

    handleEquip = (item) => {
        item = parseInt(item, 10);
        console.log(item);
        if(this.props.characterData.equipped[constants.Items[item].slot] != 0)
            this.props.characterData.inventory.unshift(this.props.characterData.equipped[constants.Items[item].slot]);
        
        this.props.characterData.equipped[constants.Items[item].slot] = item;

        this.props.characterData.inventory.splice(this.props.characterData.inventory.indexOf(item), 1);
        log.Messages.push({ text: `You equip <b>${constants.Items[item].name}` })
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
                    <Grid item xs={12} className={classes.nameRoot}>
                        <Paper style={{ paddingBottom: 2 }}>
                            <Typography type="headline" gutterBottom className={classes.nameText}>

                                {this.props.characterData.name}
                                <span style={{ float: 'right' }}>

                                    <img src={moneybagIcon} alt="G" className="moneybagIcon" />

                                    {this.props.characterData.gold}
                                </span>
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

                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Weapon
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">


                                {`${constants.Items[this.props.characterData.equipped[0]].name}`}

                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Typography type="title" gutterBottom className="itemValue" style={{ "lineHeight": "40px" }}>
                                {`${constants.Items[this.props.characterData.equipped[0]].value.join("-")}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Armor
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">
                                {`${constants.Items[this.props.characterData.equipped[1]].name}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Typography type="title" gutterBottom className="itemValue" style={{ "lineHeight": "40px" }}>
                                {`${constants.Items[this.props.characterData.equipped[1]].value}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Typography type="caption" className="itemCaption">
                                Head
                            </Typography>
                            <Typography type="title" gutterBottom className="itemName">
                                {`${constants.Items[this.props.characterData.equipped[2]].name}`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
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
                            Object.keys(itemList).map((item, id) =>
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
                        open={this.props.mobileIsOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onRequestClose={this.props.handleMobileToggle}
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
