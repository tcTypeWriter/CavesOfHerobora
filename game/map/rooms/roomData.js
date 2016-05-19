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
    death: death,

    start: require('json!./data/supadupaMap/start'),
    room1: require('json!./data/supadupaMap/room1'),
    room2: require('json!./data/supadupaMap/room2'),
    room3: require('json!./data/supadupaMap/room3'),
    room4: require('json!./data/supadupaMap/room4'),
    room5: require('json!./data/supadupaMap/room5'),
    room6: require('json!./data/supadupaMap/room6'),
    room7: require('json!./data/supadupaMap/room7'),
    room8: require('json!./data/supadupaMap/room8'),
    room9: require('json!./data/supadupaMap/room9'),
    boss: require('json!./data/supadupaMap/boss')
};