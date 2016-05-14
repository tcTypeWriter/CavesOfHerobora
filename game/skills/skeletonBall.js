'use strict';

var BaseSkill = require('./baseskill');

var speed = 300;
var power = 1;
var time = 2000;

function SkeletonBall(game, from, to) {
    this.target = to;

    BaseSkill.call(this, game, from, to, 'fireball');
    this.scale.setTo(0.08, 0.08);
    game.physics.arcade.moveToObject(this, this.target, speed);

    this.body.rotation = game.physics.arcade.angleBetween(this, this.target);

    this.power = power;
    game.time.events.add(2000, this.destroy, this);
}

SkeletonBall.prototype = Object.create(BaseSkill.prototype);
SkeletonBall.prototype.constructor = SkeletonBall;

SkeletonBall.prototype.impact = function (mob) {
    mob.damage(1);
    this.kill();
};

SkeletonBall.prototype.update = function () {
    var vector = {
        x: this.target.x - this.x,
        y: this.target.y - this.y,
    };
    vector = normalise(vector);
    this.body.velocity.setTo(vector.x * speed, vector.y * speed);
};

function normalise(vector) {
    var inversion = 1 / Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return {
        x: vector.x * inversion,
        y: vector.y * inversion
    };
}

SkeletonBall.prototype.timeout = time;
module.exports = SkeletonBall;