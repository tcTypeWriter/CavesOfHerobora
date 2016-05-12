'use strict';

var speed = 100;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Tree(game, point, player) {
    BaseMonster.call(this, game, point, player, 'tree');
    this.scale.setTo(0.8, 0.8);

    this.health = this.maxHealth = 100;
    this.skill = skillFactory.createSkill('Bolt', game);
}

Tree.prototype = Object.create(BaseMonster.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.Name = "Tree";

Tree.prototype.update = function() {
    if(!this.alive) return;
    
    var treeIsFar = this.physics.distanceToXY(this.player, this.x, this.y) > 205,
        treeIsClose = this.physics.distanceToXY(this.player, this.x, this.y) < 195;

    if(treeIsFar || treeIsClose){
        
        this.physics.moveToObject(this, this.player, speed);
        if(treeIsClose)
            this.body.velocity.multiply(-1, -1);

    } else {
        this.body.velocity.setTo(0, 0);  
    }
};

module.exports = Tree;