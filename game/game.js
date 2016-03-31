var game, model;

module.exports = function(m){
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas', { create: create, update: update});
    model = m;
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#ffffff';

    model.player.load(game);
    for(var key in model.mobsCreator){
        model.mobsCreator[key].load(game);
    }

    for(var key in model.skillsCreator){
        model.skillsCreator[key].load(game);
    }

    model.map.load(game);
}

function update() {
    model.player.update(game);
    model.map.update(game);

    if(model.map.gameover()){
        model.view = 'gameover';
        model.$digest();
    }
}