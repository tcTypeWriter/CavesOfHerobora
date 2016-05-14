'use strict';

var BaseSkill = require('./baseskill');
var Skeleton = require('skeleton');

function SkeletonSpawn(game, position, player) {
    BaseSkill.call(this, game, position, player, 'natures_call');

    this.scale.setTo(0, 0);

    this.position = position;
    this.player = player;

    this.events.onCastMonster = new Phaser.Signal();
    
    this.skeleton = new Skeleton(this.game, this.position, this.player);
}

SkeletonSpawn.prototype = Object.create(BaseSkill.prototype);
SkeletonSpawn.prototype.constructor = SkeletonSpawn;

SkeletonSpawn.prototype.update = function () {
    this.events.onCastMonster.dispatch(this.skeleton);
    this.kill();
};

SkeletonSpawn.prototype.timeout = 5000;
module.exports = SkeletonSpawn;