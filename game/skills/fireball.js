
module.exports = FireBall;

var speed = 400;
var time;
var timeout = 500;

function FireBall(p) {
    var game = FireBall.game;
    time = game.time.now + timeout;

    var fireball = game.add.sprite(p.x, p.y, 'fireball');
    fireball.checkWorldBounds = true;
    fireball.outOfBoundsKill = true;
    game.physics.arcade.enable(fireball);
    game.physics.arcade.moveToPointer(fireball, speed);

    fireball.body.rotation = game.physics.arcade.angleToPointer(fireball);
    
 //   fireball.body.collideWorldBounds = true;
    fireball.body.bounce.setTo(1, 1);
    fireball.damage = damage;

    return fireball;
}

FireBall.load = function(game) {
    var fireball_texture = [
        '.77.',
        '7337',
        '7337',
        '.77.'
    ];
    game.create.texture('fireball', fireball_texture, 6, 6, 0);
    this.game = game;
    time = game.time.now;
};

FireBall.ready = function() {
    return true;time < this.game.time.now;
}

function damage() {
    return 1;
}