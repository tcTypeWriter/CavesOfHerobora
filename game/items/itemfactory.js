'use strict';

var Door = require('./door');
var HealthPotion = require('./healthpotion');
var SpeedPotion = require('./speedpotion');
var CalldownPotion = require('./calldownpotion');
var Roll = require('./roll.js');
var Coin = require('./coin.js');
var SkillShop = require('./skillshop');

module.exports = {
    Door: Door,
    HealthPotion: HealthPotion,
    SpeedPotion: SpeedPotion,
    CalldownPotion: CalldownPotion,
    Roll: Roll,
    Coin: Coin,
    SkillShop: SkillShop
};