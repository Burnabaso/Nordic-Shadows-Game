class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        createPlayer.call(this);
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        console.log("Scene3")
    }

    update() {
        updatePlayer.call(this);
    }
}