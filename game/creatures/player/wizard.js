'use strict';

var skillFactory = require('../../skills/skillFactory');
var BasePlayer = require('./baseplayer');

function Wizard(game, x, y) {
    BasePlayer.call(this, game, x, y, 'wizard');
    
    this.state.name = 'Wizard';

    var Fireball = skillFactory.createSkill('Fireball', game),
        Bolt = skillFactory.createSkill('Bolt', game),
        Cobble = skillFactory.createSkill('Cobble', game);
  
    this.skill = this.defaultSkill = Fireball;
    this.skillSet = [ Bolt, Cobble ];
}

Wizard.prototype = Object.create(BasePlayer.prototype);
Wizard.prototype.constructor = Wizard;

module.exports = Wizard;