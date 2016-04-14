'use strict';

var skillFactory = require('../skills/skillFactory');
var BasePlayer = require('./baseplayer');

function Warrior(game, x, y, frame) {
    BasePlayer.call(this, game, x, y, 'warrior');

    this.autoSkill = this.activeSkill = skillFactory.createSkill('Sword', game);
    this.skillSet = [ skillFactory.createSkill('Cobble', game) ];
}

Warrior.prototype = Object.create(BasePlayer.prototype);
Warrior.prototype.constructor = Warrior;

module.exports = Warrior;