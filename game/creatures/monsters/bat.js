'use strict';

var speed = 100;
var lowspeed = 40;
var vision_distance = 250;
var attack_distance = 200;
var radius = 20;

var skillFactory = require('skillFactory');
var BaseMonster = require('./baseMonster');

function Bat(game, point, player) {
    BaseMonster.call(this, game, point, player, 'bat');
    this.scale = new Phaser.Point(0.4, 0.4);

    this.body.setSize(100, 76, 0, -20);

    this.health = this.maxHealth = 5;

    this.skill = skillFactory.createSkill('Bolt', game);

    this.state = {
        base: point,
        urge: 'patrol',
        moving: false,
        patrol: getPatrolPoints(point),
        patrolIndex: 0
    };
}

Bat.prototype = Object.create(BaseMonster.prototype);
Bat.prototype.constructor = Bat;
Bat.prototype.Name = "Bat";

Bat.prototype.update = function() {
    if(!this.alive) return;
    
    var self = this,
        state = this.state,
        base = state.base,
        x = base.x,
        y = base.y;
    
    var playerIsClose = this.physics.distanceToXY(this.player, x, y) < vision_distance;
    state.urge = playerIsClose ? 'chasing' : 'patrol';

    if(state.urge === 'patrol' && !state.moving){
        state.moving = true;
        state.patrolIndex = (state.patrolIndex + 1) % state.patrol.length;
        state.goal = state.patrol[ state.patrolIndex ];
        moveTo(state.goal, lowspeed);
    }

    if(self.physics.distanceToXY(self, state.goal.x, state.goal.y) < 2 ) {
        self.body.velocity.setTo(0, 0);
        state.moving = false;            
    }

    if(state.urge === 'chasing'){
        moveTo(self.player, speed);
        state.moving = false;
    }

    function moveTo(p, speed){
        self.physics.moveToObject(self, p, speed);
    }

    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
       this.skill.ready()){
        var skill = this.skill(this.game, this, this.player);
        this.events.onCastSkill.dispatch(skill);
    }
};

module.exports = Bat;


function getPatrolPoints(point){
    var dfi = Math.PI / 8,
        res = [];
    for(var i = 0; i < Math.PI * 2; i += dfi){
        res.push({
            x: point.x + radius*Math.cos(i),
            y: point.y + radius*Math.sin(i)
        });
    }
    return res;
}