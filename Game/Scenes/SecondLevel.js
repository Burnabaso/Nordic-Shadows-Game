class SecondLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondLevel' });       
        this.collectedKeys = 0;
    }

    preload() {
        this.load.tilemapTiledJSON("mapLevel2", "/Game/Assets/mazes/mapLevel2.JSON")

        this.load.image("Floor-Grass", "/Game/Assets/TileSets/Floor-Grass.png");
        this.load.image("Floor-Sand", "/Game/Assets/TileSets/Floor-Sand.png");
        this.load.image("TXProps", "/Game/Assets/TileSets/TXProps.png");
        this.load.image("GoldenIngot", "/Game/Assets/TileSets/GoldenIngot.png");
        this.load.image("key_big", "/Game/Assets/TileSets/key_big.png");

    }

    create() {

        this.collectedKeys = 0;

        const map = this.make.tilemap({ key: "mapLevel2" });
    
        const grassTileset = map.addTilesetImage("Floor-Grass", "Floor-Grass");
        const wallTileset = map.addTilesetImage("Floor-Sand", "Floor-Sand");
        const plantTileset = map.addTilesetImage("TXProps", "TXProps");
        const keyTileset = map.addTilesetImage("key_big", "key_big");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const scale = 0.73;


        const mazeFloor = map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        const mazeDecorations = map.createLayer("mazeDecorations", [plantTileset], 0, 0).setScale(scale);
        
        const keyLayer = map.getObjectLayer("mazeKeys");
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

        dragons.length = 0;

        createPlayer.call(this);

        // this.physics.add.collider(this.player, gate);

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
