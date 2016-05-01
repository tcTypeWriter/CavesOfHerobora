'use strict';

var BaseMonster = require('./baseMonster');

function Stump(game, point, player) {
    BaseMonster.call(this, game, point, player, 'stump');
    this.scale.setTo(0.3, 0.3);

    this.health = this.maxHealth = 5;
}

Stump.prototype = Object.create(BaseMonster.prototype);
Stump.prototype.constructor = BaseMonster;
Stump.prototype.Name = "Stump";

Stump.prototype.update = function(){

};

module.exports = Stump;