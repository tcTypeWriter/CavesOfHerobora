'use strict';

var skillFactory = require('../skills/skillFactory');
var BasePlayer = require('./baseplayer');

function Wizard(game, x, y, frame) {
    BasePlayer.call(this, game, x, y, 'wizard');
    this.name = 'Wizard';
    this.autoSkill = this.activeSkill = skillFactory.createSkill('Fireball', game);
    this.skillSet = [ 
                      skillFactory.createSkill('Bolt', game),
                      skillFactory.createSkill('Cobble', game)
                     ];
}

Wizard.prototype = Object.create(BasePlayer.prototype);
Wizard.prototype.constructor = Wizard;

module.exports = Wizard;