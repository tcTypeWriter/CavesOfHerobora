'use strict';

var BaseMonster = require('./baseMonster');

function Spider(game, point, player) {
    BaseMonster.call(this, game, point, player, 'spider');
    this.scale.setTo(0.3, 0.3);

    this.health = this.maxHealth = 5;
}

Spider.prototype = Object.create(BaseMonster.prototype);
Spider.prototype.constructor = BaseMonster;
Spider.prototype.Name = "Spider";

Spider.prototype.update = function(){

};

module.exports = Spider;