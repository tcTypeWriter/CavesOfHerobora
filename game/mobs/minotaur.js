'use strict';

var BaseMonster = require('./baseMonster');

function Minotaur(game, point, player) {
    BaseMonster.call(this, game, point, player, 'minotaur');
    this.scale.setTo(0.5, 0.5);

    this.health = this.maxHealth = 5;
}

Minotaur.prototype = Object.create(BaseMonster.prototype);
Minotaur.prototype.constructor = BaseMonster;
Minotaur.prototype.Name = "Minotaur";

Minotaur.prototype.update = function(){

};

module.exports = Minotaur;