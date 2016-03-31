'use strict';

require('style.css');
require('interface.css')

var angular = require('angular');
var gameRun = require('./game');

angular.module('app', []);
gameRun({}); 