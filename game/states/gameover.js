'use strict';

function GameOver() {}

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
            this.game.state.start('chooseplayer');
        }
    }
};

module.exports = GameOver;
