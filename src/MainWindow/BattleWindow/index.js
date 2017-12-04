import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import log from '../../log.json';

import Grid from 'material-ui/Grid';


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BattleWindow extends Component {


    state = {
        battlesWon: 1
    }

    getArmorValue = () => {
        let armor = 0;
        for (let i = 1; i < 3; i++) {
            armor += constants.Items[this.props.characterData.equipped[i]].value;
        }
        return armor;
    }

    getDamageValue = () =>
        constants.Items[this.props.characterData.equipped[0]].value;


    keepGoing = () => {
        console.log( this.state.battlesWon);
        this.battleLog = this.getBattleResults(this.getEnemy());        
        log.Messages.push({ text: 'You continue to explore the area.' })
        this.addBattleToMessageLog(this.battleLog);
        this.props.updateCharacter(this.props.characterData)
    }

    addBattleToMessageLog = () => {
        log.Messages.push({ text: '' })
        this.battleLog.map(entry => log.Messages.push({ text: entry }));
    }

    componentWillMount() {
        log.Messages.push({ text: constants.Areas[4 + this.props.difficulty].enter })
        this.battleLog = this.getBattleResults(this.getEnemy());
        this.addBattleToMessageLog(this.battleLog);
        this.props.updateCharacter(this.props.characterData)
    }
    

    leave = () => {
        log.Messages.push({ text: constants.Areas[4 + this.props.difficulty].exit })
        log.Messages.push({ text: '' }) //divider
        this.props.exitButton()
    }

    getBattleResults = (enemy) => {
        const log = [];
        let player = this.props.characterData;
        const attack = this.getDamageValue();
        const armor = this.getArmorValue();
        let plHP = player.curHealth;
        let enHP = enemy.health;
        let blocks = 0;
        log.push(`You encounter a <b>${enemy.name}`)

        while (plHP > 0 && enHP > 0) {
            //player always attacks first for now
            let damage = 0;
            if (Math.random() * 100 < 95 - enemy.defense) {
                //crit
                const crit = Math.random() <= .10;
                let baseDamage = getRandomInt(attack[0], attack[1]);
                if (crit)
                    baseDamage *= 2;
                damage = Math.max(0, baseDamage - enemy.defense)
                if (damage > 0) {
                    enHP = enHP - damage
                    log.push(`You ${(crit) ? "CRIT" : "hit"} ${enemy.name} with ${constants.Items[player.equipped[0]].name} for ${damage} damage${(crit) ? "!" : ""}`)
                }
                else {
                    log.push(`${enemy.name} blocks your attack!`)
                    blocks++;
                }
            }
            else
                log.push(`You miss your attack!`)

            if (enHP <= 0)
                break;
            if (Math.random() * 100 < 95 - armor) {
                damage = Math.max(0, getRandomInt(enemy.attack[0], enemy.attack[1]) - armor)
                if (damage > 0) {
                    plHP = plHP - damage
                    log.push(`${enemy.name} hits you for ${damage} damage`)
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
        if (plHP > 0) {
            const gold = getRandomInt(enemy.loot.gold[0], enemy.loot.gold[1])
            this.setState({ battlesWon: this.state.battlesWon + 1 })
            log.push(`${player.name} has defeated ${enemy.name}!!`)
            player.gold += gold;

            log.push(`You loot <b>${gold} gold`)
            console.log(constants.Items);

            const droprates = [20, 5, 1]

            for (let i = 0; i < 3; i++) {
                if (enemy.loot.items[i].length > 0) {

                    let droppedItems = enemy.loot.items[i];
                    if ((Math.random() * 100) <= droprates[i]) {
                        const x = getRandomInt(0, droppedItems.length - 1);
                        player.inventory.push(droppedItems[x])
                        log.push(`You found a <b>${constants.Items[droppedItems[x]].name}`)
                    }

                    // droppedItems.forEach(function (item) {
                    //     if ((Math.random() * 100) <= droprates[i]) {
                    //         player.inventory.push(item);
                    //         log.push(`You found a ${constants.Items[item].name}`)
                    //     };
                    // })    
                }
            }


            // 0   {name: "None", price: 0, value: 0, slot: 0}
            // 1   {name: "Wooden Stick", price: 50, value: Array(2), slot: 0}
            // 2   {name: "Leather Tunic", price: 50, value: 1, slot: 1}
            // 3   {name: "Leather Cap", price: 50, value: 1, slot: 2}
            // 4   {name: "Stone Sword", price: 100, value: Array(2), slot: 0}
            // 5   {name: "Stone Axe", price: 100, value: Array(2), slot: 0}
            // 6   {name: "Copper Dagger", price: 200, value: Array(2), slot: 0}
            // 7   {name: "Copper Cleaver", price: 200, value: Array(2), slot: 0}
            // 8   {name: "Iron Sword", price: 350, value: Array(2), slot: 0}
            // 9   {name: "Iron Axe", price: 350, value: Array(2), slot: 0}
            // 10  {name: "Steel Mace", price: 550, value: Array(2), slot: 0}
            // 11  {name: "Steel Sword", price: 550, value: Array(2), slot: 0}
            // 12  {name: "Steel Axe", price: 500, value: Array(2), slot: 0}
            // 13  {name: "Gold Flail", price: 850, value: Array(2), slot: 0}
            // 14  {name: "Gold Broadsword", price: 850, value: Array(2), slot: 0}
            // 15  {name: "Gold Poleaxe", price: 850, value: Array(2), slot: 0}




        } else {
            log.push(`<b>${enemy.name} has slain ${player.name}!!`)
        }
        player.curHealth = Math.max(0, plHP);

        return log;

    }


    getEnemy = () => {
        let enemies = []
        constants.Enemies[this.props.difficulty].forEach((enemy,id) => {
            const normalize = (enemy.level - 1) - this.props.difficulty * 5; 
            if(Math.random() * 100 <= (100 - (normalize * (15 - this.state.battlesWon/(normalize+1)))))
                enemies.push(enemy);
        });
        console.log(enemies);
        return enemies[getRandomInt(0, enemies.length - 1)]
    }


    render() {
        const dif = this.props.difficulty;
        const name = constants.Areas[4 + dif].name;
        const header = constants.Areas[4 + dif].header;
        return (
            <div className="area">
                <Typography type="display2">
                    {name}
                </Typography>
                <Typography type="title" gutterBottom>
                    {header}
                </Typography>
                <Divider />

                {this.props.messageLog}
                <Grid container spacing={0} elevation={5} className="buttonGrid">
                    <Grid item xs={6} >

                        <Button raised color="primary" onClick={this.keepGoing}>
                            Keep Adventuring
                    </Button>
                    </Grid>
                    <Grid item xs={6} >

                        <Button raised color="primary" onClick={this.leave}>
                            Go Back
                    </Button>
                    </Grid>

                </Grid>


            </div>
        );
    }
};
