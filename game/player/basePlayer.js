'use strict';

var Character = require('./character');

function BasePlayer(game, x, y, sprite_key) {
    Phaser.Sprite.call(this, game, x, y, sprite_key);
    var self = this;

    setModel();
    setPhysics();
    addOnCastSkillEvent();

    this.game = game;
    this.keys = game.input.keyboard.addKeys({
                                    'up': Phaser.Keyboard.W,
                                    'left': Phaser.Keyboard.A,
                                    'down': Phaser.Keyboard.S,
                                    'right': Phaser.Keyboard.D,
                                    'one': Phaser.Keyboard.ONE,
                                    'two': Phaser.Keyboard.TWO,
                                    'three': Phaser.Keyboard.THRE
                                });

    function setModel(){
        self.ready = true;
        self.character = new Character();
        self.speed = 300;
        self.scale_k = 0.4;
        self.health = self.maxHealth = 10;
        self.autoSkill = function(){};
        self.activeSkill = function(){};
        self.skillSet = [];
    }

    function setPhysics(){
        game.physics.enable(self);
        self.anchor.set(0.5);
        self.scale.setTo(self.scale_k, self.scale_k);
        self.body.collideWorldBounds = true;
        self.body.bounce.setTo(0, 0);
    }
    
    function addOnCastSkillEvent(){
        self.events.onCastSkill = new Phaser.Signal();
        self.events.onCastSkill.add(notReady, self);

        function notReady(){
            this.ready = false;
            game.time.events.add(250, isReady, this);

            function isReady(){ this.ready = true; }
        }
    }
}

BasePlayer.prototype = Object.create(Phaser.Sprite.prototype);
BasePlayer.prototype.constructor = BasePlayer;

BasePlayer.prototype.update = function(){
    var self = this,
        physics = this.game.physics.arcade,
        pointer = this.game.input.activePointer,
        keys = this.keys;
        
    this.scale.x = (pointer.x > self.x ? -1 : 1) * this.scale_k;
    this.body.velocity = evalVelocity();    

    checkSkillSet();
    tryUseSkill();
    debug();

    function checkSkillSet(){
        var buttons = {one:0, two: 1, three: 2};
        for(var button in buttons)
            if(keys[button].isDown){
                setSkillOnce(buttons[button]);
                keys[button].isDown = false;
            }
    
        function setSkillOnce(i){
            if(!self.skillSet[i] || !self.skillSet[i].ready()) return;

            self.activeSkill = self.skillSet[i];
            self.events.onCastSkill.addOnce(backSkill);

            function backSkill(){ self.activeSkill = self.autoSkill; }
        }
    }

    function tryUseSkill(){
        if(pointer.isDown && self.activeSkill.ready() && self.ready){
            var skill = self.activeSkill(self.game, self, pointer);
            self.events.onCastSkill.dispatch(skill);
        }
    }

    function evalVelocity(){
        var velocity = new Phaser.Point(0, 0);

        if (keys.left.isDown)  velocity.x = -1;
        if (keys.right.isDown) velocity.x = 1;
        if (keys.up.isDown)    velocity.y = -1;
        if (keys.down.isDown)  velocity.y = 1;

        return velocity.normalize().multiply(self.speed, self.speed);
    }

    function debug(){
        var game = self.game;
        var x = 10, y = 400;
        var color = game.debug.color;

        game.debug.text(hpInfo(), x, y, color);
        y += 20;
        game.debug.text(activeSkillInfo(), x, y, color);
       
        for(var i = 0; i < self.skillSet.length; i++)
            game.debug.text(skillInfo(i + 1, self.skillSet[i]), x, y + (i+1)* 20, color);

        function hpInfo(){
            return "player: " + self.health + "/" + 
                                self.maxHealth;
        }

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

module.exports = BasePlayer;