import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import Select from 'material-ui/Select';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import constants from '../constants.json';
import Divider from 'material-ui/Divider';



const drawerWidth = 240;

const style = {
    paper:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '10px',
    width:drawerWidth,
    margin: '8px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  drawer:{
      width:drawerWidth
  },
  healthbar:{
     
    width:drawerWidth,
    height:20
  }
};
  

class CharacterDrawer extends Component {   

    getArmorValue = () => {
        let armor = 0;
        for (let i = 1; i < 3; i++) {
            armor += constants.Items[this.props.characterData.equipped[i]].value;
        }
        return armor;
    }

    render() {

        
        return (
            <div>
                {/* gold count, working hp bar, potions */}
                <Drawer
                    style={style.drawer}
                    anchor="left"
                    open={true}
                    type='permanent'
                >
                    <Paper style={style.paper}>  
                    <Typography type="headline" gutterBottom>
                        {this.props.characterData.name}
                    </Typography>
                    
                    

                    <LinearProgress 
                        style={style.healthbar}
                        value={this.props.characterData.curHealth}
                        color='accent'
                        mode="determinate"
                    >

                    </LinearProgress>
                    <Typography type="caption">
                        {`Gold: ${this.props.characterData.gold}    Exp: ${this.props.characterData.exp}    Armor: ${this.getArmorValue()}`}
                    </Typography>
                    </Paper>
                    <Divider />
                    <Paper style={style.paper}>
                    <Typography type="caption">
                        Weapon
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {`${constants.Items[this.props.characterData.equipped[0]].name}   +${constants.Items[this.props.characterData.equipped[0]].value}`}
                    </Typography>
                    <Typography type="caption">
                        Armor
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {`${constants.Items[this.props.characterData.equipped[1]].name}   +${constants.Items[this.props.characterData.equipped[1]].value}`}
                    </Typography>
                    <Typography type="caption">
                        Head
                    </Typography>
                    <Typography type="title" gutterBottom>
                        {`${constants.Items[this.props.characterData.equipped[2]].name}   +${constants.Items[this.props.characterData.equipped[2]].value}`}
                    </Typography>
                    </Paper>
                    

                </Drawer>


            </div>
        );
    }
};

export default CharacterDrawer;
