var game = new Phaser.Game(960, 640, Phaser.AUTO, "game");

// Definiujemy stany
game.state.add("Play", PlayState);
game.state.add("Menu", StartState);
// Odpalamy stan
game.state.start("Menu");
