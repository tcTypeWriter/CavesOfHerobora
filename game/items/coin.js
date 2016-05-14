'use strict';

var BaseItem = require('./baseitem');

var Coin = function(game, position) {
    BaseItem.call(this, game, position, 'coin');
    this.scale.setTo(0.12, 0.12);
};

Coin.prototype = Object.create(BaseItem.prototype);
Coin.prototype.constructor = Coin;
Coin.prototype.Name = "Coin";

Coin.prototype.impact = function(player){
    player.state.coins++;
    this.destroy();
};

module.exports = Coin;
