'use strict';

var speed = 400;
var power = 1;
var lastTime, time;
var timeout = 500;

function Fireball(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fireball');
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.events.onKilled.add(this.destroy, this);

    game.physics.arcade.enable(this);
    game.physics.arcade.moveToPointer(this, speed);

    this.body.rotation = game.physics.arcade.angleToPointer(this);
    
    this.body.bounce.setTo(1, 1);
    this.power = power;

    time = game.time;
    lastTime = game.time.now;
}

Fireball.prototype = Object.create(Phaser.Sprite.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.ready = function(){
    // debugger;
    return time ? time.now > lastTime + timeout : true;
}

module.exports = Fireball;