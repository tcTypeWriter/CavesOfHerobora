'use strict';

var playersFactory = require('playersfactory');
var itemFactory = require('itemfactory');
var obstacleFactory = require('obstaclefactory');
var monstersFactory = require('mobfactory');

var playerPositions = {
        center: {x: 400, y: 300},
        left:   {x: 100, y: 300},
        down:   {x: 400, y: 500},
        right:  {x: 700, y: 300},
        up:     {x: 400, y: 100}
    };

var invertPosition = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up' 
        };


function BaseRoom(game, key) {
    Phaser.State.call(this, game);
    this.key = key;
    this.game = game;

    this.model = {
        player: {
            position: 'center',
            data: {}
        },
        monsters: {},
        items: {},
        obstacles: {
            Wall: [
                {x: 0, y: 0, width: 50, height: 600},
                {x: 0, y: 0, width: 800, height: 50},
                {x: 750, y: 0, width: 50, height: 600},
                {x: 0, y: 550, width: 800, height: 50}
            ]
        }
    };
 
    this.join = {
        left: null,
        up: null,
        right: null,
        down: null
    };    
}

BaseRoom.prototype = {
    init: function(position, player_data){
        var relative_position = invertPosition[position] || 'center';
        this.model.player.data = player_data || {};
        this.model.player.data.x = undefined;
        this.model.player.data.y = undefined;
        this.model.player.position = playerPositions[relative_position];
    },

    create: function() {
        var self = this;
        var game = this.game;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        setBackground();
        setGroups();
        setItems();
        setObstacles();
        setPlayer();
        setDoors();
        setMonsters();

        this.space = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR}).space;

        function setBackground(){
            self.stage.backgroundColor = '#ffffff';        
            
            if(self.background)
                self.add.tileSprite(0, 0, 800, 600, self.background);
        }
      
        function setGroups(){
            self.monsters = game.add.group();
            self.playerSkills = game.add.group();
            self.monstersSkills = game.add.group();
            self.items = game.add.group();
            self.obstacles = game.add.group();
            self.doors = game.add.group();
        }

        function setPlayer(){
            var player_model = self.model.player, 
                position = player_model.position,
                type = player_model.data.name || 'Wizard';

            self.player = new playersFactory[type](self.game, position.x, position.y);
            
            self.player.setModel(player_model.data);

            game.add.existing(self.player);

            self.player.events.onCastSkill.add(self.playerCastSkill, self);
            self.player.events.onKilled.add(startGameOver);

            function startGameOver(){
                self.game.state.start('gameover');
            }
        }

        function setDoors(){
            var join = self.join,
                doors = self.doors,
                door = null;

            for(var position in join)
                if(join[position] !== null){
                    door = new itemFactory.Door(game, position, join[position]); 
                    doors.add(door);
                }
        }

        function setItems(){
            var items = self.items,
                model = self.model.items;

            for(var itemType in model)
                for(var i = 0; i < model[itemType].length; i++){
                    var data = model[itemType][i],
                        item = new itemFactory[itemType](game, data);
                    items.add(item);
                }
        }

        function setObstacles(){
            var obstacles = self.obstacles,
                model = self.model.obstacles;

            for(var obstacletType in model)
                for(var i = 0; i < model[obstacletType].length; i++){
                    var data = model[obstacletType][i],
                        wall = new obstacleFactory[obstacletType](game, data.x, data.y, 
                                                                        data.width, data.height);
                    obstacles.add(wall);
                }
        }

        function setMonsters(){
            var monsters = self.monsters, 
                model = self.model.monsters;

            for(var monsterType in model)
                for(var i = 0; i < model[monsterType].length; i++){
                    var monsterModel = model[monsterType][i],
                        monster = new monstersFactory[monsterType](game, monsterModel, self.player);

                    monster.setModel(monsterModel);
                    monster.events.onCastSkill.add(monsterCastSkill);
                    monsters.add(monster);
            }

            function monsterCastSkill(skill){
                self.monstersSkills.add(skill);
            }      
        }
    },

    update: function() {
        var space = this.space,
            arcade = this.physics.arcade,
            overlap = this.physics.arcade.overlap.bind(arcade),
            collide = this.physics.arcade.collide.bind(arcade);

        overlap(this.player, this.doors, changeRoom);
        overlap(this.player, this.items, getItem);

        overlap(this.monsters, this.playerSkills, hit);
        overlap(this.player, this.monstersSkills, hit);

        collide(this.obstacles, this.player);
        collide(this.obstacles, this.monsters);
        
        this.monsters.sort('y');
        this.debug(true);

        function hit(monster, skill){
            skill.impact(monster);
        }

        function getItem(player, item){
            player.getItem(item);
        }

        function changeRoom(player, door){
            if(space.isDown)
                door.go(player.getModel());
        }
    },

    shutdown: function() {
        var self = this;

        self.model.monsters = {};

        saveModel('monsters');
        saveModel('items');

        function saveModel(type){
            self.model[type] = {};
            self[type].forEachAlive(function(entity){
                var  name = entity.Name,
                     entities = self.model[type][name] || [];

                entities.push(entity.getModel());
                self.model[type][name] = entities;
            });
        }
    },

    concat: function(room, position){
        var arcPosition = invertPosition[position];
        
        this.join[position] = room;
        room.join[arcPosition] = this;
    },

    playerCastSkill: function(skill){
        var skillEvent = {
            onCastSkill: this.playerCastSkill,
            onCastItem: this.castItem,
            onCastMonster: this.onCastMonster
        };

        for(var event in skillEvent)
            if(skill.events[event])
                skill.events[event].add(skillEvent[event], this);

        this.playerSkills.add(skill);
    },

    monsterCastSkill: function(skill){
        var skillEvent = {
            onCastSkill: this.monsterCastSkill,
            onCastItem: this.castItem,
            onCastMonster: this.onCastMonster
        };

        for(var event in skillEvent)
            if(skill.events[event])
                skill.events[event].add(skillEvent[event], this);

        this.monstersSkills.add(skill);
    },

    debug: function(fisics){
        var game = this.game;
        var x = 10, y = 10;
        var st = this;

        fisics = fisics || false;
        var color = game.debug.color = 'white';
        
        game.debug.inputInfo(x, y, color);
        y += 80;
        game.debug.text(skillsInfo(), x, y, color);
        y += 18;
        game.debug.text(mobsInfo(), x, y, color);

        if(fisics){
            game.debug.body(this.player);

            this.items.forEachAlive(function(item){
                game.debug.body(item);
            });

            this.obstacles.forEachAlive(function(obstacle){
                game.debug.body(obstacle);
            });

            this.monsters.forEachAlive(function(mob){
                game.debug.body(mob);
            });

            this.playerSkills.forEachAlive(function(skill){
                game.debug.body(skill);
            });

            this.monstersSkills.forEachAlive(function(skill){
                game.debug.body(skill);
            });
        }

        function skillsInfo(){
            return "player's skills: " + st.playerSkills.countLiving() + "/" +
                                         st.playerSkills.length + " " +
                    "monsters's skills: " + st.monstersSkills.countLiving() + "/" +
                                         st.monstersSkills.length;
        }

        function mobsInfo(){
            return "monsters: " + st.monsters.countLiving() + "/" +
                                  st.monsters.length;
        }
    }
};

module.exports = BaseRoom;