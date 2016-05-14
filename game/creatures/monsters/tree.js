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

    this.shooting = false;
    this.game.time.events.add(5000, this.startShooting, this);
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
        var distance = Math.max(self.width, self.height) - 30;
        var perpDist = 40;

        var toPlayer = self.player.position.clone()
                                           .subtract(self.x, self.y)
                                           .normalize();
        var perp = toPlayer.clone().rperp();
        
        var center = {
                    x: self.x + distance*toPlayer.x, 
                    y: self.y + distance*toPlayer.y
            };
        var left = {
                    x: center.x + perpDist*perp.x, 
                    y: center.y + perpDist*perp.y
            };
        var right  = {
                    x: center.x - perpDist*perp.x, 
                    y: center.y - perpDist*perp.y
            };

        var skill = self.skill(self.game, center, self.player);
        self.events.onCastSkill.dispatch(skill);
        skill = self.skill(self.game, left, self.player);
        self.events.onCastSkill.dispatch(skill);
        skill = self.skill(self.game, right, self.player);
        self.events.onCastSkill.dispatch(skill);
    }

    if (this.physics.distanceBetween(this.player, this) < attack_distance &&
        this.skillForKill.ready() && this.shoоting) {
        var skillForKill = this.skillForKill(this.game, this, this.player);
        this.events.onCastSkill.dispatch(skillForKill);
    }

};

Tree.prototype.startShooting = function(){
    this.shoоting = true;
    this.game.time.events.add(2000, this.stopShooting, this);
};

Tree.prototype.stopShooting = function(){
    this.shoоting = false;
    this.game.time.events.add(5000, this.startShooting, this);
};

module.exports = Tree;