'use strict';

var roomFactory = require('./rooms/roomFactory');

function DemoMap(game) {
    roomFactory.SimpleRoom.call(this, game, 'start');
        
    var rooms = [];
    for(var  i = 1; i <= 9; i++)
        rooms[i] = new roomFactory.SimpleRoom(game, 'room' + i);

    var boss = new roomFactory.BossRoom(game, 'boss');
    this.concat(rooms[1], 'left');
    this.concat(rooms[2], 'down');
    this.concat(rooms[3], 'up');
    this.concat(rooms[4], 'right');

    rooms[4].concat(rooms[5], 'right');
    rooms[5].concat(rooms[6], 'right');
    rooms[6].concat(rooms[7], 'up');
    rooms[6].concat(rooms[8], 'right');
    rooms[8].concat(rooms[9], 'down');

    rooms[8].concat(boss, 'right');

}

DemoMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
DemoMap.prototype.constructor = DemoMap;

module.exports = DemoMap;