class DeathScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DeathScene' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        let map=this.add.image(350, 350, 'deathScene');

       
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
