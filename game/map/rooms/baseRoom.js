'use strict';

var playersFactory = require('../../player/playersfactory');
var itemFactory = require('../../items/itemfactory');
var obstacleFactory = require('../../obstacles/obstaclefactory');
var mobFactory = require('../../mobs/mobfactory');

function BaseRoom(game, key) {
    Phaser.State.call(this, game);
    this.key = key;
    this.game = game;

    this.neighbors = {
        left: null,
        up: null,
        right: null,
        down: null
    };    
}

BaseRoom.prototype = {
    /*
        Основные функции
    */
    init: function(position, player){
        position = position || 'center';
        var playerPositions = {
            center: {x: 400, y: 300},
            left:   {x: 700, y: 300},
            down:   {x: 400, y: 100},
            right:  {x: 100, y: 300},
            up:     {x: 400, y: 500}
        };
        
        var p = playerPositions[position];
        this.player = new playersFactory[player.name](this.game, p.x, p.y);
        this.player.health = player.health;
    },
    create: function() {
        var game = this.game;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#ffffff';        
        
        if(this.background)
            this.add.tileSprite(0, 0, 800, 600, this.background);

        this.mobs = game.add.group();
        this.playerSkills = game.add.group();
        this.mobsSkills = game.add.group();
        this.obstacles = game.add.group();
        this.doors = game.add.group();
        this.createDoors();
        this.createObstacles();

        game.add.existing(this.player);

        this.player.events.onCastSkill.add(this.playerCastSkill, this);
        this.player.events.onKilled.add(this.toGameOver, this);

        this.createMobs();

        this.space = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR}).space;
    },

    update: function() {
        this.physics.arcade.overlap(this.doors, this.player, this.changeRoom, null, this);
        
        this.physics.arcade.overlap(this.mobs, this.playerSkills, hit);
        this.physics.arcade.overlap(this.player, this.mobsSkills, hit);

        this.physics.arcade.collide(this.obstacles, this.player);
        this.physics.arcade.collide(this.obstacles, this.mobs);

        function hit(mob, skill){
            skill.impact(mob);
        }
        this.mobs.sort('y');
        this.debug();
    },

    shutdown: function() {
        // Save state
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

    createDoors: function(){
        var game = this.game;
        var doors = this.doors;
        var nbs = this.neighbors;

        for(var position in nbs)
            if(nbs[position] !== null){
                var door = new itemFactory.Door(game, position, nbs[position]); 
                doors.add(door);
            }
    },

    createObstacles: function(){
        var game = this.game;
        var obstacles = this.obstacles;
        var wall = null;

        wall = new obstacleFactory.Wall(game, 0, 0, 50, 600);
        obstacles.add(wall);
        wall = new obstacleFactory.Wall(game, 0, 0, 800, 50);
        obstacles.add(wall);
        wall = new obstacleFactory.Wall(game, 750, 0, 50, 600);
        obstacles.add(wall);
        wall = new obstacleFactory.Wall(game, 0, 550, 800, 50);
        obstacles.add(wall);
    },
        
    createMobs: function(){
        var game = this.game;
        var mobs = this.mobs;
        var monsters = this.monsters;

        for(var monsterName in monsters)
            for(var p in monsters[monsterName]){
                var point = monsters[monsterName][p];
               
                var mob = new mobFactory[monsterName](game, point, this.player);
                mob.events.onCastSkill.add(this.mobCastSkill, this);
               
                mobs.add(mob);
            }   
    },

    /*
        события комнаты
    */
    changeRoom: function(player, door){
        if(this.space.isDown)
            door.go(this.player);
    },

    playerCastSkill: function(skill){
        this.playerSkills.add(skill);
    },

    mobCastSkill: function(skill){
        this.mobsSkills.add(skill);
    },

    toGameOver: function(){
        this.game.state.start('gameover');
    },

    debug: function(){
        var game = this.game;
        var x = 10, y = 10;
        var st = this;

        var color = game.debug.color = 'white';
        
        game.debug.inputInfo(x, y, color);
        y += 80;
        game.debug.text(skillsInfo(), x, y, color);
        y += 18;
        game.debug.text(mobsInfo(), x, y, color);

        // game.debug.body(this.player);

        // this.mobs.forEachAlive(function(mob){
        //     game.debug.body(mob);
        // });

        // this.playerSkills.forEachAlive(function(skill){
        //     game.debug.body(skill);
        // });

        // this.mobsSkills.forEachAlive(function(skill){
        //     game.debug.body(skill);
        // });

        function skillsInfo(){
            return "player's skills: " + st.playerSkills.countLiving() + "/" +
                                         st.playerSkills.length + " " +
                    "mob's skills: " + st.mobsSkills.countLiving() + "/" +
                                         st.mobsSkills.length;
        }

        function mobsInfo(){
            return "mobs: " + st.mobs.countLiving() + "/" +
                              st.mobs.length;
        }
    }
};

module.exports = BaseRoom;