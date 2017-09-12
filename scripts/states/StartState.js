var StartState = function (game) {
    // konstruktor
}
var player;
var facing = 'left';
var cursors;

StartState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        game.load.spritesheet('bot', 'assets/Bomberman/bman.png', 64, 128);

    },
    create: function () {
        //  This sprite is using a texture atlas for all of its animation data
        player = game.add.sprite(64, 128, 'bot');

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [12], 1, true);
        player.animations.add('right', [0, 6, 12, 19, 20, 21, 22], 8, true);
        player.animations.add('up', [1, 2, 3, 7, 8, 9, 10, 16], 8, true);
        player.animations.add('down', [0, 4, 5, 11, 14, 15, 16, 17], 8, true);

        cursors = game.input.keyboard.createCursorKeys();

        game.physics.enable(player, Phaser.Physics.ARCADE);
    },
    update: function () {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -150;

            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        }  else if (cursors.up.isDown) {
            player.body.velocity.y = -150;

            if (facing != 'up') {
                player.animations.play('up');
                facing = 'up';
            }
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 150;

            if (facing != 'down') {
                player.animations.play('down');
                facing = 'down';
            }
        }else {
            if (facing != 'idle') {
                player.animations.stop();

                if (facing == 'left') {
                    player.frame = 0;
                } else {
                    player.frame = 5;
                }

                facing = 'idle';
            }
        }
    },
    render: function () {
        /*
                console.log(bot.y);
                game.debug.text('botHeight ' + bot.height, 32, 148);*/

    }
}