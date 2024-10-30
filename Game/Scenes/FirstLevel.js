class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        
        const map = this.make.tilemap({ key: "mapLevel1" });

        const grassTileset = map.addTilesetImage("TXTilesetGrass", "TXTilesetGrass");
        const wallTileset = map.addTilesetImage("Wall-Dirt", "Wall-Dirt");
        const plantTileset = map.addTilesetImage("TXPlant", "TXPlant");
        const keyTileset = map.addTilesetImage("key_big", "key_big.png");
        const ingotTileset = map.addTilesetImage("GoldenIngot", "GoldenIngot");

        const mazeFloor = map.createLayer("mazeFloor", [grassTileset], 0, 0);
        const mazeWalls = map.createLayer("mazeWalls", [wallTileset], 0, 0);
        const mazeDecoration = map.createLayer("mazeDecoration", [plantTileset], 0, 0);
        
        const keyLayer = map.getObjectLayer("mazeKey");
        const gemLayer = map.getObjectLayer("mazeGems");

        if (keyLayer) {
            keyLayer.objects.forEach(key => {
                const keySprite = this.physics.add.sprite(key.x, key.y, "key_big");
                keySprite.setOrigin(0, 1); 
            });
        }
    
        if (gemLayer) {
            gemLayer.objects.forEach(gem => {
                const gemSprite = this.physics.add.sprite(gem.x, gem.y, "GoldenIngot");
                gemSprite.setOrigin(0, 1); 
            });
        }
        


        createPlayer.call(this);
        //dragon creation
        dragons.push(new Dragon(this, 400, 400, [
            { x: 500, y: 400 },
            { x: 400, y: 400 }
        ], 120));
        
        createAnimations(this, characterName);
        
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