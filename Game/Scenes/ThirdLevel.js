class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
        this.collectedKeys = 0;
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        this.collectedKeys = 0;
        let map=this.add.image(350, 400, 'mapLevel3');
        map.setScale(this.cameras.main.width / map.width);
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