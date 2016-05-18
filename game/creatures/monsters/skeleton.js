'use strict';

var speed = 100;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Skeleton(game, point, player) {
    BaseMonster.call(this, game, point, player, 'skeleton');
    this.scale.setTo(0.3, 0.3);

    this.health = this.maxHealth = 3;
}

Skeleton.prototype = Object.create(BaseMonster.prototype);
Skeleton.prototype.constructor = Skeleton;
Skeleton.prototype.Name = "Skeleton";

Skeleton.prototype.update = function () {
    if (!this.alive) return;

    if (this.physics.distanceToXY(this.player, this.x, this.y) > 50)
        this.physics.moveToObject(this, this.player, 100);
    else {
        this.player.damage(1);
        this.body.velocity.setTo(0, 0);
    }
};

module.exports = Skeleton;