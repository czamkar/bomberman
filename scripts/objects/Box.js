var Box = function (x, y, game) {
    this.sprite = game.add.sprite(x, y, 'blocks', 'ExplodableBlock');
    this.sprite.objectBox = this;
    this.alive = true;
    game.physics.arcade.enable(this.sprite); 
    this.sprite.body.immovable = true;
}