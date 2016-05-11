'use strict';

var BaseItem = function(game, position, sprite_key) {
    Phaser.Sprite.call(this, game, position.x, position.y, sprite_key);
    game.physics.enable(this);
    this.anchor.set(0.5);
    this.game = game;
    this.state = {};
};

BaseItem.prototype = Object.create(Phaser.Sprite.prototype);
BaseItem.prototype.constructor = BaseItem;

BaseItem.prototype.impact = function(){};

BaseItem.prototype.getModel = function() {
    return {
        x: this.x,
        y: this.y,
        state: this.state
    };
};

BaseItem.prototype.setModel = function(data){
    this.x = data.x || this.x;
    this.y = data.y || this.y;
    this.state = data.state || this.state;
};


module.exports = BaseItem;
