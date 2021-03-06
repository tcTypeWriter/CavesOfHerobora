'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 300;
var power = 1;

function Branch(game, from, to, sprite) {
    BaseSkill.call(this, game, from, to, sprite || 'branch');
    game.physics.arcade.moveToObject(this, to, speed);
    this.scale.setTo(0.6, 0.6);

    this.body.rotation = game.physics.arcade.angleBetween(this, to);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);
    this.power = power;
}

Branch.prototype = Object.create(BaseSkill.prototype);
Branch.prototype.constructor = Branch;

Branch.prototype.impact = function(mob){
    mob.damage(this.power);
};


Branch.prototype.timeout = 500;
module.exports = Branch;