class SecondLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondLevel' });
        this.collectedKeys = 0;
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        this.collectedKeys = 0;
        let map=this.add.image(350, 400, 'mapLevel2');
        map.setScale(this.cameras.main.width / map.width);
        let gate=this.physics.add.staticImage(690, 400, 'gate');
        gate.setSize(65,100);
        gate.setScale(0.18);
        this.gate=gate;
        dragons.length = 0;        
        createPlayer.call(this);
        this.physics.add.collider(this.player, gate);
        dragons.push(new Dragon(this, 400, 400, [
            { x: 500, y: 400 },
            { x: 400, y: 400 }
        ], 120));
        
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
