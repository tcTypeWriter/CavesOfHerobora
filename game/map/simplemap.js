'use strict';

var roomFactory = require('./rooms/roomFactory');

/*
    Пример создания карты,
    карта состоит из комнат, каждая комната саа по себе - state,
    Как отдельного обьекта, карты не существует, она просто наследуется от какой либо комнаты,
    а также создает еще N-ое кол-во комнат и связывает, остальная магия будет происходить в комнатах
*/

function SimpleMap(game) {
    roomFactory.SimpleRoom.call(this, game);
    this.key = "play";

    var rooms = [{}];
    for (var i = 1; i < 5; i++) {
        var key = "room_" + i;
        rooms[i] = new roomFactory.SimpleRoom(game, key);
        game.state.add(key, rooms[i]);
    }
    
    /*    3 
          |
        1-0-2
          |
          4
    */
    this.concat(rooms[1], "left");
    this.concat(rooms[2], "right");
    this.concat(rooms[3], "up");
    this.concat(rooms[4], "down");
}

SimpleMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
SimpleMap.prototype.constructor = SimpleMap;

module.exports = SimpleMap;