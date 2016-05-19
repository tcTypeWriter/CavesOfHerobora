'use strict';

var Fireball = require('./fireball');
var Bolt = require('./bolt');
var Cobble = require('./cobble');
var Bite = require('./bite');
var Fireworks = require('./fireworks');
var Deathball = require('./deathball');
var Yapona_mat = require('./yapona_mat');

var SkeletonSpawn = require('./skeletonSpawn');

var Sword = require('./sword');

var Natures_call = require('./natures_call');

var Branch_spawn = require('./branch_spawn');

var e = module.exports;

e.Fireball = Fireball;
e.Bolt = Bolt;
e.Cobble = Cobble;
e.Bite = Bite;
e.Fireworks = Fireworks;
e.Deathball = Deathball;
e.Yapona_mat = Yapona_mat;
e.SkeletonSpawn = SkeletonSpawn;

e.Sword = Sword;

e.Natures_call = Natures_call;

e.Branch_spawn = Branch_spawn;

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
        return lastTime + timeout > now ? lastTime + timeout - now : "Ready";
    };

    result.reduce = function(percent){
        timeout *= (100 - percent) / 100;
        timeout = Math.round(timeout);
    };

    result.Name = skillName;

    return result;
};