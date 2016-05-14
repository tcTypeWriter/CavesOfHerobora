'use strict';

var BaseItem = require('./baseitem');

var CalldownPotion = function(game, position) {
    BaseItem.call(this, game, position, 'calldownPotion');
    this.scale.setTo(0.2, 0.2);
};

CalldownPotion.prototype = Object.create(BaseItem.prototype);
CalldownPotion.prototype.constructor = CalldownPotion;
CalldownPotion.prototype.Name = "CalldownPotion";

CalldownPotion.prototype.impact = function(player){
    player.defaultSkill.reduce(3);

    player.skillSet[0].reduce(3);    
    player.skillSet[1].reduce(3);
    player.skillSet[2].reduce(3);
    
    this.destroy();
};

module.exports = CalldownPotion;
