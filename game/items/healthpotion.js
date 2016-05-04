'use strict';

var BaseItem = require('./baseitem');

var HealthPotion = function(game, position) {
    BaseItem.call(this, game, position, 'healthPotion');
    this.scale.setTo(0.2, 0.2);
};

HealthPotion.prototype = Object.create(BaseItem.prototype);
HealthPotion.prototype.constructor = HealthPotion;
HealthPotion.prototype.Name = "HealthPotion";

HealthPotion.prototype.impact = function(player){
    player.heal(3);
    this.destroy();
};

module.exports = HealthPotion;
