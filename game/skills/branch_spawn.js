'use strict';

var BaseSkill = require('./baseskill'); 
var Branch = require('branch');

function Branch_spawn(game, position, player) {
    BaseSkill.call(this, game, position, player, 'branch_spawn');  

    this.scale.setTo(0, 0);

    this.position = position;
    this.player = player;
    
    this.branch = new Branch(this.game,  this.position, this.player);
    this.events.onCastMonster = new Phaser.Signal();
}

Branch_spawn.prototype = Object.create(BaseSkill.prototype);
Branch_spawn.prototype.constructor = Branch_spawn;

Branch_spawn.prototype.update = function(){
    this.events.onCastMonster.dispatch(this.branch);
    this.kill();
};

Branch_spawn.prototype.timeout = 5000;
module.exports = Branch_spawn;