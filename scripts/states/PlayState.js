var PlayState = function (game) {
    // konstruktor
}
var facing = 'front';
var cursors;
var map;
var mapLayers = {};
var bombButton;
var bombTimer = 0;
PlayState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        game.load.atlas('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.json');
        game.load.tilemap('map', 'assets/Map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/Map/tileMapBO.png');
        game.load.image('bomb', 'assets/Bomb/Bomb_f01.png');
    },
    create: function () {
        //  This sprite is using a texture atlas for all of its animation data


        this.createMap();
        this.bomberman = new Bomberman(477, 123, game);
   
/*
        bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);*/
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
        this.bomberman.control();
    },
    fadePicture: function(){
        this.bomb.kill();
    },
    render: function () {
        game.debug.body(this.bomberman.sprite);
        // /*
        //         console.log(bot.y);
        //         */
        // game.debug.text('Body X ' + player.body.width, 32, 88);
        // game.debug.text('Body Y ' + player.body.height, 32, 108);
        // game.debug.text('Anchor X ' + player.anchor.x, 32, 128);
        // game.debug.text('Anchor Y ' + player.anchor.y, 32, 148);

    }
}