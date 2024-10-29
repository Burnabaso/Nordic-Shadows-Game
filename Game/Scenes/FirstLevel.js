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
        createAnimations(this, characterName);
        
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);
        updateScore();
        
    }

    update() {
        updatePlayer.call(this);
    }
}