/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	document.oncontextmenu = function (){
	    return false;
	};

	var Book = __webpack_require__(1);
	var Game = __webpack_require__(6);

	var game_module = angular.module('game', []);

	game_module.controller('Book', Book);

	game_module.controller('bookButtonsController', ['$scope', '$rootScope', function($scope, $rootScope){


	    $scope.open = function(chapter){
	        var game = Game();
	        if($rootScope.chapter === chapter){
	            $rootScope.chapter = undefined;
	            game.paused = false;
	            return;
	        }

	        $rootScope.chapter = chapter;
	        game.paused = true;
	    };

	}]);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var items = __webpack_require__(2);
	var skills = __webpack_require__(3);
	var obstacles = __webpack_require__(4);
	var monsters = __webpack_require__(5);

	hide(items);
	hide(skills);
	hide(obstacles);
	hide(monsters);

	var book;

	function Book() {
	    this.items = items;
	    this.skills = skills;
	    this.obstacles = obstacles;
	    this.monsters = monsters;
	    book = this;
	}


	function hide(arr){
	    for(var key in arr)
	        if(!arr[key].show)
	            arr[key].show = false;
	}

	Book.show = function(type, name){
	    if(book[type] && book[type][name])
	        book[type][name].show = true;
	};

	module.exports = Book;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"HealthPotion": {
			"name": "Зелье лечения",
			"img": "assets/hpPotion.png",
			"description": "Восстанавливает 3 единицы здоровья",
			"show": true
		},
		"Steel Sword": {
			"name": "Стальной меч",
			"img": "assets/sword.png",
			"description": "Одноручный клинок из стали, наносящий 2 единицы урона"
		},
		"SpeedPotion": {
			"name": "Зелье повышения скорости",
			"img": "assets/speedPotion.png",
			"description": "Увеличивает скорость передвижения персонажа на 10%",
			"show": true
		},
		"СalldownPotion": {
			"name": "Зелье ускорения заклинаний",
			"img": "assets/cdPotion.png",
			"description": "Сокращает время восстановления заклинаний на 10%",
			"show": true
		},
		"Coin": {
			"name": "Монетка",
			"img": "assets/Coin.png",
			"description": "Единица валюты Лиги Гильдий Магов. Возможны переводы телепортом с небольшой комиссией.",
			"show": true
		},
		"Roll": {
			"name": "Свиток",
			"img": "assets/roll.png",
			"description": "Свитки-большие листы пергамента, пустые или же с написанным на них текстом. Любому путшественнику не стоит ими пренебрегать, ох не стоит ...",
			"show": true
		},
		"storeRoll": {
			"name": "Свиток торговли",
			"img": "assets/roll.png",
			"description": "Свитки торговли - отнсительно недавнее изобретние Гильдий, дающее доступ к широкому спектру пособий по магиии и различным предметам, если имеешь достаточно денежек ...",
			"show": true
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"Fireball": {
			"name": "Огненый шар",
			"description": "Одно из базовых заклинаний стихии Огня, наносящее 1 единицу урона"
		},
		"Firework": {
			"name": "Фейерверк",
			"description": "Мощное заклинание стихии Огня, сгусток рвущего пламени, разделяющийся на множество огненных шаров"
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"Wall": {
			"name": "Стена",
			"description": "Обычная стена, не претендующая на уникальность"
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"Bat": {
			"name": "Летучая мышь",
			"img": "assets/monsters/bat.png",
			"description": "Изменившаяся под воздействием магии летучая мышь, обитающая в Забытых Пещерах. Махает бля крыльями "
		},
		"Tree": {
			"name": "Дерево",
			"img": "assets/monsters/oak_title.png",
			"description": "Могучий Йободуб или Энт-Пинала- существо огромной силы и стойкости и на данный момент вообще самый мощный парень в Пещерах Хероборы епт"
		},
		"Spider": {
			"name": "Паук",
			"img": "assets/monsters/spider.png",
			"description": "Быстрый и юркий пещерный паук, двигается как клубный парень и порой кусается ту-ту-туц-ту-туу "
		},
		"Stump": {
			"name": "Пень",
			"img": "assets/monsters/stump.png",
			"description": "Наделённый подобием воли древесный голем, призываемый Йободубом там для массового насилия например, но могут и понтовать сами, сбиваясь в группировки или кружки "
		},
		"Minotaurus": {
			"name": "Минотавр",
			"img": "assets/monsters/minotaur.png",
			"description": "Минотавры-разумные, но гневливые  существа, живущие в племенах и чувствующие запертую в вещах магическую силу. Поэтому их нередко можно найти неподалёку от спрятанных колдовских сокровищ... Или они вам врежут"
		},
		"Death": {
			"name": "Смерть",
			"img": "assets/monsters/death.png",
			"description": "Дух смерти, блуждающий по Затерянным пещерам. Весьма уважаемый в арестантской среде нежити персонаж, но живёт не по понятиям, отчего считается фраером у некоторых умертвий"
		},
		"Skeleton": {
			"name": "Поднятый скелет",
			"img": "assets/monsters/armedSkeleton.png",
			"description": "Скелет-прислужник, возвращенный к не-жизни чьей-то волей. Как и пни, обычно работают братвой, однако придерживаются склетского закона и чушкана за комнату чуют, отвечаю ! "
		},
		"SkeletonKing": {
			"name": "Скелет-король",
			"img": "assets/monsters/skeletonKing.png",
			"description": "Короли-умертвия, скелеты-короли, младши личи - личности блатные и опасные. Ходят со свитой из шестёр и без базара любого на перо возьмут. И кости воспарят над нашей зоной...  "
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BootState = __webpack_require__(7);  
	var PreloadState = __webpack_require__(8);
	var ChoosePlayer = __webpack_require__(9);
	var GameOver = __webpack_require__(10);  

	var mapFactory = __webpack_require__(11);
	var game;

	window.onload = function () {
	    game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
	    
	    game.state.add('boot', BootState);
	    game.state.add('gameover', GameOver);
	    game.state.add('chooseplayer', ChoosePlayer);
	    game.state.add('start', mapFactory.DemoMap);
	    game.state.add('preload', PreloadState);  
	      
	    game.state.start('boot');
	};

	module.exports = function () {
	    return game;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function Boot() {}

	/* Загрузка картинки для загрузчика */

	Boot.prototype = {
	    preload: function() {
	        this.load.image('preloader', 'assets/preloader.gif');
	    },
	    create: function() {
	        this.game.input.maxPointers = 1;
	        this.game.state.start('preload');
	    }
	};

	module.exports = Boot;


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	function Preload() {
	    this.asset = null;
	    this.ready = false;
	}

	Preload.prototype = {
	    preload: function() {
	        var load = this.load;

	        this.asset = this.add.sprite(800/2,600/2, 'preloader');
	        this.asset.anchor.setTo(0.5, 0.5);
	        
	        load.setPreloadSprite(this.asset);
	        load.onLoadComplete.add(this.onLoadComplete, this);
	        
	        loadBackgroundAssets();
	        loadPlayersAssets();
	        loadMonstersAssets();
	        loadSkillsAssets();
	        loadItemsAssets();
	        loadObstaclesAssets();
	        loadInterfaceAssets();

	        function loadBackgroundAssets(){
	            load.image('floor', 'assets/dungeon_sheet-1-1.png');            
	        }

	        function loadPlayersAssets(){
	            load.image('wizard', 'assets/heroleft.png');
	            load.image('warrior', 'assets/heroleft2.png');    
	        }

	        function loadMonstersAssets(){
	            load.image('bat', 'assets/monsters/bat.png');
	            load.spritesheet('tree', 'assets/monsters/oak.png', 168, 168);
	            load.image('stump', 'assets/monsters/stump.png');                
	            load.image('spider', 'assets/monsters/spider.png');    
	            load.image('minotaur', 'assets/monsters/minotaur.png');   
	            load.image('death', 'assets/monsters/death.png'); 
	            load.image('skeletonKing', 'assets/monsters/skeletonKing.png');
	            load.image('skeleton', 'assets/monsters/armedSkeleton.png');             
	        }

	        function loadSkillsAssets(){
	            load.image('fireball', 'assets/fireball.png');
	            load.image('sword', 'assets/sword.png');
	            load.image('bolt', 'assets/fierball.png');
	            load.image('cobble', 'assets/bril.png'); 
	            load.image('deathball', 'assets/deathball.png');
	            load.image('light', 'assets/light.png');            
	            load.image('branch', 'assets/monsters/branch.png');
	            load.image('branch2', 'assets/monsters/branch_2.png');
	        }

	        function loadItemsAssets(){
	            load.image('door', 'assets/openDoor.png');
	            load.image('closedDoor', 'assets/closedDoor.png');
	            load.image('healthPotion', 'assets/hpPotion.png'); 
	            load.image('speedPotion', 'assets/speedPotion.png'); 
	            load.image('calldownPotion', 'assets/cdPotion.png');  
	            load.image('roll', 'assets/roll.png');   
	            load.image('coin', 'assets/Coin.png'); 
	            load.image('helm', 'assets/helm.png');            
	        }

	        function loadObstaclesAssets(){
	            load.image('startup', 'assets/startRoom.png');
	            load.image('brick', 'assets/brick.png');
	            load.image('brick1', 'assets/brick1.png');
	            load.image('brick2', 'assets/brick2.png');            
	        }

	        function loadInterfaceAssets(){
	            load.image('hp', 'assets/hp.png');
	            load.image('hpBar', 'assets/hpBar.png');
	        }
	    },

	    create: function() {
	        this.asset.cropEnabled = false;
	    },

	    update: function() {
	        if(!!this.ready) {
	            this.game.state.start('start');
	        }
	    },

	    onLoadComplete: function() {
	        this.ready = true;
	    }
	};

	module.exports = Preload;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	function ChoosePlayer() {}

	ChoosePlayer.prototype = {
	    create: function () {
	        this.stage.backgroundColor = '#ffffff';  

	        var style = { font: '30px Arial', fill: '#000', align: 'center'};

	        this.choose = this.game.add.text(this.game.world.centerX, 50, 'Choose player:', style);
	        this.choose.anchor.setTo(0.5, 0.5);

	        this.warrior = this.game.add.text(270, 430, '[A] - Warrior', style);
	        this.warrior.anchor.setTo(0.5, 0.5);
	        this.wizard = this.game.add.text(500, 430, '[D] - Wizard', style);
	        this.wizard.anchor.setTo(0.5, 0.5);

	        this.game.add.sprite(200, 180, 'warrior');
	        this.game.add.sprite(400, 200, 'wizard').scale.setTo(1.1, 1.1);

	        this.keys =  this.space = this.game.input.keyboard.addKeys({
	                                            a: Phaser.Keyboard.A,
	                                            d: Phaser.Keyboard.D
	                                            });
	        this.player = null;
	      },
	    update: function () {
	        // var keys = this.keys;
	        // if(keys.a.isDown)
	        //     this.player = new playersFactory.Warrior(this.game, 0, 0);
	        // if(keys.d.isDown)
	        //     this.player = new playersFactory.Wizard(this.game, 0, 0);

	        // if(this.player) {
	        //     this.game.state.start('play', true, false, 'center', this.player);
	        // }
	    }
	};

	module.exports = ChoosePlayer;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function GameOver() {}

	var mapFactory = __webpack_require__(11);

	GameOver.prototype = {
	    create: function () {
	        var style = { font: '65px Arial', fill: '#000', align: 'center'};

	        this.titleText = this.game.add.text(this.game.world.centerX, 200, 'Game Over!', style);
	        this.titleText.anchor.setTo(0.5, 0.5);

	        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 
	                                                 'Click To Play Again', style);
	        this.instructionText.anchor.setTo(0.5, 0.5);
	      },
	    update: function () {
	        if(this.game.input.activePointer.justPressed()) {
	            this.game.state.add('start', mapFactory.DemoMap);
	            this.game.state.start('start');
	        }
	    }
	};

	module.exports = GameOver;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SimpleMap = __webpack_require__(12);

	module.exports = {
	    SimpleMap: SimpleMap,
	    DemoMap: __webpack_require__(83)
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var roomFactory = __webpack_require__(13);

	/*
	    Пример создания карты,
	    карта состоит из комнат, каждая комната саа по себе - state,
	    Как отдельного обьекта, карты не существует, она просто наследуется от какой либо комнаты,
	    а также создает еще N-ое кол-во комнат и связывает, остальная магия будет происходить в комнатах
	*/

	function SimpleMap(game) {
	    roomFactory.SimpleRoom.call(this, game, 'empty');

	    var rooms_name = ['', 'tree', 'spider', 'minotaur', 'bat' , 'death'];

	    var rooms = [{}];
	    for (var i = 1; i < 6; i++) {
	        rooms[i] = new roomFactory.SimpleRoom(game, rooms_name[i]);
	    }
	    

	    var bossRoom = new roomFactory.BossRoom(game, 'bat_boss');

	    rooms[1].concat(bossRoom, "right");

	    /*    1-bossroom 
	          |
	        4-0-2
	        | |
	        5 3
	    */
	    this.concat(rooms[1], "up");
	    this.concat(rooms[2], "right");
	    this.concat(rooms[3], "down");
	    this.concat(rooms[4], "left");
	    rooms[4].concat(rooms[5], "down");
	}

	SimpleMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
	SimpleMap.prototype.constructor = SimpleMap;

	module.exports = SimpleMap;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SimpleRoom = __webpack_require__(14);
	var BossRoom = __webpack_require__(82);

	module.exports = {
	    SimpleRoom: SimpleRoom,
	    BossRoom: BossRoom
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseRoom = __webpack_require__(15);
	var roomData = __webpack_require__(63);

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var playersFactory = __webpack_require__(16);
	var itemFactory = __webpack_require__(42);
	var obstacleFactory = __webpack_require__(53);
	var monstersFactory = __webpack_require__(55);

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

	    game.state.add(key, this);

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

	        this.space = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR}).space;

	        this.physics.startSystem(Phaser.Physics.ARCADE);

	        setBackground();
	        setGroups();
	        setItems();
	        setObstacles();
	        setPlayer();
	        setDoors();
	        setMonsters();

	        self.doors.forEachAlive(function(door){
	                door.close(condition);
	            });

	        function condition(){
	            return self.monsters.countLiving() === 0;
	        }

	        function setBackground(){
	            self.stage.backgroundColor = '#ffffff';        
	            
	            if(self.background)
	                self.add.tileSprite(50, 50, 800, 600, self.background);
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

	                    item.setModel(data);
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
	                    monster.events.onCastSkill.add(self.monsterCastSkill, self);
	                    monsters.add(monster);

	                    self.addingMonster(monster, monsterModel);
	            }      
	        }
	    },

	    addingMonster: function(monster, monsterModel){},

	    update: function() {
	        var self = this,
	            game = this.game,
	            arcade = this.physics.arcade,
	            overlap = this.physics.arcade.overlap.bind(arcade),
	            collide = this.physics.arcade.collide.bind(arcade);

	        overlap(this.player, this.doors, this.changeRoom, null,  this);
	        overlap(this.player, this.items, getItem);

	        overlap(this.monsters, this.playerSkills, hit);
	        overlap(this.player, this.monstersSkills, hit);

	        collide(this.obstacles, this.player);
	        collide(this.obstacles, this.monsters);
	        collide(this.monsters, this.monsters);
	        collide(this.obstacles, this.monstersSkills, hitObstacle);
	        collide(this.obstacles, this.playerSkills, hitObstacle);
	        
	        this.monsters.sort('y');
	        this.debug();

	        if(self.monsters.countLiving() === 0)
	            setPrize();

	        function hit(monster, skill){
	            skill.impact(monster);
	        }

	        function hitObstacle(obstacle, skill){
	            //Фигачим мертвый спрайт, который примет урон
	            var fool = new Phaser.Sprite(game, 0, 0, 'light');
	            skill.impact(fool);
	        }

	        function getItem(player, item){
	            player.getItem(item);
	        }

	        function setPrize(){
	            var items = self.items,
	                model = self.model.prize;

	            for(var itemType in model)
	                for(var i = 0; i < model[itemType].length; i++){
	                    var data = model[itemType][i],
	                        item = new itemFactory[itemType](game, data);

	                    item.setModel(data);
	                    items.add(item);
	                }
	            self.model.prize = {};
	        }
	    },

	    changeRoom: function(player, door){
	        door.go(player.getModel());
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

	    onCastMonster: function(monster) {
	        monster.events.onCastSkill.add(this.monsterCastSkill, this);
	        this.monsters.add(monster);
	    },

	    debug: function(fisics, debug){
	        var game = this.game;
	        var x = 10, y = 10;
	        var st = this;

	        fisics = fisics || false;
	        var color = game.debug.color = 'white';
	        
	        if(debug){
	            game.debug.inputInfo(x, y, color);
	            y += 80;
	            game.debug.text(skillsInfo(), x, y, color);
	            y += 18;
	        }
	    
	        game.debug.text(mobsInfo(), 650, 30, color);
	        
	        this.additionalDebug(y + 18);

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
	    },
	    additionalDebug: function(y){}
	};

	module.exports = BaseRoom;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Wizard = __webpack_require__(17);
	var Warrior = __webpack_require__(41);

	module.exports = {
	    Wizard: Wizard,
	    Warrior: Warrior
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var skillFactory = __webpack_require__(18);
	var BasePlayer = __webpack_require__(40);

	function Wizard(game, x, y) {
	    BasePlayer.call(this, game, x, y, 'wizard');
	    
	    this.state.name = 'Wizard';

	    var Fireball = skillFactory.createSkill('Fireball', game);
	  
	    this.skill = Fireball;
	    this.skillSet = [ Fireball ];
	}

	Wizard.prototype = Object.create(BasePlayer.prototype);
	Wizard.prototype.constructor = Wizard;

	module.exports = Wizard;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Fireball = __webpack_require__(19);
	var Bolt = __webpack_require__(21);
	var Cobble = __webpack_require__(22);
	var Bite = __webpack_require__(23);
	var Fireworks = __webpack_require__(24);
	var Deathball = __webpack_require__(25);
	var Yapona_mat = __webpack_require__(26);
	var Branch = __webpack_require__(27)

	var SkeletonSpawn = __webpack_require__(28);
	var SkeletonBall = __webpack_require__(32);
	var Reincarnation = __webpack_require__(33);
	var LifeSucking = __webpack_require__(35);

	var Sword = __webpack_require__(36);

	var Natures_call = __webpack_require__(37);

	var Branch_spawn = __webpack_require__(39);

	var e = module.exports;

	e.Branch = Branch;
	e.Fireball = Fireball;
	e.Bolt = Bolt;
	e.Cobble = Cobble;
	e.Bite = Bite;
	e.Fireworks = Fireworks;
	e.Deathball = Deathball;
	e.Yapona_mat = Yapona_mat;
	e.SkeletonSpawn = SkeletonSpawn;
	e.SkeletonBall = SkeletonBall;
	e.Reincarnation = Reincarnation;
	e.LifeSucking = LifeSucking;

	e.Sword = Sword;

	e.Natures_call = Natures_call;

	e.Branch_spawn = Branch_spawn;

	e.createSkill = function(skillName, game){
	    var skill = e[skillName];

	    var lastTime = 0,
	        timeout = skill.prototype.timeout;

	    var result = function (_game, _from, _to) {
	        lastTime = game.time.now;
	        return new skill(_game, _from, _to);
	    };

	    result.ready = function () {
	        return lastTime + timeout < game.time.now;
	    };

	    result.calldown = function () {
	        var now = game.time.now;
	        return lastTime + timeout > now ? lastTime + timeout - now : "Ready";
	    };

	    result.reduce = function (percent) {
	        timeout *= (100 - percent) / 100;
	        timeout = Math.round(timeout);
	    };

	    result.Name = skillName;

	    return result;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 800;
	var power = 1;

	function Fireball(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'fireball');
	    this.scale.setTo(0.06, 0.06);
	    game.physics.arcade.moveToObject(this, to, speed);

	    this.body.rotation = game.physics.arcade.angleBetween(this, to);
	    
	    this.power = power;
	}

	Fireball.prototype = Object.create(BaseSkill.prototype);
	Fireball.prototype.constructor = Fireball;

	Fireball.prototype.impact = function(mob){
	    mob.damage(this.power);
	    this.kill();
	};


	Fireball.prototype.timeout = 500;
	module.exports = Fireball;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	function BaseSkill(game, from, to, key) {
	    Phaser.Sprite.call(this, game, from.x, from.y, key);
	    
	    this.game = game;
	    this.checkWorldBounds = true;
	    this.outOfBoundsKill = true;
	    this.events.onKilled.add(this.destroy, this);

	    game.physics.arcade.enable(this);
	}

	BaseSkill.prototype = Object.create(Phaser.Sprite.prototype);
	BaseSkill.prototype.constructor = BaseSkill;

	BaseSkill.prototype.impact = function(mob){}

	BaseSkill.prototype.timeout = 1000;

	module.exports = BaseSkill;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 200;
	var power = 1;
	var timeOfLive = 1000;

	function Bolt(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'bolt');
	    this.scale.setTo(0.3, 0.3);

	    game.physics.arcade.moveToObject(this, to, speed);
	    this.rotation = game.physics.arcade.angleBetween(this, to);
	    
	    this.power = power;
	    game.time.events.add(timeOfLive, this.destroy, this);
	}

	Bolt.prototype = Object.create(BaseSkill.prototype);
	Bolt.prototype.constructor = Bolt;

	Bolt.prototype.impact = function(mob){
	    mob.damage(this.power);
	    this.kill();
	}


	module.exports = Bolt;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 300;
	var power = 0;
	var timeOfLive = 1000;

	function Cobble(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'cobble');
	    this.scale.setTo(0.4, 0.4);

	    game.physics.arcade.moveToObject(this, to, speed);
	   
	    this.body.mass = 100;

	    this.power = power;
	    game.time.events.add(timeOfLive, this.destroy, this);
	}

	Cobble.prototype = Object.create(BaseSkill.prototype);
	Cobble.prototype.constructor = Cobble;  

	Cobble.prototype.timeout = 5000;

	Cobble.prototype.impact = function(mob){
	    this.game.physics.arcade.collide(this, mob);
	}

	module.exports = Cobble;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 1000;
	var power = 1;
	var timeOfLive = 50;

	function Bite(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'bite');
	    this.scale.setTo(0, 0);

	    game.physics.arcade.moveToObject(this, to, speed);
	    
	    this.power = power;
	    game.time.events.add(timeOfLive, this.destroy, this);
	}

	Bite.prototype = Object.create(BaseSkill.prototype);
	Bite.prototype.constructor = Bite;

	Bite.prototype.impact = function(mob){
	    mob.damage(this.power);
	    this.kill();
	};

	Bite.prototype.timeout = 500;
	module.exports = Bite;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 600;
	var power = 1;

	var numberOfFireballs = 8;

	function Fireworks(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'fireball');
	    this.scale.setTo(0.06, 0.06);
	    game.physics.arcade.moveToObject(this, to, speed);

	    this.body.rotation = game.physics.arcade.angleBetween(this, to);
	    
	    this.power = power;
	    this.goal = to;

	    this.events.onCastSkill = new Phaser.Signal();
	}

	Fireworks.prototype = Object.create(BaseSkill.prototype);
	Fireworks.prototype.constructor = Fireworks;

	Fireworks.prototype.update = function() {
	    var isClose = this.game.physics.arcade.distanceToXY(this.goal, this.x, this.y) < 20;

	    if(!isClose || this.run) return;
	    this.boom();
	};

	Fireworks.prototype.impact = function(){
	    this.goal = { 
	        x: this.x - 0.09*this.body.velocity.x,
	        y: this.y - 0.09*this.body.velocity.y        
	    };
	    this.boom();
	};

	Fireworks.prototype.boom = function(){
	    this.run = true;

	    var self = this;
	    var game = self.game;

	    var dfi = 2*Math.PI / numberOfFireballs;
	    var startAngle = 0;

	    this.game.time.events.add(100, wave);
	    this.game.time.events.add(200, wave);
	    this.game.time.events.add(300, wave);
	    this.kill();

	    function wave(){
	        for(var i = startAngle; i <  2*Math.PI + startAngle; i += dfi){
	            var to = {
	                    x: self.goal.x + 20*Math.cos(i),
	                    y: self.goal.y + 20*Math.sin(i)
	                };
	            var fireball = new Fire(game, self.goal, to, self.power);
	            self.events.onCastSkill.dispatch(fireball);
	        }    
	        startAngle += dfi / 2;
	    } 
	};


	Fireworks.prototype.timeout = 1000;
	module.exports = Fireworks;


	function Fire(game, from, to, power) {
	    BaseSkill.call(this, game, from, to, 'fireball');
	    this.scale.setTo(0.06, 0.06);
	    
	    game.physics.arcade.moveToObject(this, to, 200);
	    this.body.angularVelocity = 200 + Math.random() * 500;

	    game.time.events.add(300, this.destroy, this);

	    this.power = power || 1;
	}

	Fire.prototype = Object.create(BaseSkill.prototype);
	Fire.prototype.constructor = Fire;

	Fire.prototype.impact = function(mob){
	    mob.damage(this.power);
	    this.kill();
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20);

	var speed = 250;
	var power = 1;
	var time = 10000;

	function Deathball(game, from, to) {
	    this.target = to;

	    BaseSkill.call(this, game, from, to, 'deathball');
	    this.scale.setTo(0.15, 0.15);
	    game.physics.arcade.moveToObject(this, this.target, speed);

	    this.power = power;
	    game.time.events.add(time, this.destroy, this);
	}

	Deathball.prototype = Object.create(BaseSkill.prototype);
	Deathball.prototype.constructor = Deathball;

	Deathball.prototype.impact = function (mob) {
	    mob.damage(mob.health);
	    this.kill();
	};

	Deathball.prototype.update = function () {
	    var vector = {
	        x: this.target.x - this.x,
	        y: this.target.y - this.y,
	    };
	    vector = normalise(vector);
	    this.body.velocity.setTo(vector.x * speed, vector.y * speed);
	    this.rotation = this.game.physics.arcade.angleBetween(this, this.target);
	};

	function normalise(vector) {
	    var inversion = 1 / Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	    return {
	        x: vector.x * inversion,
	        y: vector.y * inversion
	    };
	}

	Deathball.prototype.timeout = time;
	module.exports = Deathball;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 600;
	var power = 1;
	var timeOfLive = 1000;

	function Yapona_mat(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'bolt');
	    this.scale.setTo(0.3, 0.3);

	    game.physics.arcade.moveToObject(this, to, speed);
	    this.rotation = game.physics.arcade.angleBetween(this, to);
	    
	    this.power = power;
	    game.time.events.add(timeOfLive, this.destroy, this);
	}

	Yapona_mat.prototype = Object.create(BaseSkill.prototype);
	Yapona_mat.prototype.constructor = Yapona_mat;

	Yapona_mat.prototype.impact = function(mob){
	    mob.damage(this.power);
	    this.kill();
	}

	Yapona_mat.prototype.timeout = 50;
	module.exports = Yapona_mat;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 300;
	var power = 1;

	function Branch(game, from, to, sprite) {
	    BaseSkill.call(this, game, from, to, sprite || 'branch');
	    game.physics.arcade.moveToObject(this, to, speed);
	    this.scale.setTo(0.6, 0.6);

	    this.body.rotation = game.physics.arcade.angleBetween(this, to);
	    this.body.collideWorldBounds = true;
	    this.body.bounce.setTo(1, 1);
	    this.power = power;
	}

	Branch.prototype = Object.create(BaseSkill.prototype);
	Branch.prototype.constructor = Branch;

	Branch.prototype.impact = function(mob){
	    mob.damage(this.power);
	};


	Branch.prototype.timeout = 500;
	module.exports = Branch;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20);
	var Skeleton = __webpack_require__(29);

	function SkeletonSpawn(game, position, player) {
	    BaseSkill.call(this, game, position, player, 'light');

	    this.scale.setTo(0, 0);

	    this.position = position;
	    this.player = player;

	    this.events.onCastMonster = new Phaser.Signal();
	    this.skeleton = new Skeleton(this.game, this.position, this.player);
	}

	SkeletonSpawn.prototype = Object.create(BaseSkill.prototype);
	SkeletonSpawn.prototype.constructor = SkeletonSpawn;

	SkeletonSpawn.prototype.update = function () {
	    this.events.onCastMonster.dispatch(this.skeleton);
	    this.kill();
	};

	SkeletonSpawn.prototype.timeout = 5000;
	module.exports = SkeletonSpawn;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 100;

	var skillFactory = __webpack_require__(18);
	var BaseMonster = __webpack_require__(30);

	function Skeleton(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'skeleton');
	    this.scale.setTo(0.3, 0.3);

	    this.health = this.maxHealth = 3;
	}

	Skeleton.prototype = Object.create(BaseMonster.prototype);
	Skeleton.prototype.constructor = Skeleton;
	Skeleton.prototype.Name = "Skeleton";

	Skeleton.prototype.update = function () {
	    if (!this.alive) return;

	    if (this.physics.distanceToXY(this.player, this.x, this.y) > 50)
	        this.physics.moveToObject(this, this.player, 100);
	    else {
	        this.player.damage(1);
	        this.body.velocity.setTo(0, 0);
	    }
	};

	module.exports = Skeleton;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Creature = __webpack_require__(31);

	function BaseMonster(game, point, player, sprite_key) {
	    Creature.call(this, game, point.x, point.y, sprite_key);
	    
	    this.physics = game.physics.arcade;
	    this.player = player;
	}

	BaseMonster.prototype = Object.create(Creature.prototype);
	BaseMonster.prototype.constructor = BaseMonster;

	module.exports = BaseMonster;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	function Creature(game, x, y, sprite_key) {
	    Phaser.Sprite.call(this, game, x, y, sprite_key);

	    this.game = game;

	    game.physics.enable(this);
	    this.anchor.set(0.5);
	    this.body.collideWorldBounds = true;
	    this.body.bounce.setTo(0, 0);

	    this.events.onCastSkill = new Phaser.Signal();

	    this.skill = function () { };
	    this.skillSet = [];
	    this.immune = false;
	    this.state = {
	        immuneTime: 250,
	        speed: 300
	    };
	}

	Creature.prototype = Object.create(Phaser.Sprite.prototype);
	Creature.prototype.constructor = Creature;

	Creature.prototype.damage = function (amount) {
	    var self = this;

	    if (this.alive && !this.immune) {
	        this.immune = true;
	        this.health -= amount;
	        
	        self.tint = 0xff0000;


	        
	        setTimeout(resetImmune, 250);

	        if (this.health <= 0) {
	            this.kill();
	        }
	    }
	    return this;

	    function resetImmune() {
	        self.immune = false;
	        self.tint = 0xffffff;
	    }

	};

	Creature.prototype.heal = function (amount) {
	    if (this.alive) {
	        this.health += amount;
	        if (this.health > this.maxHealth) {
	            this.health = this.maxHealth;
	        }
	    }

	    return this;
	};

	Creature.prototype.getModel = function () {
	    return {
	        x: this.x,
	        y: this.y,

	        health: this.health,
	        maxHealth: this.maxHealth,

	        skill: this.skill,
	        skillSet: this.skillSet,
	        state: this.state
	    };
	};

	Creature.prototype.setModel = function (data) {
	    this.x = data.x || this.x;
	    this.y = data.y || this.y;

	    this.health = data.health || this.health;
	    this.maxHealth = data.maxHealth || this.maxHealth;

	    this.skill = data.skill || this.skill;
	    this.skillSet = data.skillSet || this.skillSet;
	    this.state = data.state || this.state;
	};

	module.exports = Creature;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20);

	var speed = 500;
	var power = 1;

	function Fireball(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'fireball');
	    this.scale.setTo(0.06, 0.06);
	    game.physics.arcade.moveToObject(this, to, speed);

	    this.body.rotation = game.physics.arcade.angleBetween(this, to);

	    this.power = power;
	}

	Fireball.prototype = Object.create(BaseSkill.prototype);
	Fireball.prototype.constructor = Fireball;

	Fireball.prototype.impact = function (mob) {
	    mob.damage(this.power);
	    this.kill();
	};


	Fireball.prototype.timeout = 1000;
	module.exports = Fireball;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20);
	var SkeletonKing = __webpack_require__(34);

	function Reincarnation(game, position, player, skeletons) {
	    BaseSkill.call(this, game, position, player, 'natures_call');

	    this.scale.setTo(0, 0);

	    this.position = position;
	    this.player = player;
	    this.skeletons = skeletons;

	    this.events.onCastMonster = new Phaser.Signal();
	}

	Reincarnation.prototype = Object.create(BaseSkill.prototype);
	Reincarnation.prototype.constructor = Reincarnation;

	Reincarnation.prototype.update = function () {
	    var skeletonKing = new SkeletonKing(this.game, this.position, this.player, this.skeletons);
	    this.events.onCastMonster.dispatch(skeletonKing);
	    this.kill();
	};

	Reincarnation.prototype.timeout = 0;
	module.exports = Reincarnation;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseMonster = __webpack_require__(30);
	var skillFactory = __webpack_require__(18);

	function SkeletonKing(game, point, player, skeletons) {
	    BaseMonster.call(this, game, point, player, 'skeletonKing');
	    this.scale.setTo(0.4, 0.4);

	    this.skill = skillFactory.createSkill('SkeletonSpawn', game);
	    this.attack = skillFactory.createSkill('SkeletonBall', game);
	    this.Reincarnation = skillFactory.Reincarnation;

	    this.timer = null;
	    this.reincarnateTimer = null;

	    this.health = this.maxHealth = 25;

	    this.skeletons = skeletons || [];
	    this.skeletonsSprites = [];

	    this.reincarnated = false;
	}

	SkeletonKing.prototype = Object.create(BaseMonster.prototype);
	SkeletonKing.prototype.constructor = SkeletonKing;
	SkeletonKing.prototype.Name = "SkeletonKing";

	SkeletonKing.prototype.update = function () {
	    var self = this;
	    var deadKing;
	    if (!this.alive && this.reincarnated) {
	        clearTimeout(self.timer);
	        if (self.skeletonsSprites[0])
	            self.skeletonsSprites[0].kill();
	        if (self.skeletonsSprites[1])
	            self.skeletonsSprites[1].kill();
	        if (self.skeletonsSprites[2])
	            self.skeletonsSprites[2].kill();
	        return;
	    }
	    else if (!this.alive) {
	        if (self.reincarnateTimer === null) {
	            deadKing = self.game.add.sprite(self.x, self.y, 'skeletonKing');
	            deadKing.scale.setTo(0.4, 0.4);
	            deadKing.angle += 90;
	            self.reincarnateTimer = setTimeout(reincarnate, 5000);
	        }
	        clearTimeout(self.timer);
	        if (self.skeletonsSprites[0])
	            self.skeletonsSprites[0].kill();
	        if (self.skeletonsSprites[1])
	            self.skeletonsSprites[1].kill();
	        if (self.skeletonsSprites[2])
	            self.skeletonsSprites[2].kill();
	        return;
	    }

	    move();
	    castSkills();

	    function reincarnate() {
	        if (aliveSkeletonsCount() > 0) {
	            deadKing.kill();
	            var position = {
	                x: self.x,
	                y: self.y
	            };
	            var reincarnation = new self.Reincarnation(self.game, position, self.player, self.skeletons);
	            self.events.onCastSkill.dispatch(reincarnation);
	        }
	        self.reincarnated = true;
	        self.reincarnateTimer = null;
	    }

	    function move() {
	        if (self.physics.distanceToXY(self.player, self.x, self.y) > 250)
	            self.physics.moveToObject(self, self.player, 100);
	        else
	            self.body.velocity.setTo(0, 0);
	    }
	    function castSkills() {
	        if (self.attack.ready()) {
	            var fireball = self.attack(self.game, self, self.player);
	            self.events.onCastSkill.dispatch(fireball);

	            var fireball2Target = {
	                x: self.player.x + 50,
	                y: self.player.y + 50
	            };
	            var fireball2 = self.attack(self.game, self, fireball2Target);
	            self.events.onCastSkill.dispatch(fireball2);

	            var fireball3Target = {
	                x: self.player.x - 50,
	                y: self.player.y - 50
	            };
	            var fireball3 = self.attack(self.game, self, fireball3Target);
	            self.events.onCastSkill.dispatch(fireball3);
	        }
	        var aliveSkeletons = aliveSkeletonsCount();
	        if (aliveSkeletons > 0) {
	            self.body.velocity.setTo(0, 0);
	        }
	        if (aliveSkeletons === 0) {
	            if (self.skeletons.length === 0)
	                spawnSkeletons();
	            else
	                reincarnateSkeletons();
	        }
	    }
	    function aliveSkeletonsCount() {
	        var aliveSkeletonsCount = 0;
	        for (var i = 0; i < self.skeletons.length; i++) {
	            if (self.skeletons[i].alive) {
	                aliveSkeletonsCount++;
	            }
	        }
	        return aliveSkeletonsCount;
	    }
	    function spawnSkeletons() {
	        var position1 = {
	            x: random(100, 700),
	            y: random(100, 500),
	        };
	        var position2 = {
	            x: random(100, 700),
	            y: random(100, 500),
	        };
	        var position3 = {
	            x: random(100, 700),
	            y: random(100, 500),
	        };

	        if (self.timer === null) {
	            self.timer = setTimeout(function () {
	                var skill1 = self.skill(self.game, position1, self.player);
	                self.events.onCastSkill.dispatch(skill1);
	                self.skeletons.push(skill1.skeleton);

	                var skill2 = self.skill(self.game, position2, self.player);
	                self.events.onCastSkill.dispatch(skill2);
	                self.skeletons.push(skill2.skeleton);

	                var skill3 = self.skill(self.game, position3, self.player);
	                self.events.onCastSkill.dispatch(skill3);
	                self.skeletons.push(skill3.skeleton);

	                self.timer = null;
	            }, 5000);
	        }
	    }
	    function reincarnateSkeletons() {
	        var position1 = {
	            x: self.skeletons[0].x,
	            y: self.skeletons[0].y,
	        };
	        var position2 = {
	            x: self.skeletons[1].x,
	            y: self.skeletons[1].y,
	        };
	        var position3 = {
	            x: self.skeletons[2].x,
	            y: self.skeletons[2].y,
	        };

	        if (self.timer === null) {
	            self.skeletonsSprites[0] = self.game.add.sprite(position1.x, position1.y, 'skeleton');
	            self.skeletonsSprites[1] = self.game.add.sprite(position2.x, position2.y, 'skeleton');
	            self.skeletonsSprites[2] = self.game.add.sprite(position3.x, position3.y, 'skeleton');

	            self.skeletonsSprites[0].scale.setTo(0.3, 0.3);
	            self.skeletonsSprites[1].scale.setTo(0.3, 0.3);
	            self.skeletonsSprites[2].scale.setTo(0.3, 0.3);

	            self.skeletonsSprites[0].angle += 90;
	            self.skeletonsSprites[1].angle += 90;
	            self.skeletonsSprites[2].angle += 90;

	            self.timer = setTimeout(function () {
	                self.skeletonsSprites[0].kill();
	                self.skeletonsSprites[1].kill();
	                self.skeletonsSprites[2].kill();

	                var skill1 = self.skill(self.game, position1, self.player);
	                self.events.onCastSkill.dispatch(skill1);
	                self.skeletons[0] = skill1.skeleton;

	                var skill2 = self.skill(self.game, position2, self.player);
	                self.events.onCastSkill.dispatch(skill2);
	                self.skeletons[1] = skill2.skeleton;

	                var skill3 = self.skill(self.game, position3, self.player);
	                self.events.onCastSkill.dispatch(skill3);
	                self.skeletons[2] = skill3.skeleton;

	                self.timer = null;
	            }, 5000);
	        }
	    }
	};
	function random(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	module.exports = SkeletonKing;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20);

	var speed = 250;
	var power = 2;
	var time = 3000;

	function LifeSucking(game, from, to) {
	    this.target = to;
	    
	    this.vampire = from;
	    
	    BaseSkill.call(this, game, from, to, 'fireball');
	    this.scale.setTo(0.11, 0.11);
	    game.physics.arcade.moveToObject(this, this.target, speed);
	        
	    this.body.rotation = game.physics.arcade.angleBetween(this, this.target);

	    this.power = power;
	    game.time.events.add(time, this.destroy, this);
	}

	LifeSucking.prototype = Object.create(BaseSkill.prototype);
	LifeSucking.prototype.constructor = LifeSucking;

	LifeSucking.prototype.impact = function (mob) {
	    mob.damage(power);
	    this.vampire.heal(power);
	    this.kill();
	};

	LifeSucking.prototype.update = function () {
	    var vector = {
	        x: this.target.x - this.x,
	        y: this.target.y - this.y,
	    };
	    vector = normalise(vector);
	    this.body.velocity.setTo(vector.x * speed, vector.y * speed);
	};

	function normalise(vector) {
	    var inversion = 1 / Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	    return {
	        x: vector.x * inversion,
	        y: vector.y * inversion
	    };
	}

	LifeSucking.prototype.timeout = time;
	module.exports = LifeSucking;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 

	var speed = 400;
	var power = 1;
	var timeOfLive = 250;

	function Sword(game, from, to) {
	    BaseSkill.call(this, game, from, to, 'sword');

	    this.shift = Phaser.Point.subtract(to, from).normalize().multiply(20,20)
	    this.from = from;
	    this.to = to;
	    this.position = Phaser.Point.add(this.from, this.shift);

	    this.scale.setTo(0.3, 0.3);
	    this.anchor.setTo(0.5, 0.8);

	    this.rotation = game.physics.arcade.angleBetween(this, to) + (to.x < this.x ? Math.PI : 0); 
	    

	    this.power = power;
	    game.time.events.add(timeOfLive, this.destroy, this);
	}

	Sword.prototype = Object.create(BaseSkill.prototype);
	Sword.prototype.constructor = Sword;

	Sword.prototype.update = function(){
	    this.position = Phaser.Point.add(this.from, this.shift);
	    
	    this.rotation += Math.PI / 25 * (this.to.x > this.x ? 1 : -1);    
	}

	Sword.prototype.impact = function(mob){
	    mob.damage(this.power);
	}


	Sword.prototype.timeout = 250;
	module.exports = Sword;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 
	var Stump = __webpack_require__(38);

	function Natures_call(game, position, player) {
	    BaseSkill.call(this, game, position, player, 'light');  

	    this.scale.setTo(0, 0);

	    this.position = position;
	    this.player = player;
	    this.stump = new Stump(this.game,  this.position, this.player);

	    this.events.onCastMonster = new Phaser.Signal();
	}

	Natures_call.prototype = Object.create(BaseSkill.prototype);
	Natures_call.prototype.constructor = Natures_call;

	Natures_call.prototype.update = function(){

	    this.events.onCastMonster.dispatch(this.stump);
	    this.kill();
	};

	Natures_call.prototype.timeout = 10000;
	module.exports = Natures_call;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 170;

	var skillFactory = __webpack_require__(18);
	var BaseMonster = __webpack_require__(30);

	function Stump(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'stump');
	    this.scale.setTo(0.3, 0.3); 
	    this.body.mass = 0;
	    this.health = this.maxHealth = 2;
	    this.skill = skillFactory.createSkill('Bolt', game);

	    this.state = {};
	}

	Stump.prototype = Object.create(BaseMonster.prototype);
	Stump.prototype.constructor = Stump;
	Stump.prototype.Name = "Stump";

	Stump.prototype.update = function() {
	    if(!this.alive) return;
	    
	    this.physics.overlap(this.player, this, hit);
	    
	    function hit(player, mob)
	    {
	        player.damage(1);
	    }

	    var stumpIsFar = this.physics.distanceToXY(this.player, this.x, this.y) > 30;    

	    if(stumpIsFar)
	        this.physics.moveToObject(this, this.player, speed);
	    else
	        this.body.velocity.setTo(0, 0);
	};

	module.exports = Stump;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseSkill = __webpack_require__(20); 
	var Branch = __webpack_require__(27);

	function Branch_spawn(game, position, player) {
	    BaseSkill.call(this, game, position, player, 'branch_spawn');  

	    this.scale.setTo(0, 0);

	    this.position = position;
	    this.player = player;
	    
	    this.branch = new Branch(this.game,  this.position, this.player);
	    this.events.onCastMonster = new Phaser.Signal();
	}

	Branch_spawn.prototype = Object.create(BaseSkill.prototype);
	Branch_spawn.prototype.constructor = Branch_spawn;

	Branch_spawn.prototype.update = function(){
	    this.events.onCastMonster.dispatch(this.branch);
	    this.kill();
	};

	Branch_spawn.prototype.timeout = 5000;
	module.exports = Branch_spawn;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Creature = __webpack_require__(31);

	function BasePlayer(game, x, y, sprite_key) {
	    Creature.call(this, game, x, y, sprite_key);
	    this.body.setSize(97, 134, 0, 3);
	    this.scale.setTo(0.3);

	    this.health = this.maxHealth = 10;
	    this.skill = function () { };

	    this.state.coins = 0;

	    var self = this;
	    setKeys();
	    setOnCastInterraptor();

	    function setKeys() {
	        self.keys = game.input.keyboard.addKeys({
	            'up': Phaser.Keyboard.W,
	            'left': Phaser.Keyboard.A,
	            'down': Phaser.Keyboard.S,
	            'right': Phaser.Keyboard.D,
	            'one': Phaser.Keyboard.ONE,
	            'two': Phaser.Keyboard.TWO,
	            'three': Phaser.Keyboard.THREE
	        });

	        self.cursorKeys = game.input.keyboard.addKeys({
	            'up': Phaser.Keyboard.I,
	            'left': Phaser.Keyboard.J,
	            'down': Phaser.Keyboard.K,
	            'right': Phaser.Keyboard.L
	        });
	    }

	    function setOnCastInterraptor() {
	        self.readyToCast = true;
	        self.events.onCastSkill.add(notReady);

	        function notReady() {
	            self.readyToCast = false;
	            setTimeout(isReady, 100);
	        }

	        function isReady() {
	            self.readyToCast = true;
	        }
	    }
	}

	BasePlayer.prototype = Object.create(Creature.prototype);
	BasePlayer.prototype.constructor = BasePlayer;

	BasePlayer.prototype.getItem = function (item) {
	        item.impact(this);
	};

	BasePlayer.prototype.update = function () {
	    var self = this;

	    updateDirect();
	    updateSpeed();
	    updateSkillSet();
	    tryUseSkill();
	    debug();

	    function updateDirect() {
	        var velocityX = self.body.velocity.x;
	        var direct = velocityX <= 0 ? 1 : -1;
	        self.scale.x = direct * Math.abs(self.scale.x);
	    }

	    function updateSpeed() {
	        var keys = self.keys,
	            velocity = new Phaser.Point(0, 0),
	            speed = self.state.speed;

	        if (keys.left.isDown) velocity.x = -1;
	        if (keys.right.isDown) velocity.x = 1;
	        if (keys.up.isDown) velocity.y = -1;
	        if (keys.down.isDown) velocity.y = 1;

	        self.body.velocity = velocity.normalize()
	            .multiply(speed, speed);
	    }

	    function updateSkillSet(){
	        if(self.keys.one.isDown && self.skillSet[0])
	            self.skill = self.skillSet[0];
	        if(self.keys.two.isDown && self.skillSet[1])
	            self.skill = self.skillSet[1];
	        if(self.keys.three.isDown && self.skillSet[2])
	            self.skill = self.skillSet[2];
	    }

	    function tryUseSkill() {
	        var cursorKeys = self.cursorKeys;

	        if (cursorKeys.up.isDown)
	            castSkill({ x: self.x, y: self.y - 200 });
	        if (cursorKeys.right.isDown)
	            castSkill({ x: self.x + 200, y: self.y });
	        if (cursorKeys.down.isDown)
	            castSkill({ x: self.x, y: self.y + 200 });
	        if (cursorKeys.left.isDown)
	            castSkill({ x: self.x - 200, y: self.y });
	    }


	    function castSkill(to) {
	        if (self.skill.ready() && self.readyToCast) {
	            var skill = self.skill(self.game, self, to);
	            self.events.onCastSkill.dispatch(skill);
	        }
	    }

	    function debug() {
	        var game = self.game;
	        var x = 10, y = 20;
	        var color = game.debug.color;

	        game.debug.text(hpInfo(), x, y, color);
	        y += 20;
	        game.debug.text("speed: " + self.state.speed, x, y, color);
	        y = 20;
	        x += 140;
	        game.debug.text("coins: " + self.state.coins, x, y, color);
	        y += 20;
	        game.debug.text(activeSkillInfo(), x, y, color);

	        function hpInfo() {
	            return "health: " + self.health + "/" +
	                self.maxHealth;
	        }

	        function activeSkillInfo() {
	            return "skill: " + self.skill.Name + "|" +
	                self.skill.calldown();
	        }
	    }
	};


	module.exports = BasePlayer;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var skillFactory = __webpack_require__(18);
	var BasePlayer = __webpack_require__(40);

	  

	function Warrior(game, x, y) {
	    BasePlayer.call(this, game, x, y, 'warrior');

	    this.state.name = 'Warrior';

	    var Sword = skillFactory.createSkill('Sword', game),
	        Cobble = skillFactory.createSkill('Cobble', game);
	  
	    this.skill = Sword;
	    this.skillSet = [ Sword, Cobble ];
	}

	Warrior.prototype = Object.create(BasePlayer.prototype);
	Warrior.prototype.constructor = Warrior;

	module.exports = Warrior;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Door = __webpack_require__(43);
	var HealthPotion = __webpack_require__(44);
	var SpeedPotion = __webpack_require__(46);
	var CalldownPotion = __webpack_require__(47);
	var Roll = __webpack_require__(48);
	var Coin = __webpack_require__(49);
	var SkillShop = __webpack_require__(50);
	var SkeletonHelm = __webpack_require__(52);

	module.exports = {
	    Door: Door,
	    HealthPotion: HealthPotion,
	    SpeedPotion: SpeedPotion,
	    CalldownPotion: CalldownPotion,
	    Roll: Roll,
	    Coin: Coin,
	    SkillShop: SkillShop,
	    SkeletonHelm: SkeletonHelm
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	var Door = function(game, position, room) {
	    Phaser.Sprite.call(this, game, 0, 0, 'door');
	    game.physics.enable(this);
	    this.anchor.set(0.5);

	    this.game = game;

	    this.room = room;
	    this.state = game.state;

	    this.open = true;

	    var width = this.width,
	        height = this.height;

	    this.x = getX(position);
	    this.y = getY(position); 
	    this.door_position = position;

	    function getX(position){
	        if(position === 'left')
	            return width / 2;
	        if(position === 'right')
	            return game.world.width - width / 2;
	        return game.world.centerX;
	    }

	    function getY(position){
	        if(position === 'up')
	            return width / 2;
	        if(position === 'down')
	            return game.world.height - height / 2;
	        return game.world.centerY;

	    }
	};

	Door.prototype = Object.create(Phaser.Sprite.prototype);
	Door.prototype.constructor = Door;

	Door.prototype.go = function(player_model){
	    if(this.open){
	        this.state.start(this.room.key, true, false, 
	                                    this.door_position, 
	                                    player_model);
	    }
	};

	Door.prototype.close = function(condition){
	    this.open = false;
	    this.condition = condition;
	    this.closeSprite = this.game.add.sprite(this.x - this.width / 2,
	                                            this.y - this.height / 2, 'closedDoor');
	};

	Door.prototype.update = function(){
	    if(this.condition && this.condition()){
	        this.open = true;
	        this.closeSprite.destroy();
	    }
	};

	module.exports = Door;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);

	var HealthPotion = function(game, position) {
	    BaseItem.call(this, game, position, 'healthPotion');
	    this.scale.setTo(0.2, 0.2);
	};

	HealthPotion.prototype = Object.create(BaseItem.prototype);
	HealthPotion.prototype.constructor = HealthPotion;
	HealthPotion.prototype.Name = "HealthPotion";

	HealthPotion.prototype.impact = function(player){
	    player.heal(3);
	    this.destroy();
	};

	module.exports = HealthPotion;


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	var BaseItem = function(game, position, sprite_key) {
	    Phaser.Sprite.call(this, game, position.x, position.y, sprite_key);
	    game.physics.enable(this);
	    this.anchor.set(0.5);
	    this.game = game;
	    this.state = {};
	};

	BaseItem.prototype = Object.create(Phaser.Sprite.prototype);
	BaseItem.prototype.constructor = BaseItem;

	BaseItem.prototype.impact = function(){};

	BaseItem.prototype.getModel = function() {
	    return {
	        x: this.x,
	        y: this.y,
	        state: this.state
	    };
	};

	BaseItem.prototype.setModel = function(data){
	    this.x = data.x || this.x;
	    this.y = data.y || this.y;
	    this.state = data.state || this.state;
	};


	module.exports = BaseItem;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);

	var SpeedPotion = function(game, position) {
	    BaseItem.call(this, game, position, 'speedPotion');
	    this.scale.setTo(0.2, 0.2);
	};

	SpeedPotion.prototype = Object.create(BaseItem.prototype);
	SpeedPotion.prototype.constructor = SpeedPotion;
	SpeedPotion.prototype.Name = "SpeedPotion";

	SpeedPotion.prototype.impact = function(player){
	    player.state.speed *= 1.1;
	    player.state.speed = Math.round(player.state.speed);
	    this.destroy();
	};

	module.exports = SpeedPotion;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);

	var CalldownPotion = function(game, position) {
	    BaseItem.call(this, game, position, 'calldownPotion');
	    this.scale.setTo(0.2, 0.2);
	};

	CalldownPotion.prototype = Object.create(BaseItem.prototype);
	CalldownPotion.prototype.constructor = CalldownPotion;
	CalldownPotion.prototype.Name = "CalldownPotion";

	CalldownPotion.prototype.impact = function(player){
	    for(var i = 0; i < player.skillSet.length; i++)
	        player.skillSet[i].reduce(3);    
	    
	    this.destroy();
	};

	module.exports = CalldownPotion;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);
	var book = __webpack_require__(1);

	var Roll = function(game, position) {
	    BaseItem.call(this, game, position, 'roll');
	    this.scale.setTo(0.2, 0.2);

	    this.state.type = position.type;
	    this.state.thing = position.thing;
	    this.state.sprite = position.sprite;
	    this.setSprite();
	};

	Roll.prototype = Object.create(BaseItem.prototype);
	Roll.prototype.constructor = Roll;
	Roll.prototype.Name = "Roll";

	Roll.prototype.impact = function(){
	    book.show(this.state.type,  this.state.thing);
	    this.sprite.destroy();
	    this.destroy();
	};

	Roll.prototype.setModel = function(data){
	    BaseItem.prototype.setModel.call(this, data);
	    this.setSprite();
	};

	Roll.prototype.setSprite = function()
	{
	    if(!this.state.sprite || this.sprite) return;

	    this.sprite = this.game.add.sprite(this.x - this.width / 2 + 5, 
	                                       this.y - this.height / 2 + 3, this.state.sprite);

	    this.sprite.width = this.width - 10;
	    this.sprite.height = this.height - 10;
	};

	module.exports = Roll;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);

	var Coin = function(game, position) {
	    BaseItem.call(this, game, position, 'coin');
	    this.scale.setTo(0.12, 0.12);
	};

	Coin.prototype = Object.create(BaseItem.prototype);
	Coin.prototype.constructor = Coin;
	Coin.prototype.Name = "Coin";

	Coin.prototype.impact = function(player){
	    player.state.coins++;
	    this.destroy();
	};

	module.exports = Coin;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);
	var skillFactory = __webpack_require__(51);

	var SkillShop = function(game, data) {
	    BaseItem.call(this, game, data, 'roll');
	    this.scale.setTo(0.2, 0.2);

	    this.state.skill = data.skill;
	    this.state.sprite = data.sprite;
	    this.state.cost = data.cost;
	    this.setSprite();
	};

	SkillShop.prototype = Object.create(BaseItem.prototype);
	SkillShop.prototype.constructor = SkillShop;
	SkillShop.prototype.Name = "SkillShop";

	SkillShop.prototype.impact = function(player){
	    if(player.state.coins < this.state.cost) return;

	    player.state.coins -= this.state.cost;
	    player.skillSet.push(skillFactory.createSkill(this.state.skill, this.game));

	    this.sprite.destroy();
	    this.text.destroy();
	    this.destroy();
	};

	SkillShop.prototype.setModel = function(data){
	    BaseItem.prototype.setModel.call(this, data);
	    this.setSprite();
	};

	SkillShop.prototype.setSprite = function()
	{
	    if(!this.state.sprite || this.sprite) return;

	    var style = { font: '12px Arial', fill: '#FFF'};

	    this.sprite = this.game.add.sprite(this.x - this.width / 2 + 5, 
	                                       this.y - this.height / 2 + 3, this.state.sprite);

	    this.sprite.width = this.width - 10;
	    this.sprite.height = this.height - 10;

	    this.text = this.game.add.text(this.x - this.width / 2 - 5, this.y + this.height / 2, 
	                                    this.state.cost + " coins", style);
	};

	module.exports = SkillShop;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Fireball = __webpack_require__(19);
	var Bolt = __webpack_require__(21);
	var Cobble = __webpack_require__(22);
	var Bite = __webpack_require__(23);
	var Fireworks = __webpack_require__(24);
	var Deathball = __webpack_require__(25);
	var Yapona_mat = __webpack_require__(26);
	var Branch = __webpack_require__(27)

	var SkeletonSpawn = __webpack_require__(28);
	var SkeletonBall = __webpack_require__(32);
	var Reincarnation = __webpack_require__(33);
	var LifeSucking = __webpack_require__(35);

	var Sword = __webpack_require__(36);

	var Natures_call = __webpack_require__(37);

	var Branch_spawn = __webpack_require__(39);

	var e = module.exports;

	e.Branch = Branch;
	e.Fireball = Fireball;
	e.Bolt = Bolt;
	e.Cobble = Cobble;
	e.Bite = Bite;
	e.Fireworks = Fireworks;
	e.Deathball = Deathball;
	e.Yapona_mat = Yapona_mat;
	e.SkeletonSpawn = SkeletonSpawn;
	e.SkeletonBall = SkeletonBall;
	e.Reincarnation = Reincarnation;
	e.LifeSucking = LifeSucking;

	e.Sword = Sword;

	e.Natures_call = Natures_call;

	e.Branch_spawn = Branch_spawn;

	e.createSkill = function(skillName, game){
	    var skill = e[skillName];

	    var lastTime = 0,
	        timeout = skill.prototype.timeout;

	    var result = function (_game, _from, _to) {
	        lastTime = game.time.now;
	        return new skill(_game, _from, _to);
	    };

	    result.ready = function () {
	        return lastTime + timeout < game.time.now;
	    };

	    result.calldown = function () {
	        var now = game.time.now;
	        return lastTime + timeout > now ? lastTime + timeout - now : "Ready";
	    };

	    result.reduce = function (percent) {
	        timeout *= (100 - percent) / 100;
	        timeout = Math.round(timeout);
	    };

	    result.Name = skillName;

	    return result;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseItem = __webpack_require__(45);

	var SkeletonHelm = function(game, position) {
	    BaseItem.call(this, game, position, 'helm');
	    this.scale.setTo(0.7, 0.7);
	};

	SkeletonHelm.prototype = Object.create(BaseItem.prototype);
	SkeletonHelm.prototype.constructor = SkeletonHelm;
	SkeletonHelm.prototype.Name = "SkeletonHelm";

	SkeletonHelm.prototype.impact = function(player){
	    player.health += 10;
	    player.maxHealth += 10;
	    this.destroy();
	};

	module.exports = SkeletonHelm;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Wall = __webpack_require__(54);

	module.exports = {
	    Wall: Wall
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	var Wall = function(game, x, y, width, height) {
	    Phaser.TileSprite .call(this, game, x, y, width, height , 'brick');
	    game.physics.enable(this);
	    this.body.immovable = true;
	};

	Wall.prototype = Object.create(Phaser.TileSprite.prototype);
	Wall.prototype.constructor = Wall;

	module.exports = Wall;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bat = __webpack_require__(56);
	var Tree = __webpack_require__(57);
	var Stump = __webpack_require__(38);
	var Spider = __webpack_require__(58);
	var Minotaur = __webpack_require__(59);
	var Death = __webpack_require__(60);
	var SkeletonKing = __webpack_require__(34);
	var Skeleton = __webpack_require__(29);
	var Vampire = __webpack_require__(61);
	var Branch = __webpack_require__(62);

	module.exports = {
	    Branch: Branch,
	    Bat: Bat,
	    Tree: Tree,
	    Stump: Stump,
	    Spider: Spider,
	    Minotaur: Minotaur,
	    Death: Death,
	    SkeletonKing: SkeletonKing,
	    Skeleton: Skeleton,
	    Vampire: Vampire
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 100;
	var lowspeed = 40;
	var vision_distance = 250;
	var attack_distance = 200;
	var radius = 20;

	var skillFactory = __webpack_require__(18);
	var BaseMonster = __webpack_require__(30);

	function Bat(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'bat');
	    this.scale = new Phaser.Point(0.4, 0.4);

	    this.body.setSize(100, 76, 0, -20);

	    this.health = this.maxHealth = 5;

	    this.skill = skillFactory.createSkill('Bolt', game);

	    this.state = {
	        base: point,
	        goal: point,
	        urge: 'patrol',
	        moving: false,
	        patrol: getPatrolPoints(point),
	        patrolIndex: 0
	    };
	}

	Bat.prototype = Object.create(BaseMonster.prototype);
	Bat.prototype.constructor = Bat;
	Bat.prototype.Name = "Bat";

	Bat.prototype.update = function() {
	    if(!this.alive) return;
	    
	    var self = this,
	        state = this.state,
	        base = state.base,
	        x = base.x,
	        y = base.y;
	    
	    var playerIsClose = this.physics.distanceToXY(this.player, x, y) < vision_distance;
	    state.urge = playerIsClose ? 'chasing' : 'patrol';

	    if(state.urge === 'patrol' && !state.moving){
	        state.moving = true;
	        state.patrolIndex = (state.patrolIndex + 1) % state.patrol.length;
	        state.goal = state.patrol[ state.patrolIndex ];
	        moveTo(state.goal, lowspeed);
	    }

	    if(self.physics.distanceToXY(self, state.goal.x, state.goal.y) < 2 ) {
	        self.body.velocity.setTo(0, 0);
	        state.moving = false;            
	    }

	    if(state.urge === 'chasing'){
	        moveTo(self.player, speed);
	        state.moving = false;
	    }

	    function moveTo(p, speed){
	        self.physics.moveToObject(self, p, speed);
	    }

	    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
	       this.skill.ready()){
	        var skill = this.skill(this.game, this, this.player);
	        this.events.onCastSkill.dispatch(skill);
	    }
	};

	module.exports = Bat;


	function getPatrolPoints(point){
	    var dfi = Math.PI / 8,
	        res = [];
	    for(var i = 0; i < Math.PI * 2; i += dfi){
	        res.push({
	            x: point.x + radius*Math.cos(i),
	            y: point.y + radius*Math.sin(i)
	        });
	    }
	    return res;
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 100;
	var attack_distance = 3228;
	var BaseMonster = __webpack_require__(30);
	var skillFactory = __webpack_require__(18);

	function Tree(game, point, player) {
	    this.stumps = [];
	    BaseMonster.call(this, game, point, player, 'tree', 0);
	    this.scale.setTo(0.8, 0.8);

	    this.health = this.maxHealth = 100;
	    this.skill = skillFactory.createSkill('Natures_call', game);

	    this.skillForKill = skillFactory.createSkill('Yapona_mat', game);


	    this.shooting = false;
	    this.game.time.events.add(5000, this.startShooting, this);
	}

	Tree.prototype = Object.create(BaseMonster.prototype);
	Tree.prototype.constructor = Tree;
	Tree.prototype.Name = "Tree";

	Tree.prototype.update = function () {
	    if (!this.alive) return;

	    var self = this;

	    move();
	    if (this.skill.ready())
	        castSkill();

	    function countAliveStumps() {
	        var count = 0;
	        for (var i = 0; i < self.stumps.length; i++) {
	            if (self.stumps[i].alive) count++;
	        }
	        return count;
	    }

	    function move() {
	        var treeIsFar = self.physics.distanceToXY(self.player, self.x, self.y) > 205,
	            treeIsClose = self.physics.distanceToXY(self.player, self.x, self.y) < 195;

	        if (treeIsFar || treeIsClose) {

	            self.physics.moveToObject(self, self.player, speed);
	            if (treeIsClose)
	                self.body.velocity.multiply(-1, -1);

	        } else {
	            self.body.velocity.setTo(0, 0);
	        }
	    }

	    function castSkill() {
	        var distance = Math.max(self.width, self.height) - 30;
	        var perpDist = 40;

	        var toPlayer = self.player.position.clone()
	            .subtract(self.x, self.y)
	            .normalize();
	        var perp = toPlayer.clone().rperp();

	        var center = {
	            x: self.x + distance * toPlayer.x,
	            y: self.y + distance * toPlayer.y
	        };
	        var left = {
	            x: center.x + perpDist * perp.x,
	            y: center.y + perpDist * perp.y
	        };
	        var right = {
	            x: center.x - perpDist * perp.x,
	            y: center.y - perpDist * perp.y
	        };
	        if (countAliveStumps() < 5) {
	            var skill = self.skill(self.game, center, self.player);
	            self.events.onCastSkill.dispatch(skill);
	            self.stumps.push(skill.stump);
	            skill = self.skill(self.game, left, self.player);
	            self.events.onCastSkill.dispatch(skill);
	            self.stumps.push(skill.stump);
	            skill = self.skill(self.game, right, self.player);
	            self.events.onCastSkill.dispatch(skill);
	            self.stumps.push(skill.stump);
	        }
	    }

	    if (this.physics.distanceBetween(this.player, this) < attack_distance &&
	        this.skillForKill.ready() && this.shoоting) {
	        var skillForKill = this.skillForKill(this.game, this, this.player);
	        this.events.onCastSkill.dispatch(skillForKill);
	    }
	        //65
	    if (this.health <= 65 && !this.branch1) {
	        this.body.setSize(126, 168, -17, 0);
	        this.frame = 1;
	        this.branch1 = true;
	        var position = {
	            x: this.x - 10,
	            y: this.y + 10
	        };
	        var hz = new skillFactory.Branch(self.game, this, position);
	        self.events.onCastSkill.dispatch(hz);
	    }
	        //25
	    if (this.health <= 25 && !this.branch2) {
	        this.body.setSize(92, 120, -5, 20);
	        this.frame = 2;
	        this.branch2 = true;
	        var position = {
	            x: this.x + 10,
	            y: this.y + 10
	        };
	        var hz = new skillFactory.Branch(self.game, this, position, 'branch2');
	        self.events.onCastSkill.dispatch(hz);
	    }


	};

	Tree.prototype.startShooting = function () {
	    this.shoоting = true;
	    this.game.time.events.add(2000, this.stopShooting, this);
	};

	Tree.prototype.stopShooting = function () {
	    this.shoоting = false;
	    this.game.time.events.add(5000, this.startShooting, this);
	};

	module.exports = Tree;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var attack_distance = 30;

	var BaseMonster = __webpack_require__(30);
	var skillFactory = __webpack_require__(18);

	function random(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function Spider(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'spider');
	    this.scale.setTo(0.15, 0.15);

	    this.skill = skillFactory.createSkill('Bite', game);

	    this.state = {
	        base: point
	    };

	    this.health = this.maxHealth = 1;

	    setTimeout(Spider.prototype.updateMoving.bind(this), 200);
	}

	Spider.prototype = Object.create(BaseMonster.prototype);
	Spider.prototype.constructor = BaseMonster;
	Spider.prototype.Name = "Spider";

	Spider.prototype.update = function () {
	    if (!this.alive) return;

	    if (this.physics.distanceBetween(this.player, this) < attack_distance &&
	        this.skill.ready()) {
	        var skill = this.skill(this.game, {
	            x: this.x + this.width / 2,
	            y: this.y + this.height / 2
	        }, this.player);
	        this.events.onCastSkill.dispatch(skill);
	    }
	};

	Spider.prototype.updateMoving = function(){

	     var vector = {
	            x: random(-10, 10),
	            y: random(-10, 10)
	        };

	    this.physics.moveToXY(this, this.x + vector.x, this.y + vector.y, 200);
	    this.game.time.events.add(random(200, 500), this.stop, this);
	};

	Spider.prototype.stop = function(){
	    this.body.velocity.setTo(0, 0);
	    this.game.time.events.add(random(40, 100), this.updateMoving, this);
	};


	module.exports = Spider;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseMonster = __webpack_require__(30);

	function Minotaur(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'minotaur');
	    this.scale.setTo(0.5, 0.5);

	    this.health = this.maxHealth = 5;
	}

	Minotaur.prototype = Object.create(BaseMonster.prototype);
	Minotaur.prototype.constructor = BaseMonster;
	Minotaur.prototype.Name = "Minotaur";

	Minotaur.prototype.update = function () {
	    if (this.physics.distanceToXY(this.player, this.x, this.y) > 20)
	        this.physics.moveToObject(this, this.player, 100);
	    else
	        this.body.velocity.setTo(0,0);
	};

	module.exports = Minotaur;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var attack_distance = 30;

	var BaseMonster = __webpack_require__(30);
	var skillFactory = __webpack_require__(18);

	function Death(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'death');
	    this.scale.setTo(0.4, 0.4);

	    this.skill = skillFactory.createSkill('Deathball', game);

	    this.state = {
	        base: point
	    };

	    this.health = this.maxHealth = 50;
	}

	Death.prototype = Object.create(BaseMonster.prototype);
	Death.prototype.constructor = BaseMonster;
	Death.prototype.Name = "Death";

	Death.prototype.update = function () {
	    if (!this.alive) return;

	    if (this.physics.distanceToXY(this.player, this.x, this.y) < 100) {
	        this.player.damage(1);
	    }

	    if (this.physics.distanceToXY(this.player, this.x, this.y) > 250)
	        this.physics.moveToObject(this, this.player, 100);
	    else {
	        this.body.velocity.setTo(0, 0);
	    }
	    if (this.skill.ready()) {
	        var skill = this.skill(this.game, this, this.player);
	        this.events.onCastSkill.dispatch(skill);
	    }
	};

	module.exports = Death;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 100;

	var skillFactory = __webpack_require__(18);
	var BaseMonster = __webpack_require__(30);

	function Vampire(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'vampire');
	    this.scale.setTo(0.023, 0.023);

	    this.skill = skillFactory.createSkill('LifeSucking', game);

	    this.health = this.maxHealth = 10;
	}

	Vampire.prototype = Object.create(BaseMonster.prototype);
	Vampire.prototype.constructor = Vampire;
	Vampire.prototype.Name = "Vampire";

	Vampire.prototype.update = function () {
	    if (!this.alive) return;

	    if (this.skill.ready()) {
	        var skill = this.skill(this.game, this, this.player);
	        this.events.onCastSkill.dispatch(skill);
	    }

	    console.log(this.health);

	    if (this.physics.distanceToXY(this.player, this.x, this.y) > 50)
	        this.physics.moveToObject(this, this.player, 100);
	    else {
	        this.body.velocity.setTo(0, 0);
	    }
	};

	module.exports = Vampire;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var speed = 200;

	var skillFactory = __webpack_require__(18);
	var BaseMonster = __webpack_require__(30);

	function Branch(game, point, player) {
	    BaseMonster.call(this, game, point, player, 'branch');
	    this.scale.setTo(0.75, 0.75);

	    this.health = this.maxHealth = 100000;
	    this.body.bounce.setTo(1, 1);
	    this.body.velocity.setTo(speed, speed);
	    this.state = {};
	}

	Branch.prototype = Object.create(BaseMonster.prototype);
	Branch.prototype.constructor = Branch;
	Branch.prototype.Name = "Branch";

	Branch.prototype.update = function() {
	    if(!this.alive) return;
	    this.body.velocity.normalize().multiply(speed, speed);
	    
	    this.physics.overlap(this.player, this, hit);
	    
	    function hit(player, mob)
	    {
	        player.damage(1);
	    }
	};

	module.exports = Branch;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var empty = __webpack_require__(64);
	var spider = __webpack_require__(65);
	var bat = __webpack_require__(66);
	var minotaur = __webpack_require__(67);
	var tree = __webpack_require__(68);

	var bat_boss = __webpack_require__(69);
	var death = __webpack_require__(70);

	module.exports = {
	    empty: empty,
	    spider: spider,
	    bat: bat,
	    minotaur: minotaur,
	    tree: tree,
	    bat_boss: bat_boss,
	    death: death,

	    start: __webpack_require__(71),
	    room1: __webpack_require__(72),
	    room2: __webpack_require__(73),
	    room3: __webpack_require__(74),
	    room4: __webpack_require__(75),
	    room5: __webpack_require__(76),
	    room6: __webpack_require__(77),
	    room7: __webpack_require__(78),
	    room8: __webpack_require__(79),
	    room9: __webpack_require__(80),
	    boss: __webpack_require__(81)
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = {
		"background": "startup",
		"items": {
			"HealthPotion": [
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 300
				},
				{
					"x": 200,
					"y": 400
				}
			],
			"SpeedPotion": [
				{
					"x": 400,
					"y": 200
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 400
				}
			],
			"CalldownPotion": [
				{
					"x": 600,
					"y": 200
				},
				{
					"x": 600,
					"y": 300
				},
				{
					"x": 600,
					"y": 400
				}
			],
			"Roll": [
				{
					"x": 300,
					"y": 300,
					"type": "items",
					"thing": "HealthPotion",
					"sprite": "healthPotion"
				}
			],
			"Coin": [
				{
					"x": 350,
					"y": 350
				}
			],
			"SkillShop": [
				{
					"x": 450,
					"y": 450,
					"skill": "Fireworks",
					"sprite": "fireball",
					"cost": 2
				}
			]
		}
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Spider": [
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				}
			]
		}
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Bat": [
				{
					"x": 400,
					"y": 300
				}
			]
		}
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"SkeletonKing": [
				{
					"x": 600,
					"y": 300
				}
			]
		}
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Tree": [
				{
					"x": 400,
					"y": 300
				}
			]
		}
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Bat": [
				{
					"x": 400,
					"y": 300,
					"boss": "EvilBat"
				}
			]
		}
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Death": [
				{
					"x": 500,
					"y": 400
				}
			]
		}
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = {
		"background": "startup"
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Spider": [
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				},
				{
					"x": 200,
					"y": 200
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 300,
					"y": 230
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Spider",
					"sprite": "spider"
				}
			],
			"SpeedPotion": [
				{
					"x": 350,
					"y": 250
				}
			]
		}
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Stump": [
				{
					"x": 70,
					"y": 100
				},
				{
					"x": 650,
					"y": 100
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 300,
					"y": 500
				},
				{
					"x": 400,
					"y": 500
				},
				{
					"x": 500,
					"y": 500
				}
			]
		},
		"obstacles": {
			"Wall": []
		},
		"prize": {
			"Coin": [
				{
					"x": 200,
					"y": 400
				},
				{
					"x": 400,
					"y": 200
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Stump",
					"sprite": "stump"
				}
			],
			"HealthPotion": [
				{
					"x": 250,
					"y": 450
				}
			]
		}
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Skeleton": [
				{
					"x": 70,
					"y": 100
				},
				{
					"x": 150,
					"y": 100
				},
				{
					"x": 700,
					"y": 100
				},
				{
					"x": 650,
					"y": 100
				},
				{
					"x": 250,
					"y": 300
				},
				{
					"x": 650,
					"y": 300
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 100,
					"y": 400
				},
				{
					"x": 400,
					"y": 100
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Skeleton",
					"sprite": "skeleton"
				}
			],
			"HealthPotion": [
				{
					"x": 150,
					"y": 100
				}
			]
		}
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Bat": [
				{
					"x": 150,
					"y": 150
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 550,
					"y": 250
				},
				{
					"x": 550,
					"y": 450
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 350,
					"y": 300
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Bat",
					"sprite": "bat"
				}
			],
			"CalldownPotion": [
				{
					"x": 150,
					"y": 150
				}
			]
		}
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Spider": [
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 400,
					"y": 300
				}
			],
			"Stump": [
				{
					"x": 70,
					"y": 100
				},
				{
					"x": 400,
					"y": 300
				},
				{
					"x": 650,
					"y": 400
				},
				{
					"x": 670,
					"y": 480
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 100,
					"y": 230
				},
				{
					"x": 500,
					"y": 400
				},
				{
					"x": 600,
					"y": 230
				}
			],
			"HealthPotion": [
				{
					"x": 150,
					"y": 250
				}
			]
		}
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Bat": [
				{
					"x": 150,
					"y": 150
				},
				{
					"x": 150,
					"y": 450
				},
				{
					"x": 650,
					"y": 150
				},
				{
					"x": 650,
					"y": 450
				}
			],
			"Skeleton": [
				{
					"x": 400,
					"y": 230
				},
				{
					"x": 400,
					"y": 370
				}
			],
			"Stump": [
				{
					"x": 600,
					"y": 500
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 300,
					"y": 230
				},
				{
					"x": 600,
					"y": 130
				}
			],
			"SpeedPotion": [
				{
					"x": 250,
					"y": 150
				}
			]
		}
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Death": [
				{
					"x": 200,
					"y": 150
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 100,
					"y": 100
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Death",
					"sprite": "death"
				}
			],
			"CalldownPotion": [
				{
					"x": 450,
					"y": 450
				}
			],
			"SkillShop": [
				{
					"x": 150,
					"y": 450,
					"skill": "Fireworks",
					"sprite": "fireball",
					"cost": 15
				}
			]
		}
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Bat": [
				{
					"x": 400,
					"y": 300
				}
			],
			"Skeleton": [
				{
					"x": 300,
					"y": 70
				}
			],
			"Stump": [
				{
					"x": 600,
					"y": 500
				}
			],
			"Spider": [
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				},
				{
					"x": 400,
					"y": 400
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 320,
					"y": 430
				}
			],
			"CalldownPotion": [
				{
					"x": 250,
					"y": 450
				}
			],
			"SpeedPotion": [
				{
					"x": 450,
					"y": 250
				}
			],
			"HealthPotion": [
				{
					"x": 150,
					"y": 150
				}
			]
		}
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"SkeletonKing": [
				{
					"x": 600,
					"y": 400
				}
			]
		},
		"prize": {
			"Coin": [
				{
					"x": 370,
					"y": 330
				},
				{
					"x": 400,
					"y": 260
				},
				{
					"x": 430,
					"y": 330
				}
			],
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "SkeletonKing",
					"sprite": "skeletonKing"
				}
			],
			"HealthPotion": [
				{
					"x": 250,
					"y": 150
				}
			],
			"SkeletonHelm": [
				{
					"x": 600,
					"y": 400
				}
			]
		}
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = {
		"monsters": {
			"Tree": [
				{
					"x": 400,
					"y": 300,
					"boss": "Oak"
				}
			]
		},
		"prize": {
			"Roll": [
				{
					"x": 400,
					"y": 300,
					"type": "monsters",
					"thing": "Tree",
					"sprite": "tree"
				}
			]
		}
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseRoom = __webpack_require__(15);
	var roomData = __webpack_require__(63);

	function BossRoom(game, key) {
	    BaseRoom.call(this, game, key);
	    var data = roomData[key];

	    this.model.monsters = data.monsters || this.model.monsters;
	    this.model.items = data.items || this.model.items;
	    this.model.prize = data.prize || this.model.prize;
	    
	    this.background = 'brick1';
	}

	BossRoom.prototype = Object.create(BaseRoom.prototype);
	BossRoom.prototype.constructor = BossRoom;

	BaseRoom.prototype.addingMonster = function(monster, monsterModel){
	    if(monsterModel.boss){
	        this.boss = monster;
	        this.boss_name = monsterModel.boss;
	    }
	};


	BossRoom.prototype.create = function() {
	    BaseRoom.prototype.create.call(this);

	    this.hpBar = this.game.add.sprite(250, 570, 'hpBar');
	    this.hpBar.scale.setTo(3, 1);

	    this.hp = this.game.add.sprite(255, 574, 'hp');
	    this.hp.width = this.hpBar.width - 10;
	};

	BossRoom.prototype.additionalDebug = function(){
	    var game = this.game;
	    var st = this;

	    var color = game.debug.color = 'white';

	    game.debug.text(st.boss_name, 170, 580, color);

	    st.hp.width = (st.hpBar.width - 10) * (st.boss.health / st.boss.maxHealth);
	};

	module.exports = BossRoom;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var roomFactory = __webpack_require__(13);

	function DemoMap(game) {
	    roomFactory.SimpleRoom.call(this, game, 'start');
	        
	    var rooms = [];
	    for(var  i = 1; i <= 9; i++)
	        rooms[i] = new roomFactory.SimpleRoom(game, 'room' + i);

	    var boss = new roomFactory.BossRoom(game, 'boss');
	    this.concat(rooms[1], 'left');
	    this.concat(rooms[2], 'down');
	    this.concat(rooms[3], 'up');
	    this.concat(rooms[4], 'right');

	    rooms[4].concat(rooms[5], 'right');
	    rooms[5].concat(rooms[6], 'right');
	    rooms[6].concat(rooms[7], 'up');
	    rooms[6].concat(rooms[8], 'right');
	    rooms[8].concat(rooms[9], 'down');

	    rooms[8].concat(boss, 'right');

	}

	DemoMap.prototype = Object.create(roomFactory.SimpleRoom.prototype);
	DemoMap.prototype.constructor = DemoMap;

	module.exports = DemoMap;

/***/ }
/******/ ]);