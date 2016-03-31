
module.exports = SimpleMap;

function SimpleMap(mobsCreator, player) {
    this.mobsCreator = mobsCreator;
    this.player = player;
}


SimpleMap.prototype.load = function(game) {
    var mobs = this.mobs = createGroup();
    var skills = this.skills = createGroup();
    var items = this.items = createGroup();
    
    skills.setAll('outOfBoundsKill', true);

    mobs.add( this.mobsCreator.Bee(this.player, 150, 150) );



    function createGroup(){
        var grp = game.add.group();
        grp.enableBody = true;
        grp.physicsBodyType = Phaser.Physics.ARCADE;
        grp.setAll('anchor.x', 0.5);
        grp.setAll('anchor.y', 0.5);
        return grp;
    }
}


SimpleMap.prototype.update = function(game) {
    this.mobs.forEachAlive(function(mob){
        mob.Update(game);
    });

    game.physics.arcade.collide(this.player.sprite, this.mobs);
}
