'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 300;
var power = 0;
var timeOfLive = 1000;

function Cobble(game, from, to) {
    BaseSkill.call(this, game, from, to, 'cobble');
    this.scale.setTo(0.4, 0.4);

    game.physics.arcade.moveToObject(this, to, speed);
   
    this.body.mass = 100;

    this.power = power;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Cobble.prototype = Object.create(BaseSkill.prototype);
Cobble.prototype.constructor = Cobble;  

Cobble.prototype.timeout = 5000;

Cobble.prototype.impact = function(mob){
    this.game.physics.arcade.collide(this, mob);
}

module.exports = Cobble;