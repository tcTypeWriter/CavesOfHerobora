'use strict';

var Creature = require('../creature');

function BaseMonster(game, point, player, sprite_key) {
    Creature.call(this, game, point.x, point.y, sprite_key);
    
    this.physics = game.physics.arcade;
    this.player = player;
}

BaseMonster.prototype = Object.create(Creature.prototype);
BaseMonster.prototype.constructor = BaseMonster;

module.exports = BaseMonster;