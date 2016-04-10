'use strict';

var speed = 200;
var power = 1;
var lastTime, time;
var timeout = 500;
var timeOfLive = 750;

function Sting(game, x, y, to) {
    Phaser.Sprite.call(this, game, x, y, 'sting');
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.events.onKilled.add(this.destroy, this);

    game.physics.arcade.enable(this);
    game.physics.arcade.moveToObject(this, to, speed);

    this.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;

    time = game.time;
    lastTime = game.time.now;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Sting.prototype = Object.create(Phaser.Sprite.prototype);
Sting.prototype.constructor = Sting;

Sting.ready = function(){
    return time ? (time.now > lastTime + timeout) : true;
}

module.exports = Sting;