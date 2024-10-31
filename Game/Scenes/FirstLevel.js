class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
        this.collectedKeys = 0;
    }

    preload() {
        preloadAssets.call(this);
        this.load.tilemapTiledJSON("mapLevel1", "/Game/Assets/mazes/mapLevel1.JSON")

         this.load.image("TXTilesetGrass", "/Game/Assets/TileSets/TXTilesetGrass.png");
         this.load.image("Wall-Dirt", "/Game/Assets/TileSets/Wall-Dirt.png");
         this.load.image("TXPlant", "/Game/Assets/TileSets/TXPlant.png");
         this.load.image("key_big", "/Game/Assets/TileSets/key_big.png");
         this.load.image("GoldenIngot", "/Game/Assets/TileSets/GoldenIngot.png");
    }

    create() {
        this.collectedKeys = 0;

        const map = this.make.tilemap({ key: "mapLevel1" });
    
        const grassTileset = map.addTilesetImage("TXTilesetGrass", "TXTilesetGrass");
        const wallTileset = map.addTilesetImage("Wall-Dirt", "Wall-Dirt");
        const plantTileset = map.addTilesetImage("TXPlant", "TXPlant");
        const keyTileset = map.addTilesetImage("key_big", "key_big.png");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const scale = 0.73;


        const mazeFloor = map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        const mazeDecoration = map.createLayer("mazeDecoration", [plantTileset], 0, 0).setScale(scale);
        
        const keyLayer = map.getObjectLayer("mazeKey");
        const gemLayer = map.getObjectLayer("mazeGems");

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

        createPlayer.call(this);

        //dragon creation
        dragons.push(new Dragon(this, 400, 400, [
            { x: 500, y: 400 },
            { x: 400, y: 400 }
        ], 120));
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