'use strict';

var attack_distance = 30;

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

    this.health = this.maxHealth = 1;

    setTimeout(Spider.prototype.updateMoving.bind(this), 200);
}

Spider.prototype = Object.create(BaseMonster.prototype);
Spider.prototype.constructor = BaseMonster;
Spider.prototype.Name = "Spider";

Spider.prototype.update = function () {
    if (!this.alive) return;

    if (this.physics.distanceBetween(this.player, this) < attack_distance &&
        this.skill.ready()) {
        var skill = this.skill(this.game, {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }, this.player);
        this.events.onCastSkill.dispatch(skill);
    }
};

Spider.prototype.updateMoving = function(){

     var vector = {
            x: random(-10, 10),
            y: random(-10, 10)
        };

    this.physics.moveToXY(this, this.x + vector.x, this.y + vector.y, 200);
    this.game.time.events.add(random(200, 500), this.stop, this);
};

Spider.prototype.stop = function(){
    this.body.velocity.setTo(0, 0);
    this.game.time.events.add(random(40, 100), this.updateMoving, this);
};


module.exports = Spider;