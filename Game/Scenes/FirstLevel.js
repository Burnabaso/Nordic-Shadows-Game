class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
        this.collectedKeys = 0;
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        this.collectedKeys = 0;
        let map=this.add.image(350, 400, 'mapLevel1');
        map.setScale(this.cameras.main.width / map.width);
        let gate=this.physics.add.staticImage(690, 400, 'gate');
        gate.setSize(65,100);
        gate.setScale(0.18);
        this.gate=gate;
        createPlayer.call(this);
        this.physics.add.collider(this.player, gate);
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