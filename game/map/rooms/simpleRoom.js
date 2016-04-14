'use strict';

var BaseRoom = require('./baseroom');

function SimpleRoom(game, key) {
    BaseRoom.call(this, game, key);
    this.monsters = {
        Bat: [
            {x: 100, y: 100},
            {x: 700, y: 100},
            {x: 100, y: 500},
            {x: 700, y: 500}
        ]
    };
    this.background = 'brick2';
}

SimpleRoom.prototype = Object.create(BaseRoom.prototype);
SimpleRoom.prototype.constructor = SimpleRoom;

module.exports = SimpleRoom;