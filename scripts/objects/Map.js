var Map = function (game) {
    this.mapLayers = {};
    this.map = {};
    this.createMap();
}
Map.prototype.createMap = function () {
    this.map = game.add.tilemap('map', null, 64, 64);
    this.map.addTilesetImage('tiles', null, 64, 64);

    this.mapLayers.grass = this.map.createLayer('grass');
    this.mapLayers.collide = this.map.createLayer('collide');

    this.mapLayers.grass.resizeWorld();

    this.map.setCollisionBetween(0, 2, true, this.mapLayers.collide);
}