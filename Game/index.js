var config = {
  type: Phaser.AUTO,
  width: 700,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [FirstLevel, SecondLevel, ThirdLevel],
};
var animname;
var cursors;
var game = new Phaser.Game(config);

function createAnimations(scene, animname) {
  scene.anims.create({
    key: "idle",
    frames: [{ key: animname, frame: "idle.png" }],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "walk",
    frames: [
      { key: animname, frame: "walk1.png" },
      { key: animname, frame: "walk2.png" },
      { key: animname, frame: "walk3.png" },
      { key: animname, frame: "walk4.png" },
      { key: animname, frame: "walk5.png" },
      { key: animname, frame: "walk6.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "push",
    frames: [
      { key: animname, frame: "push1.png" },
      { key: animname, frame: "push2.png" },
      { key: animname, frame: "push3.png" },
      { key: animname, frame: "push4.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "hurt",
    frames: [
      { key: animname, frame: "hurt1.png" },
      { key: animname, frame: "hurt2.png" },
      { key: animname, frame: "hurt3.png" },
      { key: animname, frame: "hurt4.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "death",
    frames: [
      { key: animname, frame: "death1.png" },
      { key: animname, frame: "death2.png" },
      { key: animname, frame: "death3.png" },
      { key: animname, frame: "death4.png" },
      { key: animname, frame: "death5.png" },
      { key: animname, frame: "death6.png" },
      { key: animname, frame: "death7.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });

  //dragon animation
  scene.anims.create({
    key: "dragon_run",
    frames: [
      { key: "dragon", frame: "dragon_knight_run-0.png" },
      { key: "dragon", frame: "dragon_knight_run-1.png" },
      { key: "dragon", frame: "dragon_knight_run-2.png" },
      { key: "dragon", frame: "dragon_knight_run-3.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "dragon_idle",
    frames: [
      { key: "dragon", frame: "dragon_knight_idle-0.png" },
      { key: "dragon", frame: "dragon_knight_idle-1.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "dragon_attack",
    frames: [
      { key: "dragon", frame: "dragon_knight_attack_1.png" },
      { key: "dragon", frame: "dragon_knight_attack_2.png" },
      { key: "dragon", frame: "dragon_knight_attack_3.png" },
      { key: "dragon", frame: "dragon_knight_attack_4.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
}
function createPlayer(scene) {
  this.player = this.physics.add.sprite(100, 450, animname);
  this.player.setCollideWorldBounds(true);
  this.player.health = 100;
  this.player.setScale(0.5);
  this.player.body.setOffset(
    this.player.width/2,
    this.player.height/2-25
  )
}
function preloadAssets(scene) {
  this.load.atlas(
    "knight",
    "../Game/Assets/knight/spritesheet.png",
    "../Game/Assets/knight/spritesheet.json"
  );
  this.load.atlas(
    "mage",
    "../Game/Assets/mage/spritesheet.png",
    "../Game/Assets/mage/spritesheet.json"
  );
  this.load.atlas(
    "rogue",
    "../Game/Assets/rogue/spritesheet.png",
    "../Game/Assets/rogue/spritesheet.json"
  );
  this.load.atlas(
    "dragon",
    "../Game/Assets/dragon/dragon.png",
    "../Game/Assets/dragon/dragon.json"
  );
  this.load.image('map',"../Game/Assets/map.jpg")
}
function updatePlayer(scene) {
  if (cursors.left.isDown) {
    this.player.setVelocityX(-100);
    this.player.setFlipX(true);
    this.player.anims.play("walk", true);
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(100);
    this.player.setFlipX(false);
    this.player.anims.play("walk", true);
  }else {
    this.player.setVelocityX(0);
  }
 if (cursors.up.isDown) {
    this.player.setVelocityY(-100);
    this.player.anims.play("walk", true);
  } else if (cursors.down.isDown) {
    this.player.setVelocityY(100);
    this.player.anims.play("walk", true);
  }else {
    this.player.setVelocityY(0);
  }
  if(this.player.body.velocity.x===0&&this.player.body.velocity.y===0){
    this.player.anims.play("idle",true);
  }
  if (this.player.x > 750) {
    this.scene.start("SecondLevel");
  }
}
