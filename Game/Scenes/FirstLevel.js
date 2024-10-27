class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        animname = 'knight';
        createPlayer.call(this);
        createAnimations(this, animname);
        cursors = this.input.keyboard.createCursorKeys();
        console.log("Scene1");
    }

    update() {
        updatePlayer.call(this);
    }
}