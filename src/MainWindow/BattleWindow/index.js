import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
const styles = {
    "button": {
        "margin": 10
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BattleWindow extends Component {
    

    getArmorValue = () => {
        let armor = 0;
        for (let i = 1; i < 3; i++) {
            armor += constants.Items[this.props.characterData.equipped[i]].value;
        }
        return armor;
    }

    getDamageValue = () => {

        return constants.Items[this.props.characterData.equipped[0]].value;
    }

    getBattleResults = (e) => {

        const log = [];
        let player = this.props.characterData;
        const attack = this.getDamageValue();
        const armor = this.getArmorValue();
        let enemy = e;
        let blocks = 0;
        while (player.curHealth > 0 && enemy.health > 0) {
            //player always attacks first for now
            let damage = 0;
            if (Math.random() * 100 < 95 - enemy.defense) {
                //crit
                const crit = Math.random() <= .10;
                const multi = (crit) ? 2 : 1;
                const hit = (crit) ? "CRITS" : "hits";
                damage = Math.max(0, attack * multi - enemy.defense)
                if (damage > 0) {
                    enemy.health = enemy.health - damage
                    log.push(`${player.name} ${hit} ${enemy.name} with ${constants.Items[player.equipped[0]].name} for ${damage} damage!!`)
                }
                else {
                    log.push(`${enemy.name} blocks your attack!`)
                    blocks++;
                 }
            }
            else
                log.push(`${player.name} misses their attack!`)
            
            if (Math.random() * 100 < 95 - armor) {
                damage = Math.max(0, enemy.attack - armor)
                if (damage > 0) {
                    player.curHealth = player.curHealth - damage
                    log.push(`${enemy.name} hits ${player.name} for ${damage} damage.`)
                }
                else {
                    log.push(`You block the ${enemy.name}'s attack!`)
                    blocks++;
                }
            } else
                log.push(`${enemy.name} misses their attack!`)
            
            // if(blocks > 10)
            // break;
        }
        if(player.curHealth > 0) {
            log.push(`${player.name} has deafeated ${enemy.name}!!`)
            player.gold = player.gold + enemy.loot.gold;
            log.push(`You loot ${enemy.loot.gold} gold coins.`) 
        } else {
            log.push(`${enemy.name} has slain ${player.name}!!`)
        }
        
            
        return (
            <div>
                {log.map((entry,id) => <Paper key={id}>  
                    <Typography type="body1">
                        {entry}
                    </Typography>
                    </Paper>)}
            </div>
        )
    }

    getEnemy = () => {
        let enemies = [];
        switch (this.props.difficulty) {
            case 0:
                constants.Enemies.map((enemy) => { if (enemy.level <= 5) enemies.push(enemy); return enemy})
                break;
            case 1:
                constants.Enemies.map((enemy) => { if (enemy.level > 5 && enemy.level <= 10) enemies.push(enemy); return enemy})
                break;
            case 2:
                constants.Enemies.map((enemy) => { if (enemy.level > 15) enemies.push(enemy); return enemy})
                break;
        }
        return enemies[getRandomInt(0, enemies.length - 1)]
    }

    render() {
        const dif = parseInt(this.props.difficulty);
        const name = constants.Areas[4 + dif].name;
        const header = constants.Areas[4 + dif].header;
        const enemy = this.getEnemy();
        const battleLog = this.getBattleResults(enemy);
        return (
            <div style={{ textAlign: 'center', margin: '20px 0 0 260px' }}>
                <Typography type="display2">
                    {name}
                </Typography>
                <Typography type="title" gutterBottom>
                    {header}
                </Typography>
                <Divider />

                {battleLog}
                <Button raised color="primary" style={styles.button} onClick={this.props.exitButton}>
                    Keep Adventuring
                </Button>
                <Button raised color="primary" style={styles.button} onClick={this.props.exitButton}>
                    Go Back
                </Button>
            </div>
        );
    }
};
