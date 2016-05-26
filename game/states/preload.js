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
