'use strict';

var BootState = require('./states/boot');  
var PreloadState = require('./states/preload');
var ChoosePlayer = require('./states/chooseplayer');
var GameOver = require('./states/gameover');  

var mapFactory = require('mapfactory');
var game;

window.onload = function () {
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
    
    game.state.add('boot', BootState);
    game.state.add('gameover', GameOver);
    game.state.add('chooseplayer', ChoosePlayer);
    game.state.add('empty', mapFactory.SimpleMap);
    game.state.add('preload', PreloadState);  
      
    game.state.start('boot');
};

module.exports = function () {
    return game;
};