'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 400;
var power = 1;
var timeOfLive = 250;

function Sword(game, from, to) {
    BaseSkill.call(this, game, from, to, 'sword');

    this.shift = Phaser.Point.subtract(to, from).normalize().multiply(20,20)
    this.from = from;
    this.to = to;
    this.position = Phaser.Point.add(this.from, this.shift);

    this.scale.setTo(0.3, 0.3);
    this.anchor.setTo(0.5, 0.8);

    this.rotation = game.physics.arcade.angleBetween(this, to) + (to.x < this.x ? Math.PI : 0); 
    

    this.power = power;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Sword.prototype = Object.create(BaseSkill.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function(){
    this.position = Phaser.Point.add(this.from, this.shift);
    
    this.rotation += Math.PI / 25 * (this.to.x > this.x ? 1 : -1);    
}

Sword.prototype.impact = function(mob){
    mob.damage(this.power);
}


Sword.prototype.timeout = 250;
module.exports = Sword;