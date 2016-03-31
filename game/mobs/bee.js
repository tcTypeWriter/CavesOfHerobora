
module.exports = Bee;

var speed = 200;
var lowspeed = 100;
var vision_distance = 300;
var radius = 30;

function Bee(player, x, y) {
    var game = Bee.game;

    this.player = player;

    this.position = {x: x, y: y};
    this.hp = [5, 5];
    this.state = 'swirl';

    var bee = this.sprite = game.add.sprite(x + radius, y, 'bee');
    
    bee.anchor.set(0.5);
    game.physics.arcade.enable(bee);
    bee.body.collideWorldBounds = true;
    bee.body.bounce.setTo(0.3, 0.3);

    bee.body.velocity.y = lowspeed;
}

Bee.load = function(game) {
    var bee_texture = [
        '.......C',
        '....0.C.',
        '..0808D.',
        '.80808DD',
        '08080...',
        '0....C..'
    ];
    game.create.texture('bee', bee_texture, 6, 6, 0);
    this.game = game;
};

Bee.prototype.update = function(game) {
    var x = this.position.x;
    var y = this.position.y;
    
    if(this.state == 'swirl'){
        game.physics.arcade.accelerateToXY(this.sprite, x, y, lowspeed);
    } else {
        game.physics.arcade.moveToObject(this.sprite, this.player.sprite, lowspeed);
    }

    if(game.physics.arcade.distanceToXY(this.player.sprite, x, y) < vision_distance){
        this.state = 'chase';
    } else
        this.state = 'swirl';
};