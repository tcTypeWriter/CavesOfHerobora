'use strict';

var speed = 100;
var attack_distance = 3228;
var BaseMonster = require('./baseMonster');
var skillFactory = require('skillFactory');

function Tree(game, point, player) {
    BaseMonster.call(this, game, point, player, 'tree');
    this.scale.setTo(0.8, 0.8);

    this.health = this.maxHealth = 100;
    this.skill = skillFactory.createSkill('Natures_call', game);
    this.skillForKill = skillFactory.createSkill('Yapona_mat', game);
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

    if(this.skill.ready()){
        if(this.player < (this.x + this.width / 2)&&this.player > (this.x - this.width / 2)){}
        var position1 = {
            x: this.x + this.width / 2*((this.player.x-this.x)/(Math.abs(this.player.x-this.x))),
            y: this.y + this.height / 2*((this.player.y-this.y)/(Math.abs(this.player.y-this.y)))
        };
        var position2 = {
            x: this.x,
            y: this.y + this.height / 2*((this.player.y-this.y)/(Math.abs(this.player.y-this.y)))
        };
        var position3 = {
            x: this.x - this.width / 2*((this.player.x-this.x)/(Math.abs(this.player.x-this.x))),
            y: this.y + this.height / 2*((this.player.y-this.y)/(Math.abs(this.player.y-this.y)))
        }
        
        debugger;
        var skill = this.skill(this.game, position1, position2, position3, this.player);
        this.events.onCastSkill.dispatch(skill);
        
    }
    
    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
        this.skillForKill.ready()){
        var skillForKill = this.skillForKill(this.game, this, this.player);
        this.events.onCastSkill.dispatch(skillForKill);
    }
    
};

module.exports = Tree;