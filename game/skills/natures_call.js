'use strict';

var BaseSkill = require('./baseskill'); 
var Stump = require('stump');

function Natures_call(game, to, player) {
    BaseSkill.call(this, game, to, player, 'natures_call');  

    this.scale.setTo(0, 0);

    this.to = to;
    this.player = player;

    this.events.onCastMonster = new Phaser.Signal();
}

Natures_call.prototype = Object.create(BaseSkill.prototype);
Natures_call.prototype.constructor = Natures_call;

Natures_call.prototype.update = function(){
    var stump = new Stump(this.game,  this.to, this.player);

    this.events.onCastMonster.dispatch(stump);
    this.kill();
};

Natures_call.prototype.timeout = 3228;
module.exports = Natures_call;