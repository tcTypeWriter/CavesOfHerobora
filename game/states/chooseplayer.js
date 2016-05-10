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
