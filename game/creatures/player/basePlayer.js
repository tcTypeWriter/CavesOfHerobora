'use strict';

var Creature = require('../creature');

function BasePlayer(game, x, y, sprite_key) {
    Creature.call(this, game, x, y, sprite_key);
    this.scale.setTo(0.3);

    this.health = this.maxHealth = 10;
    this.skill = function(){};

    this.state.coins =  2;

    var self = this;

    setKeys();
    setOnCastInterraptor();
  
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

    function setOnCastInterraptor(){
        self.readyToCast = true;
        self.events.onCastSkill.add(notReady);

        function notReady(){
            self.readyToCast = false;
            setTimeout(isReady, 100);
        }

        function isReady(){
            self.readyToCast = true;
        }
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
        var direct = velocityX <= 0 ? 1 : -1;
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
        if(self.keys.one.isDown && self.skillSet[0])
            self.skill = self.skillSet[0];
        if(self.keys.two.isDown && self.skillSet[1])
            self.skill = self.skillSet[1];
        if(self.keys.three.isDown && self.skillSet[2])
            self.skill = self.skillSet[2];
    }

    function tryUseSkill(){
        var cursorKeys = self.cursorKeys;

        if(cursorKeys.up.isDown)
            castSkill({x: self.x, y: self.y - 200});
        if(cursorKeys.right.isDown)
            castSkill({x: self.x + 200, y: self.y});
        if(cursorKeys.down.isDown)
            castSkill({x: self.x, y: self.y + 200});
        if(cursorKeys.left.isDown)
            castSkill({x: self.x - 200, y: self.y});
    }


    function castSkill(to){
         if(self.skill.ready() && self.readyToCast){
            var skill = self.skill(self.game, self, to);
            self.events.onCastSkill.dispatch(skill);
        }  
    }

    function debug(){
        var game = self.game;
        var x = 10, y = 20;
        var color = game.debug.color;

        game.debug.text(hpInfo(), x, y, color);
        y += 20;
        game.debug.text("speed: " + self.state.speed, x, y, color);
        y = 20;
        x += 140;
        game.debug.text("coins: " + self.state.coins, x, y, color);
        y += 20;
        game.debug.text(activeSkillInfo(), x, y, color);
        
        function hpInfo(){
            return "health: " + self.health + "/" + 
                                self.maxHealth;
        }

        function activeSkillInfo(){
            return "skill: " + self.skill.Name + "|" + 
                                     self.skill.calldown();
        }
    }
};


module.exports = BasePlayer;