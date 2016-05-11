'use strict';

function Creature(game, x, y, sprite_key) {
    Phaser.Sprite.call(this, game, x, y, sprite_key);
   
    this.game = game;

    game.physics.enable(this);
    this.anchor.set(0.5);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(0, 0);

    this.events.onCastSkill = new Phaser.Signal();

    this.skill = function(){};
    this.skillSet = [];
    this.immune = false;
    this.state = {
        immuneTime: 250,
        speed: 300
    };
}

Creature.prototype = Object.create(Phaser.Sprite.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.damage = function (amount) {
    var self = this; 

    if (this.alive && !this.immune)
    {
        //this.immune = true;
        this.health -= amount;

        this.game.time.events.add(this.immuneTime, resetImmune);
        
        if (this.health <= 0)
        {
            this.kill();
        }
    }
    return this;

    function resetImmune(){
        self.immune = false;
    }

};

Creature.prototype.heal = function (amount) {
    if (this.alive)
    {
        this.health += amount;
        if (this.health > this.maxHealth)
        {
            this.health = this.maxHealth;
        }
    }

    return this;
};

Creature.prototype.getModel = function() {
    return {
        x: this.x,
        y: this.y,

        health: this.health,
        maxHealth: this.maxHealth,
        
        skill: this.skill,
        skillSet: this.skillSet,
        state: this.state        
    };
};

Creature.prototype.setModel = function(data){
    this.x = data.x || this.x;
    this.y = data.y || this.y;

    this.health = data.health || this.health;
    this.maxHealth = data.maxHealth || this.maxHealth;
    
    this.skill = data.skill || this.skill;
    this.skillSet = data.skillSet || this.skillSet;
    this.state = data.state || this.state;
};

module.exports = Creature;