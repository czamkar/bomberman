var StartState = function (game) {
    // konstruktor
}
var tt
StartState.prototype = {
    preload: function () {
        game.load.image('background', 'assets/Menu/title_background.jpg');
        game.load.image('titleText', 'assets/Menu/title_titletext.png', 200, 200);
        game.load.spritesheet('button', 'assets/Menu/button_spritesheet.png', 132, 27);
    },
    create: function () {
        var bg = game.add.sprite(0, 0, 'background');
        bg.width= 640;
        bg.height= 480;
        console.log(bg);
        tt = game.add.sprite(game.width/2, -50, 'titleText');
        tt.anchor.x = 0.5;  
        button = game.add.button(game.world.centerX - 95, 320, 'button', this.actionOnClick, this, 1, 2, 0);
    },
    actionOnClick: function  () {
        
        game.state.start("Play");
        
    }
 
}