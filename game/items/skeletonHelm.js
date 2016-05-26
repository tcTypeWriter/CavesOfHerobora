'use strict';

var BaseItem = require('./baseitem');

var SkeletonHelm = function(game, position) {
    BaseItem.call(this, game, position, 'helm');
    this.scale.setTo(0.7, 0.7);
};

SkeletonHelm.prototype = Object.create(BaseItem.prototype);
SkeletonHelm.prototype.constructor = SkeletonHelm;
SkeletonHelm.prototype.Name = "SkeletonHelm";

SkeletonHelm.prototype.impact = function(player){
    player.health += 10;
    player.maxHealth += 10;
    this.destroy();
};

module.exports = SkeletonHelm;
