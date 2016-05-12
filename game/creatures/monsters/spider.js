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
}

Spider.prototype = Object.create(BaseMonster.prototype);
Spider.prototype.constructor = BaseMonster;
Spider.prototype.Name = "Spider";

Spider.prototype.update = function () {
    if (!this.alive) return;

    var vector = {
        x: random(-10, 10),
        y: random(-10, 10)
    };

    this.physics.accelerateToXY(this, this.x + vector.x, this.y + vector.y, 3000);


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