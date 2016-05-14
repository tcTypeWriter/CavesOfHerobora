'use strict';

var BaseItem = require('./baseitem');
var book = require('../book/book');

var Roll = function(game, position) {
    BaseItem.call(this, game, position, 'roll');
    this.scale.setTo(0.2, 0.2);

    this.state.type = position.type;
    this.state.thing = position.thing;
    this.state.sprite = position.sprite;
    this.setSprite();
};

Roll.prototype = Object.create(BaseItem.prototype);
Roll.prototype.constructor = Roll;
Roll.prototype.Name = "Roll";

Roll.prototype.impact = function(){
    book.show(this.state.type,  this.state.thing);
    this.sprite.destroy();
    this.destroy();
};

Roll.prototype.setModel = function(data){
    BaseItem.prototype.setModel.call(this, data);
    this.setSprite();
};

Roll.prototype.setSprite = function()
{
    if(!this.state.sprite || this.sprite) return;

    this.sprite = this.game.add.sprite(this.x - this.width / 2 + 5, 
                                       this.y - this.height / 2 + 3, this.state.sprite);

    this.sprite.width = this.width - 10;
    this.sprite.height = this.height - 10;
};

module.exports = Roll;
