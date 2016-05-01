'use strict';

var BaseRoom = require('./baseroom');

function SimpleRoom(game, key) {
    BaseRoom.call(this, game, key);
    this.model.monsters = {
        Bat: [
            {x: 100, y: 100},
        ],
        Tree: [
            {x:100, y: 300}
        ],
        Stump: [
            {x: 400, y: 400}
        ]
    };

    this.model.items = {
        HealthPotion: [
            {x: 400, y: 400}
        ]
    };

    this.background = 'brick2';
}

SimpleRoom.prototype = Object.create(BaseRoom.prototype);
SimpleRoom.prototype.constructor = SimpleRoom;

module.exports = SimpleRoom;