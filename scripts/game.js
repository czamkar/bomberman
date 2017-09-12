var game = new Phaser.Game(640, 480, Phaser.AUTO, "game");

// Definiujemy stany
game.state.add("Start", StartState);
// Odpalamy stan
game.state.start("Start");
