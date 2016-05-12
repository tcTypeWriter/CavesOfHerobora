'use strict';

var BaseRoom = require('./baseroom');
var roomData = require('./roomData');

function BossRoom(game, key) {
    BaseRoom.call(this, game, key);
    var data = roomData[key];

    this.model.monsters = data.monsters || this.model.monsters;
    this.model.items = data.items || this.model.items;
    
    this.background = 'brick1';
}

BossRoom.prototype = Object.create(BaseRoom.prototype);
BossRoom.prototype.constructor = BossRoom;

BossRoom.prototype.changeRoom = function(player, door){
    if(this.space.isDown && this.monsters.countLiving() === 0)
        door.go(player.getModel());
};
module.exports = BossRoom;