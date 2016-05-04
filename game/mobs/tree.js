'use strict';

var BaseMonster = require('./baseMonster');

function Tree(game, point, player) {
    BaseMonster.call(this, game, point, player, 'tree');

    this.body.immovable = true;
    
    this.health = this.maxHealth = 5;
}

Tree.prototype = Object.create(BaseMonster.prototype);
Tree.prototype.constructor = BaseMonster;
Tree.prototype.Name = "Tree";

module.exports = Tree;