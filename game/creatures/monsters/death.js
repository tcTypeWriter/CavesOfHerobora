'use strict';

var attack_distance = 30;

var BaseMonster = require('./baseMonster');
var skillFactory = require('skillFactory');

function Death(game, point, player) {
    BaseMonster.call(this, game, point, player, 'death');
    this.scale.setTo(0.4, 0.4);

    this.skill = skillFactory.createSkill('Deathball', game);

    this.state = {
        base: point
    };

    this.health = this.maxHealth = 50;
}

Death.prototype = Object.create(BaseMonster.prototype);
Death.prototype.constructor = BaseMonster;
Death.prototype.Name = "Death";

Death.prototype.update = function () {
    if (!this.alive) return;

    if (this.physics.distanceToXY(this.player, this.x, this.y) < 100) {
        this.player.damage(1);
    }

    if (this.physics.distanceToXY(this.player, this.x, this.y) > 250)
        this.physics.moveToObject(this, this.player, 100);
    else {
        this.body.velocity.setTo(0, 0);
    }
    if (this.skill.ready()) {
        var skill = this.skill(this.game, this, this.player);
        this.events.onCastSkill.dispatch(skill);
    }
};

module.exports = Death;