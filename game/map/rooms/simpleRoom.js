'use strict';

var playersFactory = require('../../player/playersfactory');
var itemFactory = require('../../items/itemfactory')

function SimpleRoom(game, key) {
    Phaser.State.call(this, game);
    this.key = key;
    this.game = game;
    this.monsters = {
        Bee: [{x: 100, y: 100}]
    };

    this.neighbors = {
        left: null,
        up: null,
        right: null,
        down: null
    };
}

SimpleRoom.prototype = {
    create: function() {
        var game = this.game;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#ffffff';
        
        this.player = new playersFactory.StandartPlayer(game, 
                                                        game.width/2, 
                                                        game.height/2);
        game.add.existing(this.player);

        this.createDoors();
    },

    update: function() {
        this.physics.arcade.overlap(this.doors, this.player, this.changeRoom);
    },

    changeRoom: function(player, room){
        debugger;
        room.go();
    },

    concat: function(room, position){
        var invert = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up' 
        };
        this.neighbors[position] = room;
        room.neighbors[invert[position]] = this;
        if(game.state && game.state.current == this.key)
            this.createDoors();
    },

    createDoors: function()
    {
        var game = this.game;
        var doors = this.doors = game.add.group();
        var nbs = this.neighbors;
        for(var position in nbs)
            if(nbs[position] !== null){
                var door = new itemFactory.Door(game, position, nbs[position]); 
                doors.add(door);
            }
    }
};



module.exports = SimpleRoom;