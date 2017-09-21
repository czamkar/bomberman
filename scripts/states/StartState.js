var StartState = function (game) {
    // konstruktor
}
StartState.prototype = {
    preload: function () {
        game.load.image('background', 'assets/Menu/title_background.jpg');
        game.load.image('titleText', 'assets/Menu/title_titletext.png', 200, 200);
        game.load.spritesheet('button', 'assets/Menu/button_spritesheet.png', 132, 27);
        game.load.spritesheet('button', 'assets/Menu/button_spritesheet.png', 132, 27);
        game.load.audio('music', 'assets/nad.mp3');
        
    },
    create: function () {
        var bg = game.add.sprite(0, 0, 'background');
        bg.width= 960;
        bg.height= 640;
        console.log(bg);
        var tt = game.add.sprite(game.width/2, -70, 'titleText');
        tt.anchor.x = 0.5;  
        button = game.add.button(game.world.centerX , 300, 'button', this.actionOnClick, this, 1, 2, 0);
        button.anchor.x = 0.5;

        // music = game.add.audio('music');
        // music.play();
    },
    actionOnClick: function  () {
        
        game.state.start("Play");
        
    }
 
}