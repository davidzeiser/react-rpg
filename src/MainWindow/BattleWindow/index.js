import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import constants from '../../constants.json';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import log from '../../log.json';

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BattleWindow extends Component {
    state = {
        battlesWon: 0
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
        this.battleLog = this.getBattleResults(this.getEnemy());
        this.setState({ battlesWon: this.state.battlesWon + 1 })
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
        log.push(`You encounter a ${enemy.name}.`)

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
                    log.push(`You ${(crit) ? "CRIT" : "hit"} ${enemy.name} with ${constants.Items[player.equipped[0]].name} for ${damage} damage${(crit) ? "!" : "."}`)
                }
                else {
                    log.push(`${enemy.name} blocks your attack!`)
                    blocks++;
                }
            }
            else
                log.push(`You miss your attack!`)

            if(enHP <= 0)
                break;
            if (Math.random() * 100 < 95 - armor) {
                damage = Math.max(0, getRandomInt(enemy.attack[0], enemy.attack[1]) - armor)
                if (damage > 0) {
                    plHP = plHP - damage
                    log.push(`${enemy.name} hits you for ${damage} damage.`)
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
            log.push(`${player.name} has defeated ${enemy.name}!!`)
            player.gold += gold;

            log.push(`You loot ${gold} gold coins.`)

            enemy.loot.items.map(item => {
                if ((Math.random() * 100) <= item.droprate) {

                    player.inventory.push(item.id);
                    log.push(`You found a ${constants.Items[item.id].name}`)
                } item;
            })



        } else {
            log.push(`${enemy.name} has slain ${player.name}!!`)
        }
        player.curHealth = Math.max(0, plHP);

        return log;

    }


    getEnemy = () => {
        let enemies = [];
        switch (this.props.difficulty) {
            case 0:
                constants.Enemies.map((enemy) => { if (enemy.level <= 5) enemies.push(enemy); return enemy })
                break;
            case 1:
                constants.Enemies.map((enemy) => { if (enemy.level > 5 && enemy.level <= 10) enemies.push(enemy); return enemy })
                break;
            case 2:
                constants.Enemies.map((enemy) => { if (enemy.level > 15) enemies.push(enemy); return enemy })
                break;
        }
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
                <div className="buttonBar">
                    <Button raised color="primary" onClick={this.keepGoing}>
                        Keep Adventuring
                    </Button>
                    <Button raised color="primary" onClick={this.leave}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }
};
