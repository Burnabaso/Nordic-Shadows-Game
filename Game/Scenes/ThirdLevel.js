class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
        this.collectedKeys = 0;
    }

    preload() {
        preloadAssets.call(this);
        this.load.tilemapTiledJSON("mapLevel3", "/Game/Assets/mazes/mapLevel3.JSON")

         this.load.image("Floor-Stone", "/Game/Assets/TileSets/Floor-Stone.png");
         this.load.image("Wall-Glass", "/Game/Assets/TileSets/Wall-Glass.png");
         this.load.image("TXProps", "/Game/Assets/TileSets/TXProps.png");
         this.load.image("key_big", "/Game/Assets/TileSets/key_big.png");
         this.load.image("GoldenIngot", "/Game/Assets/TileSets/GoldenIngot.png");
    }

    create() {
        this.collectedKeys = 0;
        
        const map = this.make.tilemap({ key: "mapLevel3" });
    
        const grassTileset = map.addTilesetImage("Floor-Stone", "Floor-Stone");
        const wallTileset = map.addTilesetImage("Wall-Glass", "Wall-Glass");
        const plantTileset = map.addTilesetImage("TXProps", "TXProps");
        const keyTileset = map.addTilesetImage("key_big", "key_big.png");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const scale = 0.73;


        const mazeFloor = map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        const mazeDecorations = map.createLayer("mazeDecorations", [plantTileset], 0, 0).setScale(scale);
        
        const gemLayer = map.getObjectLayer("mazeCoins");
        const keyLayer = map.getObjectLayer("mazeKeys");

        if (keyLayer) {
            keyLayer.objects.forEach(key => {
                const keySprite = this.physics.add.sprite(key.x * scale, key.y * scale, "key_big");
                keySprite.setOrigin(0, 1).setScale(scale); 
            });
        }
    
        if (gemLayer) {
            gemLayer.objects.forEach(gem => {
                const gemSprite = this.physics.add.sprite(gem.x * scale, gem.y * scale, "GoldenIngot");
                gemSprite.setOrigin(0, 1).setScale(scale); 
            });
        }

        mazeWalls.setCollisionByExclusion([-1]);

        let gate=this.physics.add.staticImage(690, 400, 'gate');
        gate.setSize(65,100);
        gate.setScale(0.18);
        this.gate=gate;
        dragons.length = 0;
        createPlayer.call(this);
        this.physics.add.collider(this.player, gate);
        dragons.push(new Dragon(this, 380, 105, [
            { x: 390, y: 90 },
            { x: 645, y: 90 }
        ], 120));
        dragons.push(new Dragon(this, 130, 305, [
            { x: 130, y: 305 },
            { x: 185, y: 305 },
            { x: 185, y: 190 },
            { x: 125, y: 190 },
            { x: 185, y: 190 },
            { x: 185, y: 305 },
            { x: 125, y: 305 }
        ], 120));
        dragons.push(new Dragon(this, 105, 690, [
            { x: 110, y: 690 },
            { x: 645, y: 690 }
        ], 80));
        dragons.push(new Dragon(this, 600, 410, [
            { x: 605, y: 410 },
            { x: 605, y: 640 }
        ], 40));

        createAnimations(this, characterName);

        this.physics.add.collider(this.player, mazeWalls);
        
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);
        handleHealth(this)
        updateScore();
    }
    
    update() {
        updateHealth();
        updatePlayer.call(this);
        for (const dragon of dragons) {
            dragon.update(this.player);
        }
    }
}