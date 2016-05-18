'use strict';

var BaseItem = require('./baseitem');
var skillFactory = require('skillfactory');

var SkillShop = function(game, data) {
    BaseItem.call(this, game, data, 'roll');
    this.scale.setTo(0.2, 0.2);

    this.state.skill = data.skill;
    this.state.sprite = data.sprite;
    this.state.cost = data.cost;
    this.setSprite();
};

SkillShop.prototype = Object.create(BaseItem.prototype);
SkillShop.prototype.constructor = SkillShop;
SkillShop.prototype.Name = "SkillShop";

SkillShop.prototype.impact = function(player){
    if(player.state.coins < this.state.cost) return;

    player.state.coins -= this.state.cost;
    player.skillSet.push(skillFactory.createSkill(this.state.skill, this.game));

    this.sprite.destroy();
    this.text.destroy();
    this.destroy();
};

SkillShop.prototype.setModel = function(data){
    BaseItem.prototype.setModel.call(this, data);
    this.setSprite();
};

SkillShop.prototype.setSprite = function()
{
    if(!this.state.sprite || this.sprite) return;

    var style = { font: '12px Arial', fill: '#FFF'};

    this.sprite = this.game.add.sprite(this.x - this.width / 2 + 5, 
                                       this.y - this.height / 2 + 3, this.state.sprite);

    this.sprite.width = this.width - 10;
    this.sprite.height = this.height - 10;

    this.text = this.game.add.text(this.x - this.width / 2 - 5, this.y + this.height / 2, 
                                    this.state.cost + " coins", style);
};

module.exports = SkillShop;
