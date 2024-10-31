class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
        this.collectedKeys = 0;
        this.collectedGems = 0; 
        this.keySprites = [];
        this.gemSprites = [];
    }

    preload() {
        this.load.tilemapTiledJSON("mapLevel3", "/Game/Assets/mazes/mapLevel3.JSON")
         this.load.image("Floor-Stone", "/Game/Assets/TileSets/Floor-Stone.png");
         this.load.image("Wall-Glass", "/Game/Assets/TileSets/Wall-Glass.png");
         this.load.image("TXProps", "/Game/Assets/TileSets/TXProps.png");
         this.load.image("key_big", "/Game/Assets/TileSets/key_big.png");
         this.load.image("GoldenIngot", "/Game/Assets/TileSets/GoldenIngot.png");
    }

    create() {
        this.collectedKeys = 0;
        this.collectedGems = 0;

        const map = this.make.tilemap({ key: "mapLevel3" });
    
        const grassTileset = map.addTilesetImage("Floor-Stone", "Floor-Stone");
        const wallTileset = map.addTilesetImage("Wall-Glass", "Wall-Glass");
        const plantTileset = map.addTilesetImage("TXProps", "TXProps");
        const keyTileset = map.addTilesetImage("key_big", "key_big.png");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const scale = 0.73;


        map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        map.createLayer("mazeDecorations", [plantTileset], 0, 0).setScale(scale);
        
        const gemLayer = map.getObjectLayer("mazeCoins");
        const keyLayer = map.getObjectLayer("mazeKeys");

        createPlayer.call(this);
    


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

        let gate=this.physics.add.staticImage(690, 350, 'gate');
        gate.setSize(65,100);
        gate.setScale(0.18);
        this.gate=gate;
        dragons.length = 0;
        this.physics.add.collider(this.player, gate);
        dragons.push(new Dragon(this, 380, 50, [
            { x: 390, y: 40 },
            { x: 645, y: 40 }
        ], 120));
        dragons.push(new Dragon(this, 130, 255, [
            { x: 130, y: 255 },
            { x: 185, y: 255 },
            { x: 185, y: 140 },
            { x: 125, y: 140 },
            { x: 185, y: 140 },
            { x: 185, y: 255 },
            { x: 125, y: 255 }
        ], 120));
        dragons.push(new Dragon(this, 105, 640, [
            { x: 110, y: 640 },
            { x: 645, y: 640 }
        ], 80));
        dragons.push(new Dragon(this, 600, 360, [
            { x: 605, y: 360 },
            { x: 605, y: 590 }
        ], 40));

        createAnimations(this, characterName);

        this.physics.add.collider(this.player, mazeWalls);
        
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);
        handleHealth(this)
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
            if (this.collectedKeys === 3 && this.gate) {
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