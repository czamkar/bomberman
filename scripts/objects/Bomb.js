var Bomb = function (x, y, game, map) {
    // this.flameGroup = game.add.group();
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

Bomb.prototype.createFlame = function (x, y) {
    var flame = game.add.sprite(x, y, 'flame', 'Flame_f00');
    flame.anchor.y = 1;
    flame.anchor.x = 0.5;
    flame.x += flame.width * 0.5;
    flame.y += flame.height;
    flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
    flame.animations.play('flame');

    game.state.states.Play.flameG.add(flame);
}
Bomb.prototype.destroyBomb = function () {
    this.currentTileX = this.map.mapLayers['grass'].getTileX(this.sprite.x);
    this.currentTileY = this.map.mapLayers['grass'].getTileY(this.sprite.y);
    var tile = this.map.map.getTile(this.currentTileX, this.currentTileY);
    this.createFlame(tile.worldX, tile.worldY);

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
        this.createFlame(tile.worldX, tile.worldY);
    }
    if (this.tileBelow == null) {
        var tile = this.map.map.getTile(below.x, below.y);
        this.createFlame(tile.worldX, tile.worldY);
    }
    if (this.tileLeft == null) {
        var tile = this.map.map.getTile(left.x, left.y);
        this.createFlame(tile.worldX, tile.worldY);
    }
    if (this.tileRight == null) {
        var tile = this.map.map.getTile(right.x, right.y);
        this.createFlame(tile.worldX, tile.worldY);
    }

    game.physics.arcade.enable(game.state.states.Play.flameG);

    this.sprite.kill();
    this.alive = false;
    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        var tween;
        game.state.states.Play.flameG.forEach(function (item) {

            tween = game.add.tween(item.scale).to({
                x: 0,
                y: 0
            }, 1000, Phaser.Easing.Back.Out, true);

        }, this, true);
        tween.onComplete.add(function () {
            game.state.states.Play.flameG.forEach(function (item) {
                item.kill();
            }, this, true);
        }, this);
    }, this);
}