'use strict';

var empty = require('json!./data/empty');
var spider = require('json!./data/spider');
var bat = require('json!./data/bat');
var minotaur = require('json!./data/minotaur');
var tree = require('json!./data/tree');

var bat_boss = require('json!./data/bat_boss');
var death = require('json!./data/death.json');

module.exports = {
    empty: empty,
    spider: spider,
    bat: bat,
    minotaur: minotaur,
    tree: tree,
    bat_boss: bat_boss,
    death: death
};