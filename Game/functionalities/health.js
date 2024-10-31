function handleHealth(scene,finish) {
    if(finish){
        HealthText = scene.add.text(10, 10, `Health:  ${playerHealth}`, {
            fontSize: "40px",
            fill: "#ffffff",
            fontFamily: "norse",
            backgroundColor:'rgba(0,0,0,0.5)',
     });    
    }
    else{
        HealthText = scene.add.text(220, 10, `Health:  ${playerHealth}`, {
           fontSize: "40px",
           fill: "#ffffff",
           fontFamily: "norse",
           backgroundColor:'rgba(0,0,0,0.5)',
        });
    }
}
     
function updateHealth(scene,player){
    if(decreaseHealth){
            playerHealth = playerHealth - 25;
    }
    if (playerHealth <= 25 && !isGameOver && attacked) {
        dead=true;
        isGameOver = true;
        scene.input.keyboard.enabled = false;
        scene.physics.pause();
        player.anims.stop();
        player.anims.play('death', true);  
        scene.time.delayedCall(1500, () => {
            dead=false;
            scene.physics.pause();
            scene.scene.start("FinishScreen");
        });
    }
    HealthText.setText(`Health:  ${playerHealth}`);

}