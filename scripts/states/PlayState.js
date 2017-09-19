var PlayState = function (game) {
    // konstruktor
}
var facing = 'front';
var cursors;
var map;
var mapLayers = {};
var creepPositons = [{
    x: 477,
    y: 123,
    initVelocityX: 0,
    initVelocityY: 150
}, {
    x: 70,
    y: 70,
    initVelocityX: 150,
    initVelocityY: 0
}];

PlayState.prototype = {
    preload: function () {
        // Tu ładujemy assety
        game.load.atlas('bomb', 'assets/Bomb/bombAnimation.png', 'assets/Bomb/bombAnimation.json');
        game.load.atlas('bman', 'assets/Bomberman/bman.png', 'assets/Bomberman/bman.json');
        game.load.atlas('creep', 'assets/Creep/creep.png', 'assets/Creep/creep.json');
        game.load.atlas('flame', 'assets/Flame/flame.png', 'assets/Flame/flame.json');
        game.load.atlas('blocks', 'assets/Map/tileMapBO.png', 'assets/Map/blocks.json');
        game.load.tilemap('map', 'assets/Map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/Map/tileMapBO.png');
    },
    create: function () {
        this.createMap();

        // this.creep1 = new Creep(477, 123, game, 150);
        this.creeps = game.add.group();
        this.boxs = game.add.group();
        var amount = 0;
        var box;
        var arrayBox = [{
            x: 5,
            y: 3
        }, {
            x: 1,
            y: 1
        }, {
            x: 2,
            y: 1
        }, {
            x: 1,
            y: 2
        }];
        var serachArraybox = function (x, y) {
            for (var index = 0; index < arrayBox.length; index++) {
                if (arrayBox[index].x === x && arrayBox[index].y === y) {
                    console.log("*2");
                    return false;
                }

            }
            return true;
        }
        while (amount < 43) {

            for (var index = 0; index < 10; index++) {
                var x = game.rnd.integerInRange(1, 15);

                var y = game.rnd.integerInRange(1, 15);

                if (x % 2 !== 0) {
                    if (serachArraybox(x, y)) {
                        amount++;
                        box = new Box(x * 64, y * 64, game);
                        arrayBox.push({
                            x,
                            y
                        });
                        this.boxs.add(box.sprite);
                    }
                } else if (y % 2 !== 0) {
                    if (serachArraybox(x, y)) {
                        amount++;
                        box = new Box(x * 64, y * 64, game);
                        arrayBox.push({
                            x,
                            y
                        });
                        this.boxs.add(box.sprite);
                    }
                }
            }
        }
        console.log(arrayBox);
        console.log(amount);
        for (var index = 0; index < creepPositons.length; index++) {
            var creep = new Creep(creepPositons[index].x, creepPositons[index].y, game, creepPositons[index].initVelocityY, creepPositons[index].initVelocityX);
            this.creeps.add(creep.sprite);
        }
        this.bomberman = new Bomberman(377, 123, game);

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
    hitWall: function (a, b) {
        a.objectCreep.flip();
    },
    collideCreepBomb: function (a, b) {
        a.objectCreep.flip();
    },
    collideCreepFlame: function (a, b) {
        if (a.objectCreep.alive) {
            a.body.immovable = true;
            a.body.velocity.setTo(0);
            console.log('x')
            a.objectCreep.alive = false;
            var tween = game.add.tween(a).to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                a.kill();
            }, this);
        }

    },
    update: function () {
        game.physics.arcade.collide(this.bomberman.sprite, mapLayers.collide);
        game.physics.arcade.collide(this.bomberman.sprite, this.boxs);

        game.physics.arcade.collide(this.creeps, this.bomberman.bomb, this.collideCreepBomb);
        game.physics.arcade.overlap(this.creeps, this.bomberman.flameGroup, this.collideCreepFlame);

        game.physics.arcade.overlap(this.boxs, this.bomberman.flameGroup, this.colideBoxFlame);

        game.physics.arcade.overlap(this.bomberman.sprite, this.creeps, this.collideBombermanCreeps);
        game.physics.arcade.collide(this.creeps, mapLayers.collide, this.hitWall);
        game.physics.arcade.collide(this.creeps, this.boxs, this.hitWall);
        game.physics.arcade.overlap(this.bomberman.sprite, this.bomberman.flameGroup, this.collideBombermanCreeps, null, this);
        this.bomberman.control();

    },
    colideBoxFlame: function (a, b) {
        a.kill();
    },
    collideBombermanCreeps: function (a, b) {
        console.log(a);
        if (a.objectBomberman.alive) {
            a.body.immovable = true;
            a.body.velocity.setTo(0);
            console.log('x')
            a.objectBomberman.alive = false;
            var tween = game.add.tween(a).to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                a.kill();
                game.paused = true;
            }, this);
        }
    },
    kill: function () {
        game.paused = true;
    },
    render: function () {
        this.bomberman.flameGroup.forEachAlive(function (member) {
            game.debug.body(member);
        }, this);
        this.creeps.forEachAlive(function (member) {
            game.debug.body(member);
            game.debug.text('Body X ' + member.body.velocity.x, 32, 88);
            game.debug.text('Body Y ' + member.body.velocity.y, 32, 108);
        }, this);
        // game.debug.text('Body X ' + this.creeps[0].body.velocity.x, 32, 88);
        // game.debug.text('Body Y ' + this.creeps[0].body.velocity.y, 32, 108);

        if (game.physics.arcade.overlap(this.bomberman.sprite, this.creeps)) {
            console.log("tak");
        }
        // this.currentTile = map.getTile(mapLayers['collide'].getTileX(this.bomberman.sprite.body.x), mapLayers['collide'].getTileX(this.bomberman.sprite.body.y), 'collide');
        // console.log( this.currentTile);

        // game.debug.body(this.creeps[0].sprite);
        // game.debug.body(this.bomberman.sprite);
        // game.debug.text('Body X ' + this.bomberman.sprite.body.x, 32, 88);
        // game.debug.text('Body Y ' + this.bomberman.sprite.body.y, 32, 108);
        // game.debug.text('Anchor X ' + player.anchor.x, 32, 128);
        // game.debug.text('Anchor Y ' + player.anchor.y, 32, 148);

    }
}