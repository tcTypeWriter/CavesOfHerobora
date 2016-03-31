'use strict';

require('style.css');
require('interface.css');
require('inventory.css');
require('character.css');

var angular = require('angular');
var gameRun = require('./game');

angular.module('app', []);
gameRun({}); 