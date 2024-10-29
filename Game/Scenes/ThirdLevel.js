class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        let map=this.add.image(350, 350, 'mapLevel3');
        map.setScale(this.cameras.main.width / map.width);

        createPlayer.call(this);
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);

        console.log("Scene3")
        updateScore();
    }
    
    update() {
        updatePlayer.call(this);
    }
}