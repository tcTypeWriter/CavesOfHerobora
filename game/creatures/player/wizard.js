'use strict';

var skillFactory = require('skillFactory');
var BasePlayer = require('./baseplayer');

function Wizard(game, x, y) {
    BasePlayer.call(this, game, x, y, 'wizard');
    
    this.state.name = 'Wizard';

    var Fireball = skillFactory.createSkill('Fireball', game);
  
    this.skill = Fireball;
    this.skillSet = [ Fireball ];
}

Wizard.prototype = Object.create(BasePlayer.prototype);
Wizard.prototype.constructor = Wizard;

module.exports = Wizard;