
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player;
var cursors;
var animname;
var game = new Phaser.Game(config);

function preload()
{
    this.load.atlas('knight', '../Game/Assets/knight/spritesheet.png', '../Game/Assets/knight/spritesheet.json');
    this.load.atlas('mage', '../Game/Assets/mage/spritesheet.png', '../Game/Assets/mage/spritesheet.json');
    this.load.atlas('rogue', '../Game/Assets/rogue/spritesheet.png', '../Game/Assets/rogue/spritesheet.json');
}

function create(){
    animname = 'knight'
    player = this.physics.add.sprite(100, 450, animname);
    player.setCollideWorldBounds(true);
    this.physics.gravity=0
    this.anims.create({
        key: 'walk',
        frames: [
            { key: animname, frame: 'walk1.png' },
            { key: animname, frame: 'walk2.png' },
            { key: animname, frame: 'walk3.png' },
            { key: animname, frame: 'walk4.png' },
            { key: animname, frame: 'walk5.png' },
            { key: animname, frame: 'walk6.png' }
        ],
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key:'idle',
        frames:[{key:animname,frame:'Knight.png'}],
        frameRate:8,
        repeat:-1,
    })
    cursors = this.input.keyboard.createCursorKeys();
}
function update (){
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
        player.anims.play('walk', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
        player.anims.play('walk', true);
    }else if (cursors.up.isDown){
        player.setVelocityY(-160);
        player.anims.play('walk', true);
    }else if (cursors.down.isDown){
        player.setVelocityY(160);
        player.anims.play('walk', true);
    }  else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('idle',true);
    }
}