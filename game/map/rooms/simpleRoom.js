'use strict';

var BaseRoom = require('./baseroom');
var roomData = require('./roomData');

function SimpleRoom(game, key) {
    BaseRoom.call(this, game, key);
    var data = roomData[key],
        self = this;

    this.model.monsters = data.monsters || this.model.monsters;
    this.model.items = data.items || this.model.items;
    this.model.prize = data.prize || this.model.prize;

    if(data.obstacles){
        addObstacles(data.obstacles);
    }
    
    this.background = data.background || 'brick2';

    function addObstacles(obstacles){
        for(var type in obstacles){
            var model = self.model.obstacles[type] || [],
                add = obstacles[type];
            
            for(var  i = 0; i < add.length; i++)
                model.push(add[i]);

            self.model.obstacles[type] = model;
        }
    }
}

SimpleRoom.prototype = Object.create(BaseRoom.prototype);
SimpleRoom.prototype.constructor = SimpleRoom;

module.exports = SimpleRoom;