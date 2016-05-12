'use strict';

var BaseSkill = require('./baseskill'); 
var skillFactory = require('./skillfactory');

var speed = 700;
var power = 1;

var numberOfFireballs = 16;

function Fireworks(game, from, to) {
    BaseSkill.call(this, game, from, to, 'fireball');
    this.scale.setTo(0.06, 0.06);
    game.physics.arcade.moveToObject(this, to, speed);

    this.body.rotation = game.physics.arcade.angleBetween(this, to);
    
    this.power = power;
    this.goal = to;

    this.events.onCastSkill = new Phaser.Signal();
}

Fireworks.prototype = Object.create(BaseSkill.prototype);
Fireworks.prototype.constructor = Fireworks;

Fireworks.prototype.update = function() {
    var isClose = this.game.physics.arcade.distanceToXY(this.goal, this.x, this.y) < 20;

    if(!isClose) return;

    var dfi = 2*Math.PI / numberOfFireballs;
    for(var i = 0; i <  2*Math.PI; i += dfi){
        var to = {
            x: this.goal.x + 20*Math.cos(i),
            y: this.goal.y + 20*Math.sin(i)
        };
        var fireball = new skillFactory.Fireball(this.game, this.goal, to);
        this.events.onCastSkill.dispatch(fireball);
    }

    this.kill();
};


Fireworks.prototype.timeout = 500;
module.exports = Fireworks;