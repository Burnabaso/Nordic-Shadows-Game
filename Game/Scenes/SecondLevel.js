class SecondLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondLevel' });       
        this.collectedKeys = 0;
        this.collectedGems = 0; 
        this.keySprites = [];
        this.gemSprites = [];
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
        this.collectedGems = 0;
    
        const map = this.make.tilemap({ key: "mapLevel2" });
        const scale = 0.73;
    
        const grassTileset = map.addTilesetImage("Floor-Grass", "Floor-Grass");
        const wallTileset = map.addTilesetImage("Floor-Sand", "Floor-Sand");
        const plantTileset = map.addTilesetImage("TXProps", "TXProps");
        const keyTileset = map.addTilesetImage("key_big", "key_big");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");
    
        map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        map.createLayer("mazeDecorations", [plantTileset], 0, 0).setScale(scale);
    
        // Initialize player first
        createPlayer.call(this);
    
        // Initialize keys
        const keyLayer = map.getObjectLayer("mazeKeys");
        if (keyLayer) {
            keyLayer.objects.forEach(key => {
                const keySprite = this.physics.add.sprite(key.x * scale, key.y * scale, "key_big");
                keySprite.setOrigin(0, 1).setScale(scale);
                this.keySprites.push(keySprite);
    
                // Add collider only after player is defined
                this.physics.add.collider(this.player, keySprite, () => {
                    if (keySprite.active) this.collectKey(keySprite);
                }, null, this);
            });
        }
    
        // Initialize gems
        const gemLayer = map.getObjectLayer("mazeGems");
        if (gemLayer) {
            gemLayer.objects.forEach(gem => {
                const gemSprite = this.physics.add.sprite(gem.x * scale, gem.y * scale, "GoldenIngot");
                gemSprite.setOrigin(0, 1).setScale(scale);
                this.gemSprites.push(gemSprite);
    
                // Add collider only after player is defined
                this.physics.add.collider(this.player, gemSprite, () => {
                    if (gemSprite.active) this.collectGem(gemSprite);
                }, null, this);
            });
        }
    
        mazeWalls.setCollisionByExclusion([-1]);
        
        // Setup gate after initializing colliders
        let gate = this.physics.add.staticImage(690, 350, 'gate').setSize(65, 100).setScale(0.18);
        this.gate = gate;
        this.physics.add.collider(this.player, gate);
    
        createAnimations(this, characterName);
    
        this.physics.add.collider(this.player, mazeWalls);
    
        // Dragon creation
        dragons.length = 0;
        dragons.push(new Dragon(this, 500, 50, [
            { x: 500, y: 50 },
            { x: 630, y: 50 }
        ], 120));

        dragons.push(new Dragon(this, 60, 370, [
            { x: 55, y: 370 },
            { x: 150, y: 370 }
        ], 80));
        dragons.push(new Dragon(this, 230, 230, [
            { x: 230, y: 230 },
            { x: 230, y: 450 }
        ], 120));
        dragons.push(new Dragon(this, 120, 110, [
            { x: 120, y: 110 },
            { x:120, y: 250 }
        ], 66));
        dragons.push(new Dragon(this, 260, 50, [
            { x: 260, y: 50 },
            { x: 450, y: 50 }
        ], 120));
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);
        handleHealth(this);
        updateScore();
    }
    
     // Function to handle key collection
     collectKey(keySprite) {
        if (keySprite.active) {
            keySprite.disableBody(true, true);
            this.collectedKeys += 1;
            updateScore(); // Update the score or UI here
            console.log(`Keys collected: ${this.collectedKeys}`);
            
            // Destroy the gate if collected keys reach 1
            if (this.collectedKeys === 2 && this.gate) {
                this.gate.destroy();
                console.log('Gate destroyed');
            }
        }
    }

    // Function to handle gem collection
    collectGem(gemSprite) {
        if (gemSprite.active) {
            gemSprite.disableBody(true, true);
            this.collectedGems += 1;
            updateScore(true); // Update the score or UI here
            console.log(`Gems collected: ${this.collectedGems}`);
        }
    }

    update() {
        updateHealth(this,this.player);
        updatePlayer.call(this);
        for (const dragon of dragons) {
            dragon.update(this.player);
        }
    }
}
