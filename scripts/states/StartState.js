var StartState = function (game) {
    // konstruktor
}
var player;
var facing = 'left';
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
        player  = game.add.sprite(0, 0, 'bman', 'Bman_S_f00');
        player.animations.add('right', Phaser.Animation.generateFrameNames('Bman_S_f', 0, 7, '', 2), 30, true);
        player.animations.play('right');

        player2  = game.add.sprite(400, 0, 'bman', 'Bman_F_f00');
        player2.animations.add('down', Phaser.Animation.generateFrameNames('Bman_F_f', 0, 7, '', 2), 30, true);
        player2.animations.play('down');
        
        player3  = game.add.sprite(100, 300, 'bman', 'Bman_B_f00');
        player3.animations.add('up', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);
        player3.animations.play('up');

        player4  = game.add.sprite(300, 300, 'bman', 'Bman_S_f00');
        player4.scale.x = -1;
        player4.animations.add('left', Phaser.Animation.generateFrameNames('Bman_B_f', 0, 7, '', 2), 30, true);
       // player4.animations.play('left');


      game.add.tween(player).to({ x: 300 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      game.add.tween(player3).to({ y: 100 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      game.add.tween(player2).to({ y: 300 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    },
    update: function () {
        
    },
    render: function () {
        /*
                console.log(bot.y);
                game.debug.text('botHeight ' + bot.height, 32, 148);*/

    }
}