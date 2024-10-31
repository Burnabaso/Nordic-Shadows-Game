class FinishScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'FinishScreen' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        let map=this.add.image(350, 350, 'mapFinish');

       
        createPlayer.call(this);
        //dragon creation
        
        cursors = this.input.keyboard.createCursorKeys();
        handleScore(this);
        handleHealth(this,true);
        updateScore();
    }
    
    update() {
        updatePlayer.call(this);
    }
}
