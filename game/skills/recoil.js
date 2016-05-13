'use strict';

var BaseSkill = require('./baseskill'); 
var timeOfLive = 1000;

function Recoil(game, from, to) {
    BaseSkill.call(this, game, from, to, 'recoil');

    game.time.events.add(timeOfLive, this.destroy, this);
}

Recoil.prototype = Object.create(BaseSkill.prototype);
Recoil.prototype.constructor = Recoil;

Recoil.prototype.impact = function(Recoil){
    this.kill();
}

Recoil.prototype.timeout = 5000;
module.exports = Recoil;