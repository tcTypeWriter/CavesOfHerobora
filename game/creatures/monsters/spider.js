'use strict';

var attack_distance = 50;

var BaseMonster = require('./baseMonster');
var skillFactory = require('skillFactory');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Spider(game, point, player) {
    BaseMonster.call(this, game, point, player, 'spider');
    this.scale.setTo(0.15, 0.15);

    this.skill = skillFactory.createSkill('Bite', game);

    this.state = {
        base: point
    };

    this.health = this.maxHealth = 3;

    this.updateMoving;
}

Spider.prototype.updateMoving = function(){
    if((Math.abs(this.player.x-this.x))>(Math.abs(this.player.y-this.y))){
    this.physics.moveToXY(this, this.x + 1000*((this.player.x-this.x)/(Math.abs(this.player.x-this.x))), this.y, 200);               
    }else{
    this.physics.moveToXY(this, this.x , this.y + 1000*((this.player.y-this.y)/(Math.abs(this.player.y-this.y))), 200);                
    }
    this.game.time.events.add(2000, this.updateMoving, this);
};


Spider.prototype = Object.create(BaseMonster.prototype);
Spider.prototype.constructor = BaseMonster;
Spider.prototype.Name = "Spider";

Spider.prototype.update = function () {
   

    if (this.physics.distanceBetween(this.player, this) < attack_distance &&
        this.skill.ready()) {
        var skill = this.skill(this.game, {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }, this.player);
        this.events.onCastSkill.dispatch(skill);
    }
};

module.exports = Spider;