'use strict';

var HealthPotion = function(game, position) {
    Phaser.Sprite.call(this, game, position.x, position.y, 'healthPotion');
    game.physics.enable(this);
    this.anchor.set(0.5);
    this.scale.setTo(0.2, 0.2);
};

HealthPotion.prototype = Object.create(Phaser.Sprite.prototype);
HealthPotion.prototype.constructor = HealthPotion;

HealthPotion.prototype.impact = function(player){
    debugger;
    player.heal(3);
    this.destroy();
};

module.exports = HealthPotion;
