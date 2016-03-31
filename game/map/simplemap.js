
module.exports = SimpleMap;

function SimpleMap(mobsCreator, player) {
    this.mobsCreator = mobsCreator;
    this.player = player;

    player.map = this;
}


SimpleMap.prototype.load = function(game) {
    var mobs = this.mobs = createGroup();
    var playerSkills = this.playerSkills = createGroup();
    var mobsSkills = this.mobsSkills = createGroup();
    var items = this.items = createGroup();
    
    playerSkills.setAll('outOfBoundsKill', true);

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
    game.physics.arcade.over
    game.physics.arcade.overlap(this.playerSkills, this.mobs, hit, null, this);
}

SimpleMap.prototype.gameover = function() {
    return this.mobs.countLiving() == 0;
}



function hit(skill, mob){
    mob.isHurted(skill.damage());
    skill.kill();
}