class SecondLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondLevel' });
    }

    preload() {
    }

    create() {
        let map=this.add.image(350, 350, 'mapLevel2');
        map.setScale(this.cameras.main.width / map.width);

        createPlayer.call(this);
        cursors = this.input.keyboard.createCursorKeys();
        handleCountdown(this);
        handleScore(this);

        console.log("Scene2")
        updateScore();
    }

    update() {
        updatePlayer.call(this);

    }
}
// TODO: display the health and score on scene screen