'use strict';

var skillFactory = require('../skills/skillFactory');
var BasePlayer = require('./baseplayer');

function Wizard(game, x, y, player_model) {
    BasePlayer.call(this, game, x, y, 'wizard', player_model);
    
    var model = this.model;
    model.name = 'Wizard';
    
    setSkills();
    this.restoreSkills();

    function setSkills(){
        var Fireball = skillFactory.createSkill('Fireball', game),
            Bolt = skillFactory.createSkill('Bolt', game),
            Cobble = skillFactory.createSkill('Cobble', game);

        model.autoSkill = model.activeSkill = Fireball;
        model.skillSet = [ Bolt, Cobble ];
    }
}

Wizard.prototype = Object.create(BasePlayer.prototype);
Wizard.prototype.constructor = Wizard;

module.exports = Wizard;