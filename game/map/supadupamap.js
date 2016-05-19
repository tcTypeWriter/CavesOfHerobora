'use strict';

var roomData = require('./rooms/roomData');
var roomFactory = require('./rooms/roomFactory');

function DemoMap(game) {
    roomFactory.SimpleRoom.call(this, game, 'empty');
        
    roomData["0x1"] = { background: "brick1",
                items:{
                            HealthPotion:[
                                {x: 100, y: 100}
                            ]
                            }};
    var room = new roomFactory.SimpleRoom(game,  "0x1");
    this.concat(room, "left");
    /*var rooms_name = ['', 'tree', 'spider', 'minotaur', 'bat'];

    var rooms = [{}];
    for (var i = 1; i < 5; i++) {
        rooms[i] = new roomFactory.SimpleRoom(game, rooms_name[i]);
    }
    

    var bossRoom = new roomFactory.BossRoom(game, 'bat_boss');

    rooms[1].concat(bossRoom, "right");

    this.concat(rooms[1], "up");
    this.concat(rooms[2], "right");
    this.concat(rooms[3], "down");
    this.concat(rooms[4], "left");*/
}

DemoMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
DemoMap.prototype.constructor = DemoMap;

module.exports = DemoMap;