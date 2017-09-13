var StartState = function (game) {
    // konstruktor
}
var player;
var facing = 'front';
var cursors;

StartState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        // game.load.spritesheet('bot', 'assets/Bomberman/bman.png', 64, 128);

        // game.load.atlasXML('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.xml');
        game.load.atlas('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.json');

    },
    create: function () {
        //  This sprite is using a texture atlas for all of its animation data


        cursors = game.input.keyboard.createCursorKeys();
        player = game.add.sprite(500, 100, 'bman', 'Bman_F_f00');
        player.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);


        player.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);

        player.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);


        player.animations.add('left', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
        game.physics.enable(player, Phaser.Physics.ARCADE);

    },
    update: function () {

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
        /*
                console.log(bot.y);
                game.debug.text('botHeight ' + bot.height, 32, 148);*/

    }
}