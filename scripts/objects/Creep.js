var Creep = function (x, y, game) {
    this.sprite = game.add.sprite(x, y, 'creep', 'Creep_F_f00');
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Creep_S_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Creep_F_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Creep_B_f', 0, 5, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Creep_S_f', 0, 5, '', 2), 30, true);

    this.sprite.anchor.x = 0.5;

    game.physics.enable(this.sprite);
    this.sprite.body.immovable = true;

    this.sprite.body.setSize(50, 50, 7, 7);
    
    this.sprite.body.velocity.y = -200;
    this.sprite.body.bounce.set(1);
}
Creep.prototype.control = function () {
    if(this.sprite.body.velocity.y === 200){
        this.sprite.animations.play("down");
    }else{
        this.sprite.animations.play("up");

    }


}
