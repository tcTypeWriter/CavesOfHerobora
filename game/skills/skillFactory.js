'use strict';

var Fireball = require('./fireball');
var Bolt = require('./bolt');
var Cobble = require('./cobble');
var Bite = require('./bite');
var Fireworks = require('./fireworks');

var Sword = require('./sword');

var Natures_call = require('./natures_call');


var e = module.exports;

e.Fireball = Fireball;
e.Bolt = Bolt;
e.Cobble = Cobble;
e.Bite = Bite;
e.Fireworks = Fireworks;
    
e.Sword = Sword;

e.Natures_call = Natures_call;

e.createSkill = function(skillName, game){
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

    result.reduce = function(percent){
        var timeLeft = game.time.now - lastTime;
        if(timeLeft <= 0) return;

        lastTime = timeLeft * percent / 100;
    };

    result.Name = skillName;

    return result;
};