'use strict';

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var attack_distance = 200;
var radius = 10;

var timeout = 1000;

var skillFactory = require('../skills/skillFactory');

function Bee(game, x, y, player) {
    Phaser.Sprite.call(this, game, x + radius, y, 'bee');
    
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.y = lowspeed;

    this.physics = game.physics.arcade;
    this.player = player;

    this.base = {x: x, y: y};
    this.health = 5;
    this.state = 'swirl';
    this.lastTime = this.game.time.now
}

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;

Bee.prototype.update = function() {
    if(!this.alive) return;
    var x = this.base.x;
    var y = this.base.y;
    
    if(this.state == 'swirl'){
        this.physics.accelerateToXY(this, x, y, lowspeed);
    } else if(this.state == 'chase'){
        this.physics.moveToObject(this, this.player, speed);
    } else if(this.state == 'back')
        this.physics.moveToXY(this, x + radius, y, speed);


    if(this.physics.distanceToXY(this.player, x, y) < vision_distance){
        this.state = 'chase';
    } else if(this.physics.distanceToXY(this, x + radius, y) < 10 && this.state == 'back'){
        this.body.velocity.setTo(0, lowspeed);
        this.state = 'swirl';
    } else if (this.state == 'chase' || this.physics.distanceToXY(this, x, y) > vision_distance*0.7){
        this.state = 'back';
    }


    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
        this.lastTime + timeout < this.game.time.now){
        this.lastTime = this.game.time.now;
        var skill = new skillFactory.Sting(this.game, 
                                          this.x + this.width / 2, 
                                          this.y + this.height / 2,
                                          this.player);
        this.onCastSkill && this.onCastSkill(skill);
    }

};

module.exports = Bee;