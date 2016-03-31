
module.exports = Player;

var Character = require('./character.js');
var Equip = require('./equip.js');

function Player(argument) {
    this.name = "UserName";

    this.hp = [8, 10, [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10]];

    this.character = new Character();
    this.equip = new Equip();
    this.skills = [];
    this.inventory = [];
}

Player.prototype.load = function(game) {
    var player_texture = [
        '.EEEE.BB',
        '.FFFFEBB',
        'EFDDDFE.',
        'EFD3FFE.',
        'EFD3FFE.',
        'EFDDDFE.',
        '.FFFFE..',
        '.EEEE...'
    ];
    game.create.texture('player', player_texture, 4, 4, 0);


    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(1, 1);

    this.keys = game.input.keyboard.addKeys(
        {
            'up': Phaser.Keyboard.W,
            'left': Phaser.Keyboard.A,
            'down': Phaser.Keyboard.S,
            'right': Phaser.Keyboard.D,
        }
    );
};

Player.prototype.update = function(game) {
    var keys = this.keys;
    player.rotation = game.physics.arcade.angleToPointer(player);

    player.body.velocity.setTo(0, 0)

    if (keys.left.isDown)
        player.body.velocity.x = -100;
    
    if (keys.right.isDown)
        player.body.velocity.x = 100;
    
    if (keys.up.isDown)
        player.body.velocity.y = -100;
    
    if (keys.down.isDown)
        player.body.velocity.y = 100;
};