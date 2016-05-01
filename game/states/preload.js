'use strict';

var playersFactory = require('../player/playersfactory');

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

        function loadBackgroundAssets(){
            load.image('floor', 'assets/dungeon_sheet-1-1.png');            
        }

        function loadPlayersAssets(){
            load.image('wizard', 'assets/heroleft.png');
            load.image('warrior', 'assets/heroleft2.png');    
        }

        function loadMonstersAssets(){
            load.image('bat', 'assets/monsters/bat.png');
            load.image('tree', 'assets/monsters/oak.png'); 
            load.image('stump', 'assets/monsters/stump.png');                
        }

        function loadSkillsAssets(){
            load.image('fireball', 'assets/fireball.png');
            load.image('sword', 'assets/sword.png');
            load.image('bolt', 'assets/fierball.png');
            load.image('cobble', 'assets/bril.png');            
        }

        function loadItemsAssets(){
            load.image('door', 'assets/openDoor.png');
            load.image('healthPotion', 'assets/hpPotion.png');            
        }

        function loadObstaclesAssets(){
            load.image('brick', 'assets/brick.png');
            load.image('brick1', 'assets/brick1.png');
            load.image('brick2', 'assets/brick2.png');            
        }
    },

    create: function() {
        this.asset.cropEnabled = false;
    },

    update: function() {
        // отладка, пропускаем меню
        this.player = new playersFactory.Wizard(this.game, 0, 0).model;

        if(!!this.ready) {
            this.game.state.start('play', true, false, 'center', this.player);
        }
    },

    onLoadComplete: function() {
        this.ready = true;
    }
};

module.exports = Preload;
