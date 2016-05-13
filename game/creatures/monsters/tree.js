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
   // this.skillForKill = skillFactory.createSkill('Yapona_mat', game);
}

Tree.prototype = Object.create(BaseMonster.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.Name = "Tree";

Tree.prototype.update = function () {
    if (!this.alive) return;

    var self = this;

    move();
    if(this.skill.ready())
        castSkill();


    function move(){
        var treeIsFar = self.physics.distanceToXY(self.player, self.x, self.y) > 205,
            treeIsClose = self.physics.distanceToXY(self.player, self.x, self.y) < 195;

        if (treeIsFar || treeIsClose) {

            self.physics.moveToObject(self, self.player, speed);
            if (treeIsClose)
                self.body.velocity.multiply(-1, -1);

        } else {
            self.body.velocity.setTo(0, 0);
        }        
    }

    function castSkill(){
        var left = { x: self.x - self.width / 4 * 3 , y: self.y },
            top = { x: self.x, y: self.y - self.height / 4 * 3},
            right = { x: self.x + self.width / 4 * 3 , y: self.y },
            bottom = { x: self.x, y: self.y + self.height / 4 * 3};

        var position1 = self.player.x < self.x ? left : right;
        var position2 = self.player.y < self.y ? top  : bottom;

        var skill1 = self.skill(self.game, position1, self.player);
        self.events.onCastSkill.dispatch(skill1);
        var skill2 = self.skill(self.game, position2, self.player);
        self.events.onCastSkill.dispatch(skill2);
    }

    // if (this.physics.distanceBetween(this.player, this) < attack_distance &&
    //     this.skillForKill.ready()) {
    //     var skillForKill = this.skillForKill(this.game, this, this.player);
    //     this.events.onCastSkill.dispatch(skillForKill);
    // }

};

module.exports = Tree;