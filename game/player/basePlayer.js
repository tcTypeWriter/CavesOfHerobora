'use strict';

var Character = require('./character');

var buttons = {one:0, two: 1, three: 2};

var default_model = {
        name: 'BasePlayer',
        ready: true,
        character: new Character(),
        inventory: [],

        speed: 300,
        health: 10,
        maxHealth: 10,

        autoSkill: function(){},
        activeSkill: function(){},
        skillSet: []
    }; 


function BasePlayer(game, x, y, sprite_key, player_model) {
    Phaser.Sprite.call(this, game, x, y, sprite_key);
    var self = this;

    setPhysics();
    setOnCastSkillEvent();

    this.model = player_model || default_model;
    this.restoreSkills();

    this.game = game;
    this.keys = game.input.keyboard.addKeys({
                                    'up': Phaser.Keyboard.W,
                                    'left': Phaser.Keyboard.A,
                                    'down': Phaser.Keyboard.S,
                                    'right': Phaser.Keyboard.D,
                                    'take': Phaser.Keyboard.E,
                                    'one': Phaser.Keyboard.ONE,
                                    'two': Phaser.Keyboard.TWO,
                                    'three': Phaser.Keyboard.THREE
                                });
    this.cursorKeys = game.input.keyboard.createCursorKeys();

    function setPhysics(){
        game.physics.enable(self);
        self.anchor.set(0.5);
        self.scale.setTo(0.4);

        self.body.collideWorldBounds = true;
        self.body.bounce.setTo(0, 0);
    }
    
    function setOnCastSkillEvent(){
        self.events.onCastSkill = new Phaser.Signal();
        self.events.onCastSkill.add(notReady);

        function notReady(){
            self.model.ready = false;
            game.time.events.add(250, isReady, self);

            function isReady(){ self.model.ready = true; }
        }
    }
}

BasePlayer.prototype = Object.create(Phaser.Sprite.prototype);
BasePlayer.prototype.constructor = BasePlayer;

BasePlayer.prototype.getItem = function(item){
    var take = this.keys.take;
    
    if(take.isDown){
        item.impact(this);          
    }
};

BasePlayer.prototype.update = function(){
    var self = this,
        pointer = this.game.input.activePointer,
        keys = this.keys;
       
    updateDirect();
    updateSpeed();
    updateSkillSet();
    tryUseSkill();
    debug(); 

    function updateDirect(){
        var direct = pointer.x > self.x ? -1 : 1;
        self.scale.x = direct * Math.abs(self.scale.x);    
    }

    function updateSpeed(){
        var velocity = new Phaser.Point(0, 0),
            speed = self.model.speed;

        if (keys.left.isDown)  velocity.x = -1;
        if (keys.right.isDown) velocity.x = 1;
        if (keys.up.isDown)    velocity.y = -1;
        if (keys.down.isDown)  velocity.y = 1;

        self.body.velocity = velocity.normalize()
                                     .multiply(speed, speed);
    }


    function updateSkillSet(){
        for(var button in buttons)
            if(keys[button].isDown){
                setSkillOnce(buttons[button]);
                keys[button].isDown = false;
            }
    
        function setSkillOnce(i){
            if(!self.skillSet[i] || !self.skillSet[i].ready()) 
                return;

            self.activeSkill = self.skillSet[i];
            self.events.onCastSkill.addOnce(restoreSkill);
        }
    }

    function tryUseSkill(){
        var cursorKeys = self.cursorKeys;

        if(pointer.leftButton.isDown)
            useActiveSkill(pointer);

        if(cursorKeys.up.isDown)
            useActiveSkill({x: self.x, y: self.y - 200});
        if(cursorKeys.right.isDown)
            useActiveSkill({x: self.x + 200, y: self.y});
        if(cursorKeys.down.isDown)
            useActiveSkill({x: self.x, y: self.y + 200});
        if(cursorKeys.left.isDown)
            useActiveSkill({x: self.x - 200, y: self.y});
    
        if(pointer.rightButton.isDown)
            restoreSkill();
    }


    function useActiveSkill(to)
    {
         if(self.activeSkill.ready() && self.model.ready){
            var skill = self.activeSkill(self.game, self, to);
            self.events.onCastSkill.dispatch(skill);
        }  
    }


    function restoreSkill(){ 
        self.activeSkill = self.autoSkill; 
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
            return "player: " + self.model.health + "/" + 
                                self.model.maxHealth;
        }

        function activeSkillInfo(){
            return "activeSkill: " + self.activeSkill.Name + "| " + 
                                     self.activeSkill.calldown();
        }

        function skillInfo(i, skill){
            return '[' + i + ']:' + skill.Name + "| " +
                                    skill.calldown();
        }
    }
};

BasePlayer.prototype.damage = function (amount) {
    if (this.alive)
    {
        this.model.health -= amount;
        if (this.model.health <= 0)
        {
            this.kill();
        }
    }

    return this;
};

BasePlayer.prototype.heal = function (amount) {
    if (this.alive)
    {
        this.model.health += amount;
        if (this.model.health > this.model.maxHealth)
        {
            this.model.health = this.model.maxHealth;
        }
    }

    return this;
};

BasePlayer.prototype.setModel = function(model) {
    this.model = model;
    this.restoreSkills();
};

BasePlayer.prototype.restoreSkills = function(){
    this.autoSkill = this.model.autoSkill;
    this.activeSkill = this.model.activeSkill;
    this.skillSet = this.model.skillSet;
};



module.exports = BasePlayer;