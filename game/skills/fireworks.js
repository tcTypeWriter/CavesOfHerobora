'use strict';

var BaseSkill = require('./baseskill'); 

var speed = 400;
var power = 1;

var numberOfFireballs = 8;

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

    if(!isClose || this.run) return;
    this.boom();
};

Fireworks.prototype.impact = function(){
    this.goal = { 
        x: this.x - 0.09*this.body.velocity.x,
        y: this.y - 0.09*this.body.velocity.y        
    };
    this.boom();
};

Fireworks.prototype.boom = function(){
    this.run = true;

    var self = this;
    var game = self.game;

    var dfi = 2*Math.PI / numberOfFireballs;
    var startAngle = 0;

    this.game.time.events.add(100, wave);
    this.game.time.events.add(200, wave);
    this.game.time.events.add(300, wave);
    this.kill();

    function wave(){
        for(var i = startAngle; i <  2*Math.PI + startAngle; i += dfi){
            var to = {
                    x: self.goal.x + 20*Math.cos(i),
                    y: self.goal.y + 20*Math.sin(i)
                };
            var fireball = new Fire(game, self.goal, to);
            self.events.onCastSkill.dispatch(fireball);
        }    
        startAngle += dfi / 2;
    } 
};


Fireworks.prototype.timeout = 1000;
module.exports = Fireworks;


function Fire(game, from, to) {
    BaseSkill.call(this, game, from, to, 'fireball');
    this.scale.setTo(0.06, 0.06);
    
    game.physics.arcade.moveToObject(this, to, 200);
    this.body.angularVelocity = 200 + Math.random() * 500;

    game.time.events.add(300, this.destroy, this);
}

Fire.prototype = Object.create(BaseSkill.prototype);
Fire.prototype.constructor = Fire;

Fire.prototype.impact = function(mob){
    mob.damage(1);
    this.kill();
};