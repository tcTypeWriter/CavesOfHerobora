'use strict';

var speed = 170;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Stump(game, point, player) {
    BaseMonster.call(this, game, point, player, 'stump');
    this.scale.setTo(0.3, 0.3); 
    this.body.mass = 0;
    this.health = this.maxHealth = 2;
    this.skill = skillFactory.createSkill('Bolt', game);

    this.state = {};
}

Stump.prototype = Object.create(BaseMonster.prototype);
Stump.prototype.constructor = Stump;
Stump.prototype.Name = "Stump";

Stump.prototype.update = function() {
    if(!this.alive) return;
    
    this.physics.overlap(this.player, this, hit);
    
    function hit(player, mob)
    {
        player.damage(1);
    }

    var stumpIsFar = this.physics.distanceToXY(this.player, this.x, this.y) > 30;    

    if(stumpIsFar)
        this.physics.moveToObject(this, this.player, speed);
    else
        this.body.velocity.setTo(0, 0);
};

module.exports = Stump;