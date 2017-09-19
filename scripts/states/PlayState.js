var PlayState = function (game) {
    // konstruktor
}
var facing = 'front';
var cursors;
var map;
var mapLayers = {};

PlayState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        game.load.atlas('bomb', 'assets/Bomb/bombAnimation.png', 'assets/Bomb/bombAnimation.json');
        game.load.atlas('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.json');
        game.load.atlas('creep', 'assets/Creep/creep.png', 'assets/Creep/creep.json');
        game.load.atlas('flame', 'assets/Flame/flame.png', 'assets/Flame/flame.json');
        game.load.tilemap('map', 'assets/Map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/Map/tileMapBO.png');
    },
    create: function () {
        this.createMap();
        this.bomberman = new Bomberman(477, 123, game);
        this.creep1 = new Creep(477, 123, game);

    },
    createMap: function () {
        map = game.add.tilemap('map', null, 64, 64);

        console.log(map.addTilesetImage('tiles', null, 64, 64));

        mapLayers.grass = map.createLayer('grass');
        mapLayers.collide = map.createLayer('collide');

        mapLayers.grass.resizeWorld();
        // mapLayers.collide.debug = true;

        map.setCollisionBetween(0, 2, true, mapLayers.collide);

    },
    update: function () {
        game.physics.arcade.collide(this.bomberman.sprite, mapLayers.collide);
        game.physics.arcade.overlap(this.bomberman.sprite, this.creep1.sprite);
        game.physics.arcade.collide(this.creep1.sprite, mapLayers.collide, this.speed);
        game.physics.arcade.overlap(this.bomberman.sprite, this.flameGroup, this.kill, null, this);
        this.bomberman.control();
        this.creep1.control();
    },
    kill: function () {
        game.paused = true;
    },
    speed: function (item) {/*
        var currentVelocityY = item.body.velocity.y;
        if (currentVelocityY === 0 && item.body.y < 900){
            item.body.velocity.y = 200;
        item.animations.play("down");}
        else{
            item.body.velocity.y = -200;
        item.animations.play("up");}*/

    },
    render: function () {
        if (game.physics.arcade.overlap(this.bomberman.sprite, this.creep1.sprite)) {
            console.log("tak");
        }
        // this.currentTile = map.getTile(mapLayers['collide'].getTileX(this.bomberman.sprite.body.x), mapLayers['collide'].getTileX(this.bomberman.sprite.body.y), 'collide');
        // console.log( this.currentTile);

        // game.debug.body(this.creep1.sprite);
        game.debug.body(this.bomberman.sprite);
        // /*
        //         console.log(bot.y);
        //         */
        game.debug.text('Body X ' + this.creep1.sprite.body.velocity, 32, 88);
        game.debug.text('Body Y ' + this.creep1.sprite.body.y, 32, 108);
        // game.debug.text('Anchor X ' + player.anchor.x, 32, 128);
        // game.debug.text('Anchor Y ' + player.anchor.y, 32, 148);

    }
}