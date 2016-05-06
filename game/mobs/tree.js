'use strict';

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var attack_distance = 200;
var radius = 10;


var skillFactory = require('../skills/skillFactory');
var BaseMonster = require('./baseMonster');

function Tree(game, point, player) {
    var position = {x: point.x + radius, y: point.y};

    BaseMonster.call(this, game, position, player, 'tree');
    this.scale = new Phaser.Point(0.8, 0.8);


    this.body.velocity.y = lowspeed;

    this.body.mass = 8;

    this.health = this.maxHealth = 100;
    this.skill = skillFactory.createSkill('Bolt', game);
    }

Tree.prototype = Object.create(BaseMonster.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.Name = "Tree";

Tree.prototype.update = function() {
    if(!this.alive) return;
    
    var treeXVelocity = speed*(this.player.body.x-this.x) / (Math.sqrt(Math.pow((this.x - this.player.body.x),2) + Math.pow((this.y - this.player.body.y),2)));
    var treeYVelocity = speed*(this.player.body.y-this.y) / (Math.sqrt(Math.pow((this.x - this.player.body.x),2) + Math.pow((this.y - this.player.body.y),2)));


    
    if(this.physics.distanceToXY(this.player, this.x, this.y) > 205){
        this.body.velocity.x = treeXVelocity;
        this.body.velocity.y = treeYVelocity;
    } else if(this.physics.distanceToXY(this.player, this.x, this.y) < 195){
        this.body.velocity.x = -treeXVelocity;
        this.body.velocity.y = -treeYVelocity;  
    }else if((this.physics.distanceToXY(this.player, this.x, this.y) >= 195)||(this.physics.distanceToXY(this.player, this.x, this.y) <= 205)){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;  
    }
};

module.exports = Tree;