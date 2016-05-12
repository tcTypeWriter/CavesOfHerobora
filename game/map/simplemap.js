'use strict';

var roomFactory = require('./rooms/roomFactory');

/*
    Пример создания карты,
    карта состоит из комнат, каждая комната саа по себе - state,
    Как отдельного обьекта, карты не существует, она просто наследуется от какой либо комнаты,
    а также создает еще N-ое кол-во комнат и связывает, остальная магия будет происходить в комнатах
*/

function SimpleMap(game) {
    roomFactory.SimpleRoom.call(this, game, 'empty');

    var rooms_name = ['', 'tree', 'spider', 'minotaur', 'bat'];

    var rooms = [{}];
    for (var i = 1; i < 5; i++) {
        rooms[i] = new roomFactory.SimpleRoom(game, rooms_name[i]);
    }
    

    var bossRoom = new roomFactory.BossRoom(game, 'bat_boss');

    rooms[1].concat(bossRoom, "right");

    /*    1-bossroom 
          |
        4-0-2
          |
          3
    */
    this.concat(rooms[1], "up");
    this.concat(rooms[2], "right");
    this.concat(rooms[3], "down");
    this.concat(rooms[4], "left");
}

SimpleMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
SimpleMap.prototype.constructor = SimpleMap;

module.exports = SimpleMap;