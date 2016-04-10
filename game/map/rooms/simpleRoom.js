'use strict';

var playersFactory = require('../../player/playersfactory');
var itemFactory = require('../../items/itemfactory');
var mobFactory = require('../../mobs/mobfactory');

function SimpleRoom(game, key) {
    Phaser.State.call(this, game);
    this.key = key;
    this.game = game;
    this.monsters = {
        Bee: [
            {x: 100, y: 100},
            {x: 700, y: 100},
            {x: 100, y: 500},
            {x: 700, y: 500}
        ]
    };

    this.neighbors = {
        left: null,
        up: null,
        right: null,
        down: null
    };
}

SimpleRoom.prototype = {
    init: function(position){
        position = position || 'center';
        var playerPositions = {
            center: {x: 400, y: 300},
            left: {x: 750, y: 300},
            down: {x: 400, y: 60},
            right: {x: 50, y: 300},
            up: {x: 400, y: 540}
        };
        this.playerPosition = playerPositions[position];
    },

    create: function() {
        var game = this.game;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#ffffff';
        
        this.player = new playersFactory.StandartPlayer(game,
                                                        this.playerPosition.x, 
                                                        this.playerPosition.y);
        game.add.existing(this.player);

        this.player.onCastSkill = this.onCastSkill.bind(this);

        this.mobs = game.add.group();
        this.playerSkills = game.add.group();
        this.doors = game.add.group();

        this.createDoors();
        this.createMobs();
    },

    update: function() {
        this.physics.arcade.overlap(this.doors, this.player, this.changeRoom);
        this.physics.arcade.collide(this.mobs, this.player);
        this.physics.arcade.overlap(this.mobs, this.playerSkills, hitMonster);

        function hitMonster(mob, skill){
            mob.damage(skill.power);
            skill.destroy();
        }

        this.debug();
    },

    changeRoom: function(player, room){
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
        var doors = this.doors;
        var nbs = this.neighbors;
        for(var position in nbs)
            if(nbs[position] !== null){
                var door = new itemFactory.Door(game, position, nbs[position]); 
                doors.add(door);
            }
    },

    createMobs: function(){
        var game = this.game;
        var mobs = this.mobs;
        var monsters = this.monsters;

        for(var monsterName in monsters)
            for(var p in monsters[monsterName]){
                var point = monsters[monsterName][p];
                var mob = new mobFactory[monsterName](game,point.x, point.y, this.player);
                mobs.add(mob);
            }   
    },

    onCastSkill: function(skill){
        this.playerSkills.add(skill);
    },

    debug: function(){
        var game = this.game;
        var x = 10, y = 10;
        var st = this;

        game.debug.renderShadow = false;
        
        game.debug.inputInfo(x, y, 'black');
        y += 80;
        game.debug.text(playerInfo(), x, y, 'black');
        y += 18;
        game.debug.text(skillsInfo(), x, y, 'black');
        y += 18;
        game.debug.text(mobsInfo(), x, y, 'black');

        function playerInfo(){
            return "player: " + st.player.health + "/" + 
                                st.player.maxHealth;
        }

        function skillsInfo(){
            return "player's skills: " + st.playerSkills.countLiving() + "/" +
                                         st.playerSkills.length;
        }

        function mobsInfo(){
            return "mobs: " + st.mobs.countLiving() + "/" +
                              st.mobs.length;
        }
    }
};



module.exports = SimpleRoom;