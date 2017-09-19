var Bomb = function (x, y, game, map) {
    this.flameGroup = game.add.group();
    this.map = map
    this.sprite = game.add.sprite(x, y, 'bomb', 'Bomb_f00');
    this.alive = true;
    this.objectBomb = this;
    this.sprite.animations.add('explode', Phaser.Animation.generateFrameNames('Bomb_f', 0, 2, '', 2), 1, true);
    this.sprite.animations.play('explode');
    game.physics.arcade.enable(this.sprite);    
    this.sprite.body.immovable = true;
    game.time.events.add(Phaser.Timer.SECOND * 3, this.destroyBomb, this);
}

Bomb.prototype.destroyBomb = function () {
    var flame = game.add.sprite(this.sprite.x, this.sprite.y, 'flame', 'Flame_f00');
    flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
    flame.animations.play('flame');
    this.flameGroup.add(flame);
    console.log(this.map.map);
    this.currentTileX = this.map.mapLayers['grass'].getTileX(this.sprite.x);
    this.currentTileY = this.map.mapLayers['grass'].getTileY(this.sprite.y);
    var above = this.map.map.getTileAbove(0, this.currentTileX, this.currentTileY);
    var below = this.map.map.getTileBelow(0, this.currentTileX, this.currentTileY);
    var left = this.map.map.getTileLeft(0, this.currentTileX, this.currentTileY);
    var right = this.map.map.getTileRight(0, this.currentTileX, this.currentTileY);
    this.tileAbove = this.map.map.getTile(above.x, above.y, 'collide');
    this.tileBelow = this.map.map.getTile(below.x, below.y, 'collide');
    this.tileLeft = this.map.map.getTile(left.x, left.y, 'collide');
    this.tileRight = this.map.map.getTile(right.x, right.y, 'collide');
    if (this.tileAbove === null) {

        var tile = this.map.map.getTile(above.x, above.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }
    if (this.tileBelow == null) {

        var tile = this.map.map.getTile(below.x, below.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }
    if (this.tileLeft == null) {

        var tile = this.map.map.getTile(left.x, left.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');


        this.flameGroup.add(flame);
    }
    if (this.tileRight == null) {

        var tile = this.map.map.getTile(right.x, right.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }

    game.physics.arcade.enable(this.flameGroup);
    this.sprite.kill();
    this.alive = false;
    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        this.flameGroup.forEach(function (item) {
            item.kill();
        }, this, true);
    }, this);
}