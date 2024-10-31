class DeathScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DeathScene' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        // TODO: replace with designed image
        let map=this.add.image(350, 400, 'deathScene');

       
        createPlayer.call(this);
        
        
        cursors = this.input.keyboard.createCursorKeys();
        handleScore(this);
        handleHealth(this,true);
        updateScore();
    }
    
    update() {
        updatePlayer.call(this);
    }
}
