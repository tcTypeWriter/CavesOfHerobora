'use strict';

var BaseSkill = require('./baseskill'); 
var timeOfLive = 1000;

function Untouchable(game, from, to) {
    BaseSkill.call(this, game, from, to, 'untouchable');

    game.time.events.add(timeOfLive, this.destroy, this);
}

Untouchable.prototype = Object.create(BaseSkill.prototype);
Untouchable.prototype.constructor = Untouchable;

Untouchable.prototype.impact = function(Untouchable){
    this.kill();
}

Untouchable.prototype.timeout = 0;
module.exports = Untouchable;