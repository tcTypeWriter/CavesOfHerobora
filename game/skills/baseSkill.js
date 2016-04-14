'use strict';

function BaseSkill(game, from, to, key) {
    Phaser.Sprite.call(this, game, from.x, from.y, key);
    
    this.game = game;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.events.onKilled.add(this.destroy, this);

    game.physics.arcade.enable(this);
}

BaseSkill.prototype = Object.create(Phaser.Sprite.prototype);
BaseSkill.prototype.constructor = BaseSkill;

BaseSkill.prototype.impact = function(mob){}

BaseSkill.prototype.timeout = 1000;

module.exports = BaseSkill;