'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 200;
var power = 1;
var timeOfLive = 1000;

function Bolt(game, from, to) {
    BaseSkill.call(this, game, from, to, 'bolt');
    this.scale.setTo(0.3, 0.3);

    game.physics.arcade.moveToObject(this, to, speed);
    this.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Bolt.prototype = Object.create(BaseSkill.prototype);
Bolt.prototype.constructor = Bolt;

module.exports = Bolt;