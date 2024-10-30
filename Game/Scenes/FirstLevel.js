class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
        this.collectedKeys = 0; // Initialize collected keys count
        this.collectedGems = 0; // Initialize collected gems count
        this.keySprites = [];
        this.gemSprites = [];
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        this.collectedKeys = 0;
        this.collectedGems = 0; // Reset collected gems at the start of the level
        const map = this.make.tilemap({ key: "mapLevel1" });

        const grassTileset = map.addTilesetImage("TXTilesetGrass", "TXTilesetGrass");
        const wallTileset = map.addTilesetImage("Wall-Dirt", "Wall-Dirt");
        const plantTileset = map.addTilesetImage("TXPlant", "TXPlant");
        const keyTileset = map.addTilesetImage("key_big", "key_big.png");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const scale = 0.73;
        const yOffset = 16; // Offset to align the gem's vertical position if needed

        map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        map.createLayer("mazeDecoration", [plantTileset], 0, 0).setScale(scale);

        const keyLayer = map.getObjectLayer("mazeKey");
        const gemLayer = map.getObjectLayer("mazeGems");

        // Create player first
        createPlayer.call(this);

        // Create and set up keys
        if (keyLayer) {
            keyLayer.objects.forEach(key => {
                const keySprite = this.physics.add.sprite(key.x * scale, key.y * scale, "key_big");
                keySprite.setOrigin(0, 1).setScale(scale);
                this.keySprites.push(keySprite);

                this.physics.add.collider(this.player, keySprite, () => {
                    if (keySprite.active) {
                        this.collectKey(keySprite);
                    }
                }, null, this);
            });
        }

        // Create and set up gems
        if (gemLayer) {
            gemLayer.objects.forEach(gem => {
                const gemSprite = this.physics.add.sprite(gem.x * scale, (gem.y * scale), "GoldenIngot");
                gemSprite.setOrigin(0, 1).setScale(scale);
                this.gemSprites.push(gemSprite);

                this.physics.add.collider(this.player, gemSprite, () => {
                    if (gemSprite.active) {
                        this.collectGem(gemSprite);
                    }
                }, null, this);
            });
        }

        mazeWalls.setCollisionByExclusion([-1]);

        let gate = this.physics.add.staticImage(690, 400, 'gate');
        gate.setSize(65, 100);
        gate.setScale(0.18);
        this.gate = gate;

        this.physics.add.collider(this.player, gate);

        dragons.push(new Dragon(this, 400, 400, [
            { x: 500, y: 400 },
            { x: 400, y: 400 }
        ], 120));
        createAnimations(this, characterName);

        this.physics.add.collider(this.player, mazeWalls);

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
            if (this.collectedKeys === 1 && this.gate) {
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
        updateHealth();
        updatePlayer.call(this);
        for (const dragon of dragons) {
            dragon.update(this.player);
        }
    }
}
