'use strict';

var BaseSkill = require('./baseskill'); 


function Natures_call(game, from, to) {
    BaseSkill.call(this, game, from, to, 'natures_call');  
}

Natures_call.prototype = Object.create();
Natures_call.prototype.constructor = Natures_call;

Natures_call.prototype.impact = function(mob){

}

Natures_call.prototype.timeout = 3228;
module.exports = Natures_call;