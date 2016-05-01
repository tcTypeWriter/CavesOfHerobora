'use strict';

var speed = 100;
var lowspeed = 50;
var vision_distance = 250;
var attack_distance = 200;
var radius = 10;


var skillFactory = require('../skills/skillFactory');
var BaseMonster = require('./baseMonster');

function Bat(game, point, player) {
    var position = {x: point.x + radius, y: point.y};

    BaseMonster.call(this, game, position, player, 'bat');
    this.scale = new Phaser.Point(0.4, 0.4);

    this.body.setSize(90, 76, 19, 0);
    this.body.velocity.y = lowspeed;

    this.body.mass = 8;

    this.health = this.maxHealth = 5;
    this.skill = skillFactory.createSkill('Bolt', game);

    this.state = {
        base: point,
        urge: 'swirl'
    };
}

Bat.prototype = Object.create(BaseMonster.prototype);
Bat.prototype.constructor = Bat;
Bat.prototype.Name = "Bat";

Bat.prototype.update = function() {
    if(!this.alive) return;
    
    var state = this.state,
        base = state.base,
        x = base.x,
        y = base.y;
    
    if(state.urge === 'swirl'){
        this.physics.accelerateToObject(this, base, lowspeed);
    } else if(state.urge === 'chase'){
        this.physics.accelerateToObject(this, this.player, speed);
    } else if(state.urge === 'back')
        this.physics.accelerateToXY(this, x + radius, y, speed);


    if(this.physics.distanceToXY(this.player, x, y) < vision_distance){
        state.urge = 'chase';
    } else if(this.physics.distanceToXY(this, x + radius, y) < 10 && state.urge == 'back'){
        this.body.velocity.setTo(0, lowspeed);
        state.urge = 'swirl';
    } else if (state.urge === 'chase' || this.physics.distanceToXY(this, x, y) > vision_distance*0.7){
        state.urge = 'back';
    }


    if(this.physics.distanceBetween(this.player, this) < attack_distance && 
        this.skill.ready()){
        var skill = this.skill(this.game, {
                                                        x: this.x + this.width / 2, 
                                                        y: this.y + this.height / 2
                                                    }, this.player);
        this.events.onCastSkill.dispatch(skill);
    }

};

module.exports = Bat;