var Creep = function (x, y, game, initVelocityY, initVelocityX) {
    this.alive = true;
    this.turn;
    this.sprite = game.add.sprite(x, y, 'creep', 'Creep_F_f00');
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Creep_S_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Creep_F_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Creep_B_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Creep_S_f', 0, 5, '', 2), 30, true);

    this.sprite.anchor.x = 0.5;
    this.initVelocityY = initVelocityY;
    this.initVelocityX = initVelocityX;
    game.physics.arcade.enable(this.sprite);

    this.sprite.body.setSize(50, 50, 7, 7);
    this.sprite.objectCreep = this;
    this.sprite.body.immovable = true;
    this.sprite.body.velocity.y = this.initVelocityY;
    this.sprite.body.velocity.x = this.initVelocityX;
    if (this.initVelocityY > 0) {
        this.turn = "up";
    } else if(this.initVelocityY < 0) {
        this.turn = "down";
    }
    if (this.initVelocityX < 0) {
        this.turn = "left";
    } else if (this.initVelocityX > 0){
        this.turn = "right";
    }
   // this.sprite.body.bounce.set(1);
    this.flip();
}
Creep.prototype.flip = function () {

    if ( this.turn === "down") {
        this.sprite.body.velocity.y = 150;
        this.sprite.animations.play("down");
        this.turn = "up";
    } else if(this.turn === "up") {
        this.sprite.animations.play("up");
        this.sprite.body.velocity.y = -150;
        this.turn = "down";
    }
    if (this.turn === "right") {
        this.sprite.scale.x = -1;
        this.sprite.animations.play("right");
        this.sprite.body.velocity.x = -150;
        this.sprite.body.velocity.y = 0;
        this.turn = "left";
    } else if(this.turn === "left")  {
        this.sprite.scale.x = 1;
        this.sprite.animations.play("left");
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 150;
        this.turn = "right";
    }


}