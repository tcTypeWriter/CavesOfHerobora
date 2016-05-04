'use strict';

document.oncontextmenu = function (){
    return false;
};

var Book = require('./book/book.js');
var Game = require('./game.js');

var game_module = angular.module('game', []);

game_module.controller('Book', Book);

game_module.controller('bookButtonsController', ['$scope', '$rootScope', function($scope, $rootScope){


    $scope.open = function(chapter){
        var game = Game();
        if($rootScope.chapter === chapter){
            $rootScope.chapter = undefined;
            game.paused = false;
            return;
        }

        $rootScope.chapter = chapter;
        game.paused = true;
    };

}]);