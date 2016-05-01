'use strict';

function BaseMonster(game, point, player, sprite_key) {
    Phaser.Sprite.call(this, game, point.x, point.y, sprite_key);
    
    game.physics.enable(this);
    this.physics = game.physics.arcade;
    this.body.collideWorldBounds = true;

    this.immune = false;
    this.player = player;
    this.events.onCastSkill = new Phaser.Signal();
}

BaseMonster.prototype = Object.create(Phaser.Sprite.prototype);
BaseMonster.prototype.constructor = BaseMonster;

BaseMonster.prototype.damage = function (amount) {
    if (this.alive && !this.immune)
    {
        this.health -= amount;
        this.immune = true;

        this.game.time.events.add(100, function(){
            this.immune = false;
        }, this);
        
        if (this.health <= 0)
        {
            this.kill();
        }
    }
    return this;
};


BaseMonster.prototype.getModel = function() {
    return {
        x: this.x,
        y: this.y,
        health: this.health,
        maxHealth: this.maxHealth,
        state: this.state
    };
};

BaseMonster.prototype.setModel = function(data){
    this.x = data.x || this.x;
    this.y = data.y || this.y;
    this.health = data.health || this.health;
    this.maxHealth = data.maxHealth || this.maxHealth;
    this.state = data.state || this.state
};

module.exports = BaseMonster;