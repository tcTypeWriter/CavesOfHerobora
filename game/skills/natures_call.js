'use strict';

var BaseSkill = require('./baseskill'); 
var Stump = require('stump');

function Natures_call(game, position1, position2, position3, player) {
    BaseSkill.call(this, game, position1, position2, position3, player, 'natures_call');  

    this.scale.setTo(0, 0);

    this.to = to;
    this.player = player;

    this.events.onCastMonster = new Phaser.Signal();
}

Natures_call.prototype = Object.create(BaseSkill.prototype);
Natures_call.prototype.constructor = Natures_call;

Natures_call.prototype.update = function(){
    var stump1 = new Stump(this.game,  this.position1, this.player);
    var stump2 = new Stump(this.game,  this.position2, this.player);
    var stump3 = new Stump(this.game,  this.position3, this.player);
    this.events.onCastMonster.dispatch(stump1);
    this.events.onCastMonster.dispatch(stump2);
    this.events.onCastMonster.dispatch(stump3);
    this.kill();
};

Natures_call.prototype.timeout = 3228;
module.exports = Natures_call;