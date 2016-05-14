'use strict';

var BaseSkill = require('./baseskill'); 
var Stump = require('stump');

function Natures_call(game, position, player) {
    BaseSkill.call(this, game, position, player, 'natures_call');  

    this.scale.setTo(0, 0);

    this.position = position;
    this.player = player;
    

    this.events.onCastMonster = new Phaser.Signal();
}

Natures_call.prototype = Object.create(BaseSkill.prototype);
Natures_call.prototype.constructor = Natures_call;

Natures_call.prototype.update = function(){
    var stump = new Stump(this.game,  this.position, this.player);
    
    this.events.onCastMonster.dispatch(stump);
    this.kill();
};

Natures_call.prototype.timeout = 3228;
module.exports = Natures_call;