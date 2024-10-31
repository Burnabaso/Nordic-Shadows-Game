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

     
function updateHealth(){
    if(decreaseHealth){
            playerHealth = playerHealth - 25;
    }
    if(playerHealth<=0){
        // TODO: YASMINA's part gameover screen
        playerHealth = 0;
        console.log("died")
    }
    HealthText.setText(`Health:  ${playerHealth}`);

}