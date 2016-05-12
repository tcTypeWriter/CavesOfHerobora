'use strict';

var Door = function(game, position, room) {
    Phaser.Sprite.call(this, game, 0, 0, 'door');
    game.physics.enable(this);
    this.anchor.set(0.5);

    this.game = game;

    this.room = room;
    this.state = game.state;

    this.open = true;

    var width = this.width,
        height = this.height;

    this.x = getX(position);
    this.y = getY(position); 
    this.door_position = position;

    function getX(position){
        if(position === 'left')
            return width / 2;
        if(position === 'right')
            return game.world.width - width / 2;
        return game.world.centerX;
    }

    function getY(position){
        if(position === 'up')
            return width / 2;
        if(position === 'down')
            return game.world.height - height / 2;
        return game.world.centerY;

    }
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.go = function(player_model){
    if(this.open){
        this.state.start(this.room.key, true, false, 
                                    this.door_position, 
                                    player_model);
    }
};

Door.prototype.close = function(condition){
    this.open = false;
    this.condition = condition;
    this.closeSprite = this.game.add.sprite(this.x - this.width / 2,
                                            this.y - this.height / 2, 'closedDoor');
};

Door.prototype.update = function(){
    if(this.condition && this.condition()){
        this.open = true;
        this.closeSprite.destroy();
    }
};

module.exports = Door;
