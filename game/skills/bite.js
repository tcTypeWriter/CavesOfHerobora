'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 1000;
var power = 1;
var timeOfLive = 50;

function Bite(game, from, to) {
    BaseSkill.call(this, game, from, to, 'bite');
    this.scale.setTo(0, 0);

    game.physics.arcade.moveToObject(this, to, speed);
    this.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Bite.prototype = Object.create(BaseSkill.prototype);
Bite.prototype.constructor = Bite;

Bite.prototype.impact = function(mob){
    mob.damage(this.power);
    this.kill();
}

Bite.prototype.timeout = 500;
module.exports = Bite;