'use strict';

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var attack_distance = 200;
var radius = 10;


var skillFactory = require('../skills/skillFactory');

function Bat(game, point, player) {
    Phaser.Sprite.call(this, game, point.x + radius, point.y, 'bat');
    this.scale = new Phaser.Point(0.4, 0.4);

    
    game.physics.enable(this);
    this.body.setSize(90, 76, 19, 0);
    this.body.collideWorldBounds = true;
    this.body.velocity.y = lowspeed;

    this.body.mass = 8;
    this.events.onCastSkill = new Phaser.Signal();

    this.physics = game.physics.arcade;
    this.player = player;

    this.base = point;
    this.health = this.maxHealth = 5;
    this.state = 'swirl';

    this.skill = skillFactory.createSkill('Bolt', game);
}

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

Bat.prototype.update = function() {
    if(!this.alive) return;
    var x = this.base.x;
    var y = this.base.y;
    
    if(this.state == 'swirl'){
        this.physics.accelerateToXY(this, x, y, lowspeed);
    } else if(this.state == 'chase'){
        this.physics.accelerateToObject(this, this.player, speed);
    } else if(this.state == 'back')
        this.physics.accelerateToXY(this, x + radius, y, speed);


    if(this.physics.distanceToXY(this.player, x, y) < vision_distance){
        this.state = 'chase';
    } else if(this.physics.distanceToXY(this, x + radius, y) < 10 && this.state == 'back'){
        this.body.velocity.setTo(0, lowspeed);
        this.state = 'swirl';
    } else if (this.state == 'chase' || this.physics.distanceToXY(this, x, y) > vision_distance*0.7){
        this.state = 'back';
    }


    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
        this.skill.ready()){
        var skill = this.skill(this.game, {
                                                        x: this.x + this.width / 2, 
                                                        y:this.y + this.height / 2
                                                    }, this.player);
        this.events.onCastSkill.dispatch(skill);
    }

};

Bat.prototype.damage = function (amount) {
    if (this.alive && !this.immune)
    {
        this.health -= amount;
        this.immune = true;
        this.game.time.events.add(100, function(){
            this.immune = false;
        }, this)
        if (this.health <= 0)
        {
            this.kill();
        }
    }
    return this;
}

module.exports = Bat;