'use strict';

var Fireball = require('./fireball');
var Bolt = require('./bolt');
var Cobble = require('./cobble');
var Bite = require('./bite');
var Fireworks = require('./fireworks');
var Deathball = require('./deathball');
var Yapona_mat = require('./yapona_mat');
var Recoil = require('./recoil');
var SkeletonSpawn = require('./skeletonSpawn');
var SkeletonBall = require('./skeletonBall');
var Reincarnation = require('./reincarnation');

var Sword = require('./sword');

var Natures_call = require('./natures_call');

var e = module.exports;

e.Recoil = Recoil;
e.Fireball = Fireball;
e.Bolt = Bolt;
e.Cobble = Cobble;
e.Bite = Bite;
e.Fireworks = Fireworks;
e.Deathball = Deathball;
e.Yapona_mat = Yapona_mat;
e.SkeletonSpawn = SkeletonSpawn;
e.SkeletonBall = SkeletonBall;
e.Reincarnation = Reincarnation;

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
        timeout *= (100 - percent) / 100;
        timeout = Math.round(timeout);
    };

    result.Name = skillName;

    return result;
};