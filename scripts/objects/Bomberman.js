var Bomberman = function (x, y, game) {
    this.flameGroup = game.add.group();
    this.sprite = game.add.sprite(x, y, 'bman', 'Bman_F_f00');
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.sprite.anchor.x = 0.5;
    this.sprite.objectBomberman = this;
    this.alive = true;
    game.camera.follow(this.sprite);
    game.physics.enable(this.sprite);

    this.sprite.body.setSize(40, 40, 10, 80);
}
var bombTimer = 0;
Bomberman.prototype.control = function () {
    var facing;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    //this.sprite.animations.stop();
    if (this.alive) {
        if (this.cursors.left.isDown) {

            this.sprite.body.velocity.x = -150;
            if (facing != 'left') {
                this.sprite.scale.x = -1;
                this.sprite.animations.play('left');

                facing = 'left';
            }

        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;

            if (facing != 'right') {
                this.sprite.scale.x = 1;
                this.sprite.animations.play('right');
                facing = 'right';
            }
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;

            if (facing != 'down') {
                this.sprite.animations.play('down');
                facing = 'down';
            }
        } else if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;

            if (facing != 'up') {
                this.sprite.animations.play('up');
                facing = 'up';
            }
        } else {

            if (facing != 'idle') {
                this.sprite.animations.stop();
            }
            facing = 'idle';
        }

        if (this.bombButton.isDown && game.time.now > bombTimer) {

            bombTimer = game.time.now + 750;

            this.currentTileX = mapLayers['grass'].getTileX(this.sprite.body.x);
            this.currentTileY = mapLayers['grass'].getTileY(this.sprite.body.y);
            var abc = map.getTile(this.currentTileX, this.currentTileY);
            this.bomb = game.add.sprite(abc.worldX + 10, abc.worldY + 10, 'bomb', 'Bomb_f00');
            this.bomb.animations.add('explode', Phaser.Animation.generateFrameNames('Bomb_f', 0, 2, '', 2), 1, true);
            this.bomb.animations.play('explode');
            game.physics.arcade.enable(this.bomb);

            this.bomb.body.immovable = true;
            game.time.events.add(Phaser.Timer.SECOND * 3, this.destroyBomb, this);

            // var Powyzej2 = map.getTileAbove(0,  this.currentTileX,   this.currentTileY);
            // console.log("Powyzej2");
            // console.log(Powyzej2.x + " "+ Powyzej2.y);
            // this.currentTile = map.getTile(Powyzej2.x , Powyzej2.y , 'collide');
            // console.log(  this.currentTile);
        }
    }else{
        this.sprite.animations.stop();
    }
}
Bomberman.prototype.destroyBomb = function () {

    var flame = game.add.sprite(this.bomb.x, this.bomb.y, 'flame', 'Flame_f00');
    flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
    flame.animations.play('flame');
    this.flameGroup.add(flame);
    this.currentTileX = mapLayers['grass'].getTileX(this.bomb.x);
    this.currentTileY = mapLayers['grass'].getTileY(this.bomb.y);
    var above = map.getTileAbove(0, this.currentTileX, this.currentTileY);
    var below = map.getTileBelow(0, this.currentTileX, this.currentTileY);
    var left = map.getTileLeft(0, this.currentTileX, this.currentTileY);
    var right = map.getTileRight(0, this.currentTileX, this.currentTileY);
    this.tileAbove = map.getTile(above.x, above.y, 'collide');
    this.tileBelow = map.getTile(below.x, below.y, 'collide');
    this.tileLeft = map.getTile(left.x, left.y, 'collide');
    this.tileRight = map.getTile(right.x, right.y, 'collide');
    if (this.tileAbove === null) {

        var tile = map.getTile(above.x, above.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }
    if (this.tileBelow == null) {

        var tile = map.getTile(below.x, below.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }
    if (this.tileLeft == null) {

        var tile = map.getTile(left.x, left.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');


        this.flameGroup.add(flame);
    }
    if (this.tileRight == null) {

        var tile = map.getTile(right.x, right.y);
        flame = game.add.sprite(tile.worldX + 10, tile.worldY + 10, 'flame', 'Flame_f00');
        flame.animations.add('flame', Phaser.Animation.generateFrameNames('Flame_f', 0, 4, '', 2), 4, true);
        flame.animations.play('flame');

        this.flameGroup.add(flame);
    }

    game.physics.arcade.enable(this.flameGroup);
    this.bomb.kill();
    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        this.flameGroup.forEach(function (item) {
            item.kill();
        }, this, true);
    }, this);

}