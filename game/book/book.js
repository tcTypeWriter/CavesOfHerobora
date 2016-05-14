'use strict';

var items = require('json!./items.json');
var skills = require('json!./skills.json');
var obstacles = require('json!./obstacles.json');
var monsters = require('json!./monsters.json');

hide(items);
hide(skills);
hide(obstacles);
hide(monsters);

var book;

function Book() {
    this.items = items;
    this.skills = skills;
    this.obstacles = obstacles;
    this.monsters = monsters;
    book = this;
}


function hide(arr){
    for(var key in arr)
        if(!arr[key].show)
            arr[key].show = false;
}

Book.show = function(type, name){
    book[type][name].show = true;
};

module.exports = Book;