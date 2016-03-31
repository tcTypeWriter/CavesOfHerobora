
module.exports = SimpleMap;

function SimpleMap(mobs, player) {
    this.add = mobs;
    this.player = player;
    this.mobs = [];
}


SimpleMap.prototype.load = function(game) {
    this.mobs.push(new this.add.Bee(this.player, 100, 100));
}


SimpleMap.prototype.update = function(game) {
    var mobs = this.mobs;

    for(var i in mobs){
        mobs[i].update(game);
        game.physics.arcade.collide(this.player.sprite, mobs[i].sprite);
    }
}
