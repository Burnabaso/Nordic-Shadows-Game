class ThirdLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'ThirdLevel' });
    }

    preload() {
        preloadAssets.call(this);
    }

    create() {
        dragons.length = 0;
        let map=this.add.image(350, 350, 'map');
        map.setScale(this.cameras.main.width / map.width);
        createPlayer.call(this);
        //dragon creation
        dragons.push(new Dragon(this, 400, 400, [
            { x: 500, y: 400 },
            { x: 400, y: 400 }
        ], 120));
        
        cursors = this.input.keyboard.createCursorKeys();
        console.log("Scene3");
    }

    update() {
        updatePlayer.call(this);
        for (const dragon of dragons) {
            dragon.update(this.player);
        }
    }
}