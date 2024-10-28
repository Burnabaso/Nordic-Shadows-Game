class FirstLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        
        let map=this.add.image(350, 350, 'map');
        map.setScale(this.cameras.main.width / map.width);
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