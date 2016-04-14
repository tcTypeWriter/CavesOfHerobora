'use strict';

var BaseRoom = require('./baseroom');

function SimpleRoom(game, key) {
    BaseRoom.call(this, game, key);
    this.monsters = {
        Bat: [
            {x: 100, y: 100},
            {x: 650, y: 100},
            {x: 100, y: 450},
            {x: 650, y: 450}
        ]
    };
    this.background = 'brick2';
}

SimpleRoom.prototype = Object.create(BaseRoom.prototype);
SimpleRoom.prototype.constructor = SimpleRoom;

module.exports = SimpleRoom;