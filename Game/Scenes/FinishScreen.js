class FinishScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'FinishScreen' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        // TODO: replace with designed image
        let map=this.add.image(350, 350, 'mapFinish');
        // map.setScale(this.cameras.main.width / map.width);

       
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