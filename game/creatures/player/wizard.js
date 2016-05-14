'use strict';

var skillFactory = require('skillFactory');
var BasePlayer = require('./baseplayer');

function Wizard(game, x, y) {
    BasePlayer.call(this, game, x, y, 'wizard');
    
    this.state.name = 'Wizard';

    var Fireball = skillFactory.createSkill('Fireball', game),
        Bolt = skillFactory.createSkill('Bolt', game),
        Fireworks = skillFactory.createSkill('Fireworks', game);
  
    this.skill = Fireball;
    this.skillSet = [ Fireball, Bolt, Fireworks ];
}

Wizard.prototype = Object.create(BasePlayer.prototype);
Wizard.prototype.constructor = Wizard;

module.exports = Wizard;