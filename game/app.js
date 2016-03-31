require('style.css');
require('interface.css');
require('inventory.css');
require('character.css');

var angular = require('angular');
var engine = require('./game.js');

var Player = require('./player/player.js')

var game = angular.module('game', []);

game.controller("main", ["$scope", function ($scope) {
    $scope.view = 'game';

    $scope.player = new Player()

    engine($scope);
}]);