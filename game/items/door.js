'use strict';

var Door = function(game, position, room) {
    Phaser.Sprite.call(this, game, 0, 0, 'door');
    game.physics.enable(this);
    this.anchor.set(0.5);

    this.room = room;
    this.state = game.state;



    var width = this.width,
        height = this.height;

    this.x = getX(position);
    this.y = getY(position); 
    this.angle = getAngle(position);

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
            return game.world.height - width / 2;
        return game.world.centerY;

    }

    function getAngle(position)
    {
        return position === 'left' || position === 'right' ? 0 : 90; 
    }

};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.go = function(){
    this.state.start(this.room.key);
}

module.exports = Door;
