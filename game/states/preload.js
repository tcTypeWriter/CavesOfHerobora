
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
        this.load.image('background', 'assets/background.png');

        var create = this.game.create;
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
        create.texture('door', door_data, 6, 6, 0);
        
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

        create.texture('player', player_data, 4, 4, 0);

        var bee_texture = [
            '.......C',
            '....0.C.',
            '..0808D.',
            '.80808DD',
            '08080...',
            '0....C..'
            ];

        create.texture('bee', bee_texture, 6, 6, 0);
        
        var fireball_texture = [
            '.77.',
            '7337',
            '7337',
            '.77.'
        ];
        
        create.texture('fireball', fireball_texture, 6, 6, 0);

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
