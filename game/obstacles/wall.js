'use strict';

var Wall = function(game, x, y, width, height) {
    Phaser.TileSprite .call(this, game, x, y, width, height , 'brick');
    game.physics.enable(this);
    this.body.immovable = true;
};

Wall.prototype = Object.create(Phaser.TileSprite.prototype);
Wall.prototype.constructor = Wall;

module.exports = Wall;
