var characterName=localStorage.getItem("chosenCharacter");
var userName = localStorage.getItem("chosenUsername");
// movement
var cursors;
var playerSpeed;
// BonusTime in seconds
var timeLeft = 120; 
var timerText;
var timeBonus;

// starts at level 1
var currentLevel = 1;

// store score
var totalScore = 0;
var scoreText;

// store health
var playerHealth;
var HealthText;

var decreaseHealth;

// clear stored level number on page reload
window.onbeforeunload = function () {
  localStorage.removeItem("levelNumber")
};

const dragons = [];

//player info
var attacked = false;


//character selection
var characterName = localStorage.getItem("chosenCharacter");

//game config
var config = {
  type: Phaser.AUTO,
  width: 700,
  height: 750,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [FirstLevel, SecondLevel, ThirdLevel,FinishScreen],
};

if (characterName == "knight") {
  playerSpeed = 80;
  playerHealth = 200;
} else if (characterName == "mage") {
  playerSpeed = 120;
  playerHealth = 150;
} else {
  playerSpeed = 160;
  playerHealth = 100;
}

var game = new Phaser.Game(config);

function createPlayer() {
  playername = this.add.text(100, 100, `${userName}`, {
    fontSize: "16px",
    color: "#ffffff",
    fontFamily: "norse",
    backgroundColor: "rgba(0,0,0,0.5)",
  });
  // initiate physics for physics
  this.player = this.physics.add.sprite(25, 400, characterName);
  this.player.setCollideWorldBounds(true);
  this.player.health = playerHealth;
  this.player.setScale(0.5);
  // the size in phaser for collision
  this.player.body.setSize(15, 5);
  this.player.body.setOffset(
    this.player.width / 2 - 10,
    this.player.height / 2 + 15
  );
}

function updatePlayer() {
  playername.x = this.player.body.x + 5 - playername.width / 2;
  playername.y = this.player.body.y - 40;
  if (!attacked) {
    if (cursors.left.isDown) {
      this.player.setVelocityX(-playerSpeed);
      this.player.setFlipX(true);
      this.player.anims.play("walk", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(playerSpeed);
      this.player.setFlipX(false);
      this.player.anims.play("walk", true);
    } else {
      this.player.setVelocityX(0);
    }
    if (cursors.up.isDown) {
      this.player.setVelocityY(-playerSpeed);
      this.player.anims.play("walk", true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(playerSpeed);
      this.player.anims.play("walk", true);
    } else {
      this.player.setVelocityY(0);
    }
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      this.player.anims.play("idle", true);
    }
    if (this.player.x > 670 && this.player.y < 450 && this.player.y > 375) {
      currentLevel++;
    if (currentLevel==2){
      this.scene.start("SecondLevel");
      localStorage.setItem("levelNumber","2")
    }
    else if (currentLevel==3){
      this.scene.start("ThirdLevel");
      localStorage.setItem("levelNumber","3")

    }
    // finished
    else if (currentLevel==4){
      localStorage.setItem("levelNumber","4")
      updateScore()
      this.scene.start("FinishScreen");

    }
    }
    decreaseHealth=false;
  }
}

function preloadAssets() {
  // define key and source of values
  this.load.atlas(
    "knight",
    "/Game/Assets/knight/spritesheet.png",
    "/Game/Assets/knight/spritesheet.json"
  );
  this.load.atlas(
    "mage",
    "/Game/Assets/mage/spritesheet.png",
    "/Game/Assets/mage/spritesheet.json"
  );
  this.load.atlas(
    "rogue",
    "/Game/Assets/rogue/spritesheet.png",
    "/Game/Assets/rogue/spritesheet.json"
  );
  this.load.atlas(
    "dragon",
    "/Game/Assets/dragon/dragon.png",
    "/Game/Assets/dragon/dragon.json"
  );
  // for now fake maze
  this.load.image('mapLevel1',"/Game/Assets/maps/level1.jpg");
  this.load.image('mapLevel2',"/Game/Assets/maps/level2.jpg");
  this.load.image('mapLevel3',"/Game/Assets/maps/level3.jpg");
  this.load.image('mapFinish',"/Game/Assets/maps/finishScreen.svg");

}

function createAnimations(scene, characterName) {
  scene.anims.create({
    key: "idle",
    frames: [{ key: characterName, frame: "idle.png" }],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "walk",
    frames: [
      { key: characterName, frame: "walk1.png" },
      { key: characterName, frame: "walk2.png" },
      { key: characterName, frame: "walk3.png" },
      { key: characterName, frame: "walk4.png" },
      { key: characterName, frame: "walk5.png" },
      { key: characterName, frame: "walk6.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "push",
    frames: [
      { key: characterName, frame: "push1.png" },
      { key: characterName, frame: "push2.png" },
      { key: characterName, frame: "push3.png" },
      { key: characterName, frame: "push4.png" },
    ],
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "hurt",
    frames: [
      { key: characterName, frame: "hurt1.png" },
      { key: characterName, frame: "hurt2.png" },
      { key: characterName, frame: "hurt3.png" },
      { key: characterName, frame: "hurt4.png" },
    ],
    frameRate: 4,
    repeat: 0,
  });
  scene.anims.create({
    key: "death",
    frames: [
      { key: characterName, frame: "death1.png" },
      { key: characterName, frame: "death2.png" },
      { key: characterName, frame: "death3.png" },
      { key: characterName, frame: "death4.png" },
      { key: characterName, frame: "death5.png" },
      { key: characterName, frame: "death6.png" },
      { key: characterName, frame: "death7.png" },
    ],
    frameRate: 5,
    repeat: 0,
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
      { key: "dragon", frame: "dragon_knight_attack_5.png" },
      { key: "dragon", frame: "dragon_knight_attack_6.png" },
    ],
    frameRate: 6,
    repeat: 0,
  });
}
