'use strict';

var Creature = require('../creature');

var buttons = {one:0, two: 1, three: 2};

function BasePlayer(game, x, y, sprite_key) {
    Creature.call(this, game, x, y, sprite_key);
    this.scale.setTo(0.3);

    this.health = this.maxHealth = 10;
    this.skill = this.defaultSkill = function(){};

    var self = this;

    setKeys();
  
    function setKeys(){
        self.keys = game.input.keyboard.addKeys({
                                        'up': Phaser.Keyboard.W,
                                        'left': Phaser.Keyboard.A,
                                        'down': Phaser.Keyboard.S,
                                        'right': Phaser.Keyboard.D,
                                        'take': Phaser.Keyboard.E,
                                        'one': Phaser.Keyboard.ONE,
                                        'two': Phaser.Keyboard.TWO,
                                        'three': Phaser.Keyboard.THREE
                                    });

        self.cursorKeys = game.input.keyboard.addKeys({
                                        'up': Phaser.Keyboard.I,
                                        'left': Phaser.Keyboard.J,
                                        'down': Phaser.Keyboard.K,
                                        'right': Phaser.Keyboard.L
                                    });
    }
}

BasePlayer.prototype = Object.create(Creature.prototype);
BasePlayer.prototype.constructor = BasePlayer;

BasePlayer.prototype.getItem = function(item){
    if(this.keys.take.isDown){
        item.impact(this);          
    }
};

BasePlayer.prototype.update = function(){
    var self = this;

    updateDirect();
    updateSpeed();
    updateSkillSet();
    tryUseSkill();
    debug(); 

    function updateDirect(){
        var velocityX = self.body.velocity.x;
        var direct = velocityX <= 0 ? -1 : 1;
        self.scale.x = direct * Math.abs(self.scale.x);    
    }

    function updateSpeed(){
        var keys = self.keys,
            velocity = new Phaser.Point(0, 0),
            speed = self.state.speed;

        if (keys.left.isDown)  velocity.x = -1;
        if (keys.right.isDown) velocity.x = 1;
        if (keys.up.isDown)    velocity.y = -1;
        if (keys.down.isDown)  velocity.y = 1;

        self.body.velocity = velocity.normalize()
                                     .multiply(speed, speed);
    }

    function updateSkillSet(){
        var keys = self.keys;

        for(var button in buttons)
            if(keys[button].isDown){
                setSkillOnce(buttons[button]);
                keys[button].isDown = false;
            }
    
        function setSkillOnce(i){
            if(!self.skillSet[i] || !self.skillSet[i].ready()) 
                return;

            self.skill = self.skillSet[i];
            self.events.onCastSkill.addOnce(self.restoreSkill, self);
        }
    }

    function tryUseSkill(){
        var pointer = self.game.input.activePointer,
            cursorKeys = self.cursorKeys;

        if(pointer.leftButton.isDown)
            castSkill(pointer);

        if(cursorKeys.up.isDown)
            castSkill({x: self.x, y: self.y - 200});
        if(cursorKeys.right.isDown)
            castSkill({x: self.x + 200, y: self.y});
        if(cursorKeys.down.isDown)
            castSkill({x: self.x, y: self.y + 200});
        if(cursorKeys.left.isDown)
            castSkill({x: self.x - 200, y: self.y});
    
        if(pointer.rightButton.isDown)
            self.restoreSkill();
    }


    function castSkill(to){
         if(self.skill.ready()){
            var skill = self.skill(self.game, self, to);
            self.events.onCastSkill.dispatch(skill);
        }  
    }

    function debug(){
        var game = self.game;
        var x = 10, y = 400;
        var color = game.debug.color;

        game.debug.text(hpInfo(), x, y, color);
        y += 20;
        game.debug.text("speed: " + self.state.speed, x, y, color);
        y += 20;
        game.debug.text(activeSkillInfo(), x, y, color);


        for(var i = 0; i < self.skillSet.length; i++)
            game.debug.text(skillInfo(i + 1, self.skillSet[i]), x, y + (i+1)* 20, color);

        function hpInfo(){
            return "player: " + self.health + "/" + 
                                self.maxHealth;
        }

        function activeSkillInfo(){
            return "activeSkill: " + self.skill.Name + "| " + 
                                     self.skill.calldown();
        }

        function skillInfo(i, skill){
            return '[' + i + ']:' + skill.Name + "| " +
                                    skill.calldown();
        }
    }
};

BasePlayer.prototype.restoreSkill = function(){
    this.skill = this.defaultSkill;
};


module.exports = BasePlayer;