'use strict';

var Fireball = require('./fireball');
var Bolt = require('./bolt');
var Cobble = require('./cobble');
var Bite = require('./bite');

var Sword = require('./sword');

module.exports = {
    Fireball: Fireball,
    Bolt: Bolt,
    Cobble: Cobble,
    Bite: Bite,
    
    Sword: Sword,

    createSkill: function(skillName, game){
        var skill = this[skillName];

        var lastTime = 0,
            timeout = skill.prototype.timeout;

        var result = function(_game, _from, _to){
                lastTime = game.time.now;
                return new skill(_game, _from, _to);
        };

        result.ready = function() {
            return lastTime + timeout < game.time.now;
        };

        result.calldown = function() {
            var now = game.time.now;
            return lastTime + timeout > now ? lastTime + timeout - now : "OK";
        };

        result.Name = skillName;

        return result;
    }
};