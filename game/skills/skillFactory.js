var Fireball = require('./fireball');
var Bolt = require('./bolt');

/*
    Skill - конструктор:
        function(game, from, to)
    Skill - имеет метод cast(), создающий скил, и учитывающий таймер
            метод ready() - говорит о возможности использовать cast 
*/


module.exports = {
    Fireball: Fireball,
    Bolt: Bolt,

    createSkill: CreateSkill
};

function CreateSkill(skillName, game){
    var skill = this[skillName];

    var lastTime = 0,
        timeout = skill.prototype.timeout;


    var result = function(_game, _from, _to){
            lastTime = game.time.now;
            return new skill(_game, _from, _to);
    }

    result.ready = function() {
        return lastTime + timeout < game.time.now;
    }

    result.calldown = function() {
        var now = game.time.now;
        return lastTime + timeout > now ? lastTime + timeout - now : "OK";
    }
    
    result.NAME = skillName;

    return result;
}