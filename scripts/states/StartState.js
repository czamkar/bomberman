var PlayState = function (game) {
    // konstruktor
}
var player;
var facing = 'front';
var cursors;
var map;
var mapLayers = {}; 
PlayState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        // game.load.spritesheet('bot', 'assets/Bomberman/bman.png', 64, 128);

        // game.load.atlasXML('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.xml');
        game.load.atlas('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.json');

        game.load.tilemap('map', 'assets/Map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/Map/tileMapBO.png');
    },
    create: function () {
        //  This sprite is using a texture atlas for all of its animation data


        this.createMap();
        cursors = game.input.keyboard.createCursorKeys();
        player = game.add.sprite(500, 100, 'bman', 'Bman_F_f00');
        player.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);


        player.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);

        player.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);


        player.animations.add('left', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
        player.anchor.x = 0.5;

        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.camera.follow(player);
        
        player.body.setSize(48,48,10,60);

    },
    createMap: function() {
            map = game.add.tilemap('map',null,64,64);
           
           console.log(map.addTilesetImage('tiles',null,64,64));
           
        	mapLayers.grass =  map.createLayer('grass');
            mapLayers.collide =  map.createLayer('collide');
    
           mapLayers.grass.resizeWorld();
      mapLayers.collide.debug = true;
    
           map.setCollisionBetween(0,2, true, mapLayers.collide);
            
    },   
    update: function () {
        game.physics.arcade.collide(player, mapLayers.collide);
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        if (cursors.left.isDown) {

            player.body.velocity.x = -150;
            if (facing != 'left') {
                player.scale.x = -1;
                player.animations.play('left');
                facing = 'left';
            }

        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                player.scale.x = 1;
                player.animations.play('right');
                facing = 'right';
            }
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 150;

            if (facing != 'down') {
                player.animations.play('down');
                facing = 'down';
            }
        } else if (cursors.up.isDown) {
            player.body.velocity.y = -150;

            if (facing != 'up') {
                player.animations.play('up');
                facing = 'up';
            }
        } else {

            if (facing != 'idle') {
                player.animations.stop();
            }
            facing = 'idle';
        }
    },
    render: function () {
        game.debug.spriteBounds(player);
        /*
                console.log(bot.y);
                */
                game.debug.text('Body X ' + player.body.width, 32, 88);
                game.debug.text('Body Y ' + player.body.height, 32, 108);
                game.debug.text('Anchor X ' + player.anchor.x, 32, 128);
                game.debug.text('Anchor Y ' + player.anchor.y, 32, 148);

    }
}