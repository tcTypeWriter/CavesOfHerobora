'use strict';

var speed = 100;
var vision_distance = 500;
var attack_distance = 200;
var radius = 10;


var skillFactory = require('../skills/skillFactory');
var BaseMonster = require('./baseMonster');

function Stump(game, point, player) {
    var position = {x: point.x + radius, y: point.y};

    BaseMonster.call(this, game, position, player, 'stump');
    this.scale = new Phaser.Point(0.3, 0.3);


    this.body.mass = 10;

    this.health = this.maxHealth = 2;
    this.skill = skillFactory.createSkill('Bolt', game);

    this.state = {
        base: point,
        urge: 'swirl'
    };
}

Stump.prototype = Object.create(BaseMonster.prototype);
Stump.prototype.constructor = Stump;
Stump.prototype.Name = "Stump";

Stump.prototype.update = function() {
    if(!this.alive) return;
    

        if(this.physics.distanceToXY(this.player, this.x, this.y) > 20){
        this.body.velocity.x = speed*(this.player.body.x-this.x) / (Math.sqrt(Math.pow((this.x - this.player.body.x),2) + Math.pow((this.y - this.player.body.y),2)));
        this.body.velocity.y = speed*(this.player.body.y-this.y) / (Math.sqrt(Math.pow((this.x - this.player.body.x),2) + Math.pow((this.y - this.player.body.y),2)));
        }else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }

};

module.exports = Stump;