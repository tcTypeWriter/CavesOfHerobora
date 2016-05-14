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
    for(var i = 0; i < player.skillSet.length; i++)
        player.skillSet[i].reduce(3);    
    
    this.destroy();
};

module.exports = CalldownPotion;
