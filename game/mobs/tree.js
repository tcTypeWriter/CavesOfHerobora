'use strict';

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var attack_distance = 200;
var radius = 10;


var skillFactory = require('../skills/skillFactory');

function Tree(game, point, player) {
    Phaser.Sprite.call(this, game, point.x + radius, point.y, 'tree');
    

    
    game.physics.enable(this);

    this.body.immovable = true;
    this.events.onCastSkill = new Phaser.Signal();

    this.health = this.maxHealth = 5;
}

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() { };

Tree.prototype.damage = function (amount) {
    if (this.alive && !this.immune)
    {
        this.health -= amount;
        this.immune = true;
        this.game.time.events.add(100, function(){
            this.immune = false;
        }, this)
        if (this.health <= 0)
        {
            this.kill();
        }
    }
    return this;
}

module.exports = Tree;