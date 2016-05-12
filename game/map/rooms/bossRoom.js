'use strict';

var BaseRoom = require('./baseroom');
var roomData = require('./roomData');

function BossRoom(game, key) {
    BaseRoom.call(this, game, key);
    var data = roomData[key];

    this.model.monsters = data.monsters || this.model.monsters;
    this.model.items = data.items || this.model.items;
    
    this.background = 'brick1';
}

BossRoom.prototype = Object.create(BaseRoom.prototype);
BossRoom.prototype.constructor = BossRoom;

BaseRoom.prototype.addingMonster = function(monster, monsterModel){
    if(monsterModel.boss){
        this.boss = monster;
        this.boss_name = monsterModel.boss;

        this.hpBar = this.game.add.sprite(250, 570, 'hpBar');
        this.hpBar.scale.setTo(3, 1);

        this.hp = this.game.add.sprite(255, 574, 'hp');
        this.hp.width = this.hpBar.width - 10;
    }
};


BossRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    var self = this;

    self.doors.forEachAlive(function(door){
        door.close(condition);
    });

    function condition(){
        return self.monsters.countLiving() === 0;
    }
};

BossRoom.prototype.changeRoom = function(player, door){
    if(this.space.isDown)
        door.go(player.getModel());
};

BossRoom.prototype.additionalDebug = function(){
    var game = this.game;
    var st = this;

    var color = game.debug.color = 'white';

    game.debug.text(st.boss_name, 170, 580, color);

    st.hp.width = (st.hpBar.width - 10) * (st.boss.health / st.boss.maxHealth);
};

module.exports = BossRoom;