'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './game/app.js',
    output: {
        path: __dirname + "/assets",
        filename: 'build.js'

    },

    watch: NODE_ENV === 'dev',

    resolve: {
        modulesDirectories: ["libs",
            "game/skills",
            "game/obstacles",
            "game/map",
            "game/items",
            "game/creatures/player",
            "game/creatures/monsters",
        ]
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },

    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ]
};
