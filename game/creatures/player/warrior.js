'use strict';

var skillFactory = require('skillFactory');
var BasePlayer = require('./baseplayer');

  

function Warrior(game, x, y) {
    BasePlayer.call(this, game, x, y, 'warrior');

    this.state.name = 'Warrior';

    var Sword = skillFactory.createSkill('Sword', game),
        Cobble = skillFactory.createSkill('Cobble', game);
  
    this.skill = this.defaultSkill = Sword;
    this.skillSet = [ Cobble ];
}

Warrior.prototype = Object.create(BasePlayer.prototype);
Warrior.prototype.constructor = Warrior;

module.exports = Warrior;