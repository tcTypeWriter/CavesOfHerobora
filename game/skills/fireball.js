'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 700;
var power = 1;

function Fireball(game, from, to) {
    BaseSkill.call(this, game, from, to, 'fireball');
    this.scale.setTo(0.06, 0.06);
    game.physics.arcade.moveToObject(this, to, speed);

    this.body.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;
}

Fireball.prototype = Object.create(BaseSkill.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.prototype.impact = function(mob){
    mob.damage(this.power);
    this.kill();
}


Fireball.prototype.timeout = 500;
module.exports = Fireball;