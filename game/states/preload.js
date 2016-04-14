
'use strict';
function Preload() {
    this.asset = null;
    this.ready = false;
}

Preload.prototype = {
    preload: function() {
        this.load.onLoadComplete.add(this.onLoadComplete, this);
        
        this.asset = this.add.sprite(800/2,600/2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        /*
            Загрузка картинок
        */
        this.load.image('door', 'assets/openDoor.png');
        this.load.image('wizard', 'assets/heroleft.png');
        this.load.image('warrior', 'assets/heroleft2.png');
      
        this.load.image('fireball', 'assets/fireball.png');
        this.load.image('sword', 'assets/sword.png');
        this.load.image('bolt', 'assets/fierball.png');
        this.load.image('cobble', 'assets/bril.png');


        this.load.image('bat', 'assets/monsters/bat.png');

        this.load.image('floor', 'assets/dungeon_sheet-1-1.png');
        this.load.image('brick', 'assets/brick.png');
        this.load.image('brick1', 'assets/brick1.png');
        this.load.image('brick2', 'assets/brick2.png');

        var create = this.game.create;
                   
        var sting_texture = [
            'C...',
            'CCCC',
            'C...'
        ];
        
        create.texture('sting', sting_texture, 3, 3, 0);
    },

    create: function() {
        this.asset.cropEnabled = false;
    },

    update: function() {
        if(!!this.ready) {
            this.game.state.start('play');
        }
    },

    onLoadComplete: function() {
        this.ready = true;
    }
};

module.exports = Preload;
