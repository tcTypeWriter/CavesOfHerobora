'use strict';

var BaseSkill = require('./baseskill');

var speed = 250;
var power = 2;
var time = 3000;

function LifeSucking(game, from, to) {
    this.target = to;
    
    this.vampire = from;
    
    BaseSkill.call(this, game, from, to, 'fireball');
    this.scale.setTo(0.11, 0.11);
    game.physics.arcade.moveToObject(this, this.target, speed);
        
    this.body.rotation = game.physics.arcade.angleBetween(this, this.target);

    this.power = power;
    game.time.events.add(time, this.destroy, this);
}

LifeSucking.prototype = Object.create(BaseSkill.prototype);
LifeSucking.prototype.constructor = LifeSucking;

LifeSucking.prototype.impact = function (mob) {
    mob.damage(power);
    this.vampire.heal(power);
    this.kill();
};

LifeSucking.prototype.update = function () {
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

LifeSucking.prototype.timeout = time;
module.exports = LifeSucking;