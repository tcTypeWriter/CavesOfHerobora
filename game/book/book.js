'use strict';

function Book() {
    this.items = require('json!./items.json');
    this.skills = require('json!./skills.json');
    this.obstacles = require('json!./obstacles.json');
    this.monsters = require('json!./monsters.json');
}

module.exports = Book;