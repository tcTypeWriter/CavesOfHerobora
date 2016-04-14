'use strict';

var Character = require('./character');
var skillFactory = require('../skills/skillFactory');

var SPEED = 400;

function StandartPlayer(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);

    game.physics.enable(this);

    this.anchor.set(0.5);
    this.scale = new Phaser.Point(0.4, 0.4);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);

    this.ready = true;
    this.health = this.maxHealth = 10;
    this.activeSkill = skillFactory.createSkill('Fireball', game);
    this.skillSet = [ skillFactory.createSkill('Bolt', game) ];

    this.character = new Character();

    this.events.onCastSkill = new Phaser.Signal();
    this.events.onCastSkill.add(function(){
        this.ready = false;
        game.time.events.add(250, function(){
            this.ready = true;
        }, this);
    }, this);

    this.game = game;
    this.keys = game.input.keyboard.addKeys(
        {
            'up': Phaser.Keyboard.W,
            'left': Phaser.Keyboard.A,
            'down': Phaser.Keyboard.S,
            'right': Phaser.Keyboard.D,
            'one': Phaser.Keyboard.ONE,
            'two': Phaser.Keyboard.TWO,
            'three': Phaser.Keyboard.THRE
        }
    );
}

StandartPlayer.prototype = Object.create(Phaser.Sprite.prototype);
StandartPlayer.prototype.constructor = StandartPlayer;

StandartPlayer.prototype.update = function(){
    var self = this,
        physics = this.game.physics.arcade,
        pointer = this.game.input.activePointer,
        keys = this.keys;
        
    this.scale.x = pointer.x > self.x ? -0.4 : 0.4;
    this.body.velocity = evalVelocity();    

    checkSkillSet();
    tryUseSkill();
    debug();

    function checkSkillSet(){
        if(keys.one.isDown && self.activeSkill != self.skillSet[0]){
            setSkillOnce(0);
            keys.one.isDown = false;
        }
    }

    function setSkillOnce(i){
        var lastActiveSkill = self.activeSkill;
        self.activeSkill = self.skillSet[0];
        self.events.onCastSkill.addOnce(function(){
            this.activeSkill = lastActiveSkill;
        }, self);
    }

    function tryUseSkill(){
        if(pointer.isDown && self.activeSkill.ready() && self.ready){
            var skill = self.activeSkill(self.game, self.center(), pointer);
            self.events.onCastSkill.dispatch(skill);
        }
    }

    function evalVelocity(){
        var velocity = new Phaser.Point(0, 0);

        if (keys.left.isDown)  velocity.x = -1;
        if (keys.right.isDown) velocity.x = 1;
        if (keys.up.isDown)    velocity.y = -1;
        if (keys.down.isDown)  velocity.y = 1;

        return velocity.normalize().multiply(SPEED, SPEED);
    }

    function debug(){
        var game = self.game;
        var x = 10, y = 400;
        var color = game.debug.color;
        game.debug.text(activeSkillInfo(), x, y, color);
       
        for(var i = 0; i < self.skillSet.length; i++)
            game.debug.text(skillInfo(i + 1, self.skillSet[i]), x, y + (i+1)* 20, color);

        function activeSkillInfo(){
            return "activeSkill: " + self.activeSkill.NAME + "| " + 
                                     self.activeSkill.calldown();
        }

        function skillInfo(i, skill){
            return '[' + i + ']:' + skill.NAME + "| " +
                                    skill.calldown();
        }
    }
}

StandartPlayer.prototype.center = function() {
    return {
        x: this.x - this.width /2,
        y: this.y - this.health / 2
    };
}

module.exports = StandartPlayer;