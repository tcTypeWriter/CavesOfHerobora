'use strict';

var attack_distance = 30;

var BaseMonster = require('./baseMonster');
var skillFactory = require('skillFactory');

function SkeletonKing(game, point, player) {
    BaseMonster.call(this, game, point, player, 'skeletonKing');
    this.scale.setTo(0.4, 0.4);

    this.skill = skillFactory.createSkill('SkeletonSpawn', game);

    this.timer = null;

    this.health = this.maxHealth = 50;
    this.skeletons = [];
}

SkeletonKing.prototype = Object.create(BaseMonster.prototype);
SkeletonKing.prototype.constructor = SkeletonKing;
SkeletonKing.prototype.Name = "SkeletonKing";

SkeletonKing.prototype.update = function () {
    if (!this.alive) return;

    var self = this;

    if (this.physics.distanceToXY(this.player, this.x, this.y) > 250)
        this.physics.moveToObject(this, this.player, 100);
    else {
        this.body.velocity.setTo(0, 0);
    }
    var aliveSkeletons = 0;
    for (var i = 0; i < this.skeletons.length; i++) {
        if (this.skeletons[i].alive) {
            aliveSkeletons++;
        }
    }
    if (aliveSkeletons > 0) {
        this.body.velocity.setTo(0, 0);
    }
    if (aliveSkeletons == 0) {
        if (self.timer == null)
            self.timer = setTimeout(spawnSkeletons, 5000);
    }

    function spawnSkeletons() {
        var position1 = {
            x: random(100, 700),
            y: random(100, 500),
        }
        var position2 = {
            x: random(100, 700),
            y: random(100, 500),
        }
        var position3 = {
            x: random(100, 700),
            y: random(100, 500),
        }
        var skill1 = self.skill(self.game, position1, self.player);
        self.events.onCastSkill.dispatch(skill1);
        self.skeletons.push(skill1.skeleton);

        var skill2 = self.skill(self.game, position2, self.player);
        self.events.onCastSkill.dispatch(skill2);
        self.skeletons.push(skill2.skeleton);

        var skill3 = self.skill(self.game, position3, self.player);
        self.events.onCastSkill.dispatch(skill3);
        self.skeletons.push(skill3.skeleton);

        self.timer = null;
    }
};
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = SkeletonKing;