'use strict';

var BaseSkill = require('./baseskill');
var SkeletonKing = require('skeletonKing');

function Reincarnation(game, position, player, skeletons) {
    BaseSkill.call(this, game, position, player, 'natures_call');

    this.scale.setTo(0, 0);

    this.position = position;
    this.player = player;
    this.skeletons = skeletons;

    this.events.onCastMonster = new Phaser.Signal();
}

Reincarnation.prototype = Object.create(BaseSkill.prototype);
Reincarnation.prototype.constructor = Reincarnation;

Reincarnation.prototype.update = function () {
    var skeletonKing = new SkeletonKing(this.game, this.position, this.player, this.skeletons);
    this.events.onCastMonster.dispatch(skeletonKing);
    this.kill();
};

Reincarnation.prototype.timeout = 0;
module.exports = Reincarnation;