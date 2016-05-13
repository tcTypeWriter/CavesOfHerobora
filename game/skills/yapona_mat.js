'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 600;
var power = 1;
var timeOfLive = 1000;

function Yapona_mat(game, from, to) {
    BaseSkill.call(this, game, from, to, 'yapona_mat');
    this.scale.setTo(0.3, 0.3);

    game.physics.arcade.moveToObject(this, to, speed);
    this.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;
    game.time.events.add(timeOfLive, this.destroy, this);
}

Yapona_mat.prototype = Object.create(BaseSkill.prototype);
Yapona_mat.prototype.constructor = Yapona_mat;

Yapona_mat.prototype.impact = function(mob){
    mob.damage(this.power);
    this.kill();
}

Yapona_mat.prototype.timeout = 50;
module.exports = Yapona_mat;