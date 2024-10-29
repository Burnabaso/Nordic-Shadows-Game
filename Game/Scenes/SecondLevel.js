class SecondLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondLevel' });
    }

    preload() {
    }

    create() {
        createPlayer.call(this);
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        console.log("Scene2")
    }

    update() {
        updatePlayer.call(this);
    }
}