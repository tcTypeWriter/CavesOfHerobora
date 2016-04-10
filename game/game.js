require('style.css');

var BootState = require('./states/boot');  
var PreloadState = require('./states/preload');
var GameOver = require('./states/gameover');  

var mapFactory = require('./states/mapfactory');

window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
    
    game.state.add('boot', BootState);
    game.state.add('gameover', GameOver);
    game.state.add('play', mapFactory.SimpleMap);
    game.state.add('preload', PreloadState);  
      
    game.state.start('boot');
}

