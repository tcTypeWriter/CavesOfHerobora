'use strict';

var BaseRoom = require('./baseroom');
var roomData = require('./roomData');

function SimpleRoom(game, key) {
    BaseRoom.call(this, game, key);
    var data = roomData[key];

    this.model.monsters = data.monsters || this.model.monsters;
    this.model.items = data.items || this.model.items;

    if(key === 'empty'){
        this.model.obstacles.Wall.push({x:100, y:100, width:80, height:80});
    }
    
    this.background = 'brick2';
}

SimpleRoom.prototype = Object.create(BaseRoom.prototype);
SimpleRoom.prototype.constructor = SimpleRoom;

module.exports = SimpleRoom;