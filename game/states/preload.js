
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

        this.load.image('background', 'assets/background.png');

        var door_data = [
                '0000',
                '5555',
                '6666',
                '6666',
                '6666',
                '6666',
                '5555',
                '0000'
            ];
        this.game.create.texture('door', door_data, 6, 6, 0);
        
        var player_data = [
            '.EEEE.BB',
            '.FFFFEBB',
            'EFDDDFE.',
            'EFD3FFE.',
            'EFD3FFE.',
            'EFDDDFE.',
            '.FFFFE..',
            '.EEEE...'
            ];

        this.game.create.texture('player', player_data, 4, 4, 0);

        /*
            Загрузка картинок
        */
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
