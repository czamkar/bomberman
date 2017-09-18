var Bomberman = function (x, y, game) {
    this.sprite = game.add.sprite(x, y, 'bman', 'Bman_F_f00');
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.sprite.anchor.x = 0.5;

    game.camera.follow(this.sprite);
    game.physics.enable(this.sprite);

    this.sprite.body.setSize(40, 40, 10, 80);
}
var bombTimer = 0;
Bomberman.prototype.control = function () {
    var facing;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
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
            console.log("BOMBA");
            bombTimer = game.time.now + 750;

            this.currentTileX = mapLayers['grass'].getTileX(this.sprite.body.x);
            this.currentTileY = mapLayers['grass'].getTileY(this.sprite.body.y);
            var abc = map.getTile(this.currentTileX, this.currentTileY)
            console.log(abc);
            this.bomb = game.add.sprite(abc.worldX + 10, abc.worldY + 10,'bomb', 'Bomb_f00');
            this.bomb.sprite.animations.add('explode', Phaser.Animation.generateFrameNames('Bomb_f', 0, 2, '', 2), 30, true);
            this.bomb.sprite.animations.play('explode');
            game.time.events.add(Phaser.Timer.SECOND * 4, this.destroyBomb, this);
            console.log(this.currentTileX);
        }
}
Bomberman.prototype.destroyBomb = function(){
    this.bomb.kill();
}