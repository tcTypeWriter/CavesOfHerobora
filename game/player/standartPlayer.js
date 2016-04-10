'use strict';

var Character = require('./character');

function StandartPlayer(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);

    this.anchor.set(0.5);
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);

    this.hp = 10;

    this.character = new Character();

    this.physics = game.physics.arcade;
    this.keys = game.input.keyboard.addKeys(
        {
            'up': Phaser.Keyboard.W,
            'left': Phaser.Keyboard.A,
            'down': Phaser.Keyboard.S,
            'right': Phaser.Keyboard.D,
        }
    );
}

StandartPlayer.prototype = Object.create(Phaser.Sprite.prototype);
StandartPlayer.prototype.constructor = StandartPlayer;

StandartPlayer.prototype.update = function(){

    this.rotation = this.physics.angleToPointer(this);
    var velocity = this.body.velocity,
        keys = this.keys;

    velocity.setTo(0, 0)
    if (keys.left.isDown)
        velocity.x = -400;
    
    if (keys.right.isDown)
        velocity.x = 400;
    
    if (keys.up.isDown)
        velocity.y = -400;
    
    if (keys.down.isDown)
        velocity.y = 400;
}


module.exports = StandartPlayer;