'use strict';

var speed = 100;

var skillFactory = require('../../skills/skillFactory');
var BaseMonster = require('./baseMonster');

function Stump(game, point, player) {
    BaseMonster.call(this, game, point, player, 'stump');
    this.scale.setTo(0.3, 0.3);

    this.health = this.maxHealth = 2;
    this.skill = skillFactory.createSkill('Bolt', game);

    this.state = {};
}

Stump.prototype = Object.create(BaseMonster.prototype);
Stump.prototype.constructor = Stump;
Stump.prototype.Name = "Stump";

Stump.prototype.update = function() {
    if(!this.alive) return;

    var stumpIsFar = this.physics.distanceToXY(this.player, this.x, this.y) > 60;    

    if(stumpIsFar)
        this.physics.moveToObject(this, this.player, speed);
    else
        this.body.velocity.setTo(0, 0);
};

module.exports = Stump;