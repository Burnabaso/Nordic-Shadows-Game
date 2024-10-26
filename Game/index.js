
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
    this.load.atlas('dragon', '../Game/Assets/dragon/dragon.png', '../Game/Assets/dragon/spridragontesheet.json');
}

function create(){
    animname = 'knight'
    player = this.physics.add.sprite(100, 450, animname);
    player.setCollideWorldBounds(true);

//player animations
    this.anims.create({
        key:'idle',
        frames:[{key:animname,frame:'idle.png'}],
        frameRate:8,
        repeat:-1,
    })
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
        key: 'push',
        frames: [
            { key: animname, frame: 'push1.png' },
            { key: animname, frame: 'push2.png' },
            { key: animname, frame: 'push3.png' },
            { key: animname, frame: 'push4.png' }
        ],
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: 'hurt',
        frames: [
            { key: animname, frame: 'hurt1.png' },
            { key: animname, frame: 'hurt2.png' },
            { key: animname, frame: 'hurt3.png' },
            { key: animname, frame: 'hurt4.png' }
        ],
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: 'death',
        frames: [
            { key: animname, frame: 'death1.png' },
            { key: animname, frame: 'death2.png' },
            { key: animname, frame: 'death3.png' },
            { key: animname, frame: 'death4.png' },
            { key: animname, frame: 'death5.png' },
            { key: animname, frame: 'death6.png' },
            { key: animname, frame: 'death7.png' }
        ],
        frameRate: 8,
        repeat: -1,
    });
    
//dragon animation
this.anims.create({
    key: 'dragon_run',
    frames: [
        { key: 'dragon', frame: 'dragon_knight_run-0.png' },
        { key: 'dragon', frame: 'dragon_knight_run-1.png' },
        { key: 'dragon', frame: 'dragon_knight_run-2.png' },
        { key: 'dragon', frame: 'dragon_knight_run-3.png' }
    ],
    frameRate: 8,
    repeat: -1,
});
this.anims.create({
    key: 'dragon_idle',
    frames: [
        { key: 'dragon', frame: 'dragon_knight_idle-0.png' },
        { key: 'dragon', frame: 'dragon_knight_idle-1.png' }
    ],
    frameRate: 8,
    repeat: -1,
});

this.anims.create({
    key: 'dragon_run',
    frames: [
        { key: 'dragon', frame: 'dragon_knight_attack_0.png' },
        { key: 'dragon', frame: 'dragon_knight_attack_1.png' },
        { key: 'dragon', frame: 'dragon_knight_attack_2.png' },
        { key: 'dragon', frame: 'dragon_knight_attack_3.png' },
        { key: 'dragon', frame: 'dragon_knight_attack_4.png' }
    ],
    frameRate: 8,
    repeat: -1,
});



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