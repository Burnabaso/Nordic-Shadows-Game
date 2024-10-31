class Dragon {
    constructor(scene, spawnX, spawnY, waypoints, speed) {
      this.scene = scene;
      this.dragon = this.scene.physics.add.sprite(spawnX, spawnY, "dragon");
      this.dragon.setScale(0.4);
      this.dragon.body.setSize(62,32);
      this.dragon.body.setOffset(
        this.dragon.width / 2,
        this.dragon.height / 2 
      );
      this.waypoints = waypoints;
      this.currentWaypointIndex = 0;
      this.speed = speed;
      this.isAttacking = false;
    }
  
    update(player) {
      const currentWaypoint = this.waypoints[this.currentWaypointIndex];
      const distance = Phaser.Math.Distance.Between(
        this.dragon.x,
        this.dragon.y,
        currentWaypoint.x,
        currentWaypoint.y
      );
  
      //attack logic
      const playerDistanceX = Math.abs(this.dragon.x - player.x);
      const playerDistanceY = Math.abs(this.dragon.y - player.y);
      const isFacingPlayerX = 
      (this.dragon.body.velocity.x < 0 && player.x < this.dragon.x) ||
      (this.dragon.body.velocity.x > 0 && player.x > this.dragon.x);
      const isFacingPlayerY=   
      (this.dragon.body.velocity.y < 0 && player.y < this.dragon.y) ||
      (this.dragon.body.velocity.y > 0 && player.y > this.dragon.y);
    if (!this.isAttacking && (playerDistanceY < 50 && playerDistanceX < 15 &&  isFacingPlayerY) || (playerDistanceX < 50 && playerDistanceY < 10 &&  isFacingPlayerX)) {
      this.attack(player);
      return;
    }
  
      //movement logic
      if (!this.isAttacking) {
        if (distance > 5) {
          const directionX = currentWaypoint.x - this.dragon.x;
          const directionY = currentWaypoint.y - this.dragon.y;
          const angle = Math.atan2(directionY, directionX);
          this.dragon.setVelocityX(Math.cos(angle) * this.speed);
          this.dragon.setVelocityY(Math.sin(angle) * this.speed);
        } else {
          this.dragon.setVelocity(0);
          this.currentWaypointIndex =
            (this.currentWaypointIndex + 1) % this.waypoints.length;
        }
        if (
          this.dragon.body.velocity.x != 0 ||
          this.dragon.body.velocity.y != 0
        ) {
          this.dragon.anims.play("dragon_run", true);
        }
        if (this.dragon.body.velocity.x < 0) {
          this.dragon.setFlipX(true);
        } else {
          this.dragon.setFlipX(false);
        }
      }
    }
    attack(player) {
      //dragon logic
      this.isAttacking = true;
      this.dragon.setVelocity(0);
      this.dragon.anims.play("dragon_attack", true);
      this.scene.time.delayedCall(900, () => {
        this.isAttacking = false;
        this.dragon.anims.play("dragon_run", true);
        this.currentWaypointIndex =
          (this.currentWaypointIndex - 1 + this.waypoints.length) %
          this.waypoints.length;
      });
  //player logic
      attacked = true;
      player.setVelocity(0, 0);
      if(playerHealth>=25){
      player.anims.play("hurt", true);
      }
      this.scene.time.delayedCall(500, () => {
        attacked = false;
        decreaseHealth=true;
      });
  
  
    }
  }