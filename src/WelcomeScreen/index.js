import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import './welcome.css'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });

const character = {
    name: '',    
    equipped: [0,0,0],
    health: 100,
    maxHealth: 100,
    gold: 50
}

class WelcomeScreen extends Component {
  state = {
      name: ''      
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {

    character.name  = this.state.name;
    this.props.startGame(character);
  }
  

  render() {
    const { classes } = this.props;
    return (
        <div className="welcome">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"          
        />        
        <Button onClick={this.handleSubmit} color="primary">Submit</Button>
        </div>
    );
  }
}

WelcomeScreen.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(WelcomeScreen);