
module.exports = Bee;

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var radius = 10;

function Bee(player, x, y) {
    var game = Bee.game;

    var bee = this.sprite = game.add.sprite(x + radius, y, 'bee');

    bee.player = player;
    bee.base = {x: x, y: y};
    bee.hp = [5, 5];
    bee.state = 'swirl';
    
    game.physics.enable(bee, Phaser.Physics.ARCADE);
    bee.body.collideWorldBounds = true;
    bee.body.velocity.y = lowspeed;

    bee.Update = Update;

    return bee;
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
function Update(game) {
    var x = this.base.x;
    var y = this.base.y;
    
    if(this.state == 'swirl'){
        game.physics.arcade.accelerateToXY(this, x, y, lowspeed);
    } else if(this.state == 'chase'){
        game.physics.arcade.moveToObject(this, this.player.sprite, speed);
    } else if(this.state == 'back')
        game.physics.arcade.moveToXY(this, x + radius, y, speed);


    if(game.physics.arcade.distanceToXY(this.player.sprite, x, y) < vision_distance){
        this.state = 'chase';
    } else if(game.physics.arcade.distanceToXY(this, x + radius, y) < 10 && this.state == 'back'){
        this.body.velocity.setTo(0, lowspeed);
        this.state = 'swirl';
    } else if (this.state == 'chase'){
        this.state = 'back';
    }
};