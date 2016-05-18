'use strict';

var speed = 100;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Vampire(game, point, player) {
    BaseMonster.call(this, game, point, player, 'vampire');
    this.scale.setTo(0.023, 0.023);

    this.skill = skillFactory.createSkill('LifeSucking', game);

    this.health = this.maxHealth = 10;
}

Vampire.prototype = Object.create(BaseMonster.prototype);
Vampire.prototype.constructor = Vampire;
Vampire.prototype.Name = "Vampire";

Vampire.prototype.update = function () {
    if (!this.alive) return;

    if (this.skill.ready()) {
        var skill = this.skill(this.game, this, this.player);
        this.events.onCastSkill.dispatch(skill);
    }

    console.log(this.health);

    if (this.physics.distanceToXY(this.player, this.x, this.y) > 50)
        this.physics.moveToObject(this, this.player, 100);
    else {
        this.body.velocity.setTo(0, 0);
    }
};

module.exports = Vampire;