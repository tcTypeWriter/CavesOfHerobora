'use strict';

var BaseItem = require('./baseitem');

var SpeedPotion = function(game, position) {
    BaseItem.call(this, game, position, 'speedPotion');
    this.scale.setTo(0.2, 0.2);
};

SpeedPotion.prototype = Object.create(BaseItem.prototype);
SpeedPotion.prototype.constructor = SpeedPotion;
SpeedPotion.prototype.Name = "SpeedPotion";

SpeedPotion.prototype.impact = function(player){
    player.state.speed *= 1.1;
    player.state.speed = Math.round(player.state.speed);
    this.destroy();
};

module.exports = SpeedPotion;
