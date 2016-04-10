require('style.css');

var BootState = require('./states/boot');  
var PreloadState = require('./states/preload');
var PlayState = require('./states/play');  


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

game.state.add('boot', BootState);
game.state.add('preload', PreloadState);  
game.state.add('play', PlayState);
  
game.state.start('boot');
