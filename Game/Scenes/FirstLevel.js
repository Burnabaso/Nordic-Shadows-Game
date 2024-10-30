class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
        this.collectedKeys = 0; // Initialize collectedKeys
        this.keySprites = [];
    }

    preload() {
        preloadAssets.call(this);
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

        map.createLayer("mazeFloor", [grassTileset], 0, 0).setScale(scale);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0).setScale(scale);
        map.createLayer("mazeDecoration", [plantTileset], 0, 0).setScale(scale);

        const keyLayer = map.getObjectLayer("mazeKey");

        // First, create the player
        createPlayer.call(this);

        // Create colliders and key objects
        if (keyLayer) {
            keyLayer.objects.forEach(key => {
                const keySprite = this.physics.add.sprite(key.x * scale, key.y * scale, "key_big");
                keySprite.setOrigin(0, 1).setScale(scale);
                this.keySprites.push(keySprite);

                // Add collider for each key
                this.physics.add.collider(this.player, keySprite, () => {
                    if (keySprite.active) {
                        this.collectKey(keySprite);
                    }
                }, null, this);
            });
        }
            
        mazeWalls.setCollisionByExclusion([-1]);

        // Create gate as a static image
        let gate = this.physics.add.staticImage(690, 400, 'gate');
        gate.setSize(65, 100);
        gate.setScale(0.18);
        this.gate = gate;

        this.physics.add.collider(this.player, gate);

        // Create dragons
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

    // Callback function to handle key collection
    collectKey(keySprite) {
        if (keySprite.active) {
            keySprite.disableBody(true, true); // Hide and disable the key
            this.collectedKeys += 1; // Increment collected keys count
            updateScore(); // Update score or any other UI here
            console.log(`Keys collected: ${this.collectedKeys}`); // For debugging

            // Check if collected keys reached 1 to destroy the gate
            if (this.collectedKeys === 1 && this.gate) {
                this.gate.destroy(); // Destroy the gate
                console.log('Gate destroyed');
            }
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
