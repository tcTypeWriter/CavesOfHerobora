'use strict';

var BaseSkill = require('./baseskill');

var speed = 250;
var power = 1;
var time = 10000;

function Deathball(game, from, to) {
    this.target = to;

    BaseSkill.call(this, game, from, to, 'deathball');
    this.scale.setTo(0.15, 0.15);
    game.physics.arcade.moveToObject(this, this.target, speed);

    this.body.rotation = game.physics.arcade.angleBetween(this, this.target);

    this.power = power;
    game.time.events.add(time, this.destroy, this);
}

Deathball.prototype = Object.create(BaseSkill.prototype);
Deathball.prototype.constructor = Deathball;

Deathball.prototype.impact = function (mob) {
    mob.damage(mob.health);
    this.kill();
};

Deathball.prototype.update = function () {
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

Deathball.prototype.timeout = time;
module.exports = Deathball;