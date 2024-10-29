class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        
        let map=this.add.image(350, 350, 'mapLevel1');
        map.setScale(this.cameras.main.width / map.width);
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
        updatePlayer.call(this);
        for (const dragon of dragons) {
            dragon.update(this.player);
        }
    }
}