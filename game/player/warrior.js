'use strict';

var skillFactory = require('../skills/skillFactory');
var BasePlayer = require('./baseplayer');

function Warrior(game, x, y, player_model) {
    BasePlayer.call(this, game, x, y, 'warrior', player_model);

    var model = this.model;
    model.name = 'Warrior';

    setSkills();
    this.restoreSkills();

    function setSkills(){
        var Sword = skillFactory.createSkill('Sword', game),
            Cobble = skillFactory.createSkill('Cobble', game);    

        model.autoSkill = model.activeSkill = Sword;
        model.skillSet = [ Cobble ];
    }
}

Warrior.prototype = Object.create(BasePlayer.prototype);
Warrior.prototype.constructor = Warrior;

module.exports = Warrior;