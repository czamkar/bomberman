var Bomberman = function (x, y, game) {

    this.sprite = game.add.sprite(x, y, 'bman', 'Bman_F_f00');
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
    this.facing;
    this.cursors = game.input.keyboard.createCursorKeys();

    this.sprite.anchor.x = 0.5;
    this.sprite.objectBomberman = this;
    this.alive = true;
    game.camera.follow(this.sprite);
    game.physics.enable(this.sprite);

    this.sprite.body.setSize(40, 40, 10, 80);
}
var bombTimer = 0;
Bomberman.prototype.control = function () {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    //this.sprite.animations.stop();
    var music = game.add.audio('walk');

    if (this.alive) {
        
        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -150;
          
            if (this.facing != 'left') {
            
                this.sprite.scale.x = -1;
                this.sprite.animations.play('left');

                this.facing = 'left';
            }

        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;

            if (this.facing != 'right') {
                this.sprite.scale.x = 1;
                this.sprite.animations.play('right');
                this.facing = 'right';
            }
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;

            if (this.facing != 'down') {
                this.sprite.animations.play('down');
                this.facing = 'down';
            }
        } else if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;

            if (this.facing != 'up') {
                this.sprite.animations.play('up');
                this.facing = 'up';
            }
        } else {
            if (this.facing != 'idle') {
                this.sprite.animations.stop();
                switch (this.facing) {
                    case 'left':
                        this.sprite.frameName = 'Bman_S_f00';
                        break;
                    case 'right':

                        this.sprite.frameName = 'Bman_S_f00';
                        break;
                    case 'up':

                        this.sprite.frameName = 'Bman_B_f00';
                        break;
                    case 'down':

                        this.sprite.frameName = 'Bman_F_f00';
                        break;

                    default:
                        break;
                }
            }
            this.facing = 'idle';
        }
        /*
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


                }*/
    } else {
        this.sprite.animations.stop();
    }
}
Bomberman.prototype.destroyBomb = function () {



}