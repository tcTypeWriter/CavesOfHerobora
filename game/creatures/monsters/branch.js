'use strict';

var speed = 200;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Branch(game, point, player) {
    BaseMonster.call(this, game, point, player, 'branch');
    this.scale.setTo(0.3, 0.3);

    this.health = this.maxHealth = 100000;
    this.body.bounce.setTo(1, 1);
    this.body.velocity.setTo(200, 200);
    this.state = {};
}

Branch.prototype = Object.create(BaseMonster.prototype);
Branch.prototype.constructor = Branch;
Branch.prototype.Name = "Branch";

Branch.prototype.update = function() {
    if(!this.alive) return;
    this.body.velocity.normalize().multiply(200, 200);
    
    this.physics.overlap(this.player, this, hit);
    
    function hit(player, mob)
    {
        player.damage(1);
    }
};

module.exports = Branch;