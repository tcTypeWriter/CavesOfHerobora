require('style.css');
require('interface.css');
require('inventory.css');
require('character.css');

var angular = require('angular');
var engine = require('./game.js');

var SimpleMap = require('./map/SimpleMap.js');

var Player = require('./player/player.js');
var mobsCreator =   require('./mobs/mobsCreator.js');
var skillsCreator = require('./skills/skillsCreator.js');

var game = angular.module('game', []);

game.controller("main", ["$scope", function ($scope) {
    $scope.view = 'game';

    $scope.player = new Player();
    $scope.mobsCreator = mobsCreator;

    $scope.map = new SimpleMap($scope.mobsCreator, $scope.player);

    engine($scope);
}]);