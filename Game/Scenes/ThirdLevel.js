class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        animname = 'knight';
        createPlayer.call(this);
        createAnimations(this, animname);
        cursors = this.input.keyboard.createCursorKeys();
        console.log("Scene3")
    }

    update() {
        updatePlayer.call(this);
    }
}