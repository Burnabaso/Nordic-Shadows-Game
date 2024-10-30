
function handleScore(scene) {
 scoreText = scene.add.text(500, 10, "score:  0", {
    fontSize: "40px",
    fill: "#ffffff",
    fontFamily: "norse",
    backgroundColor:'rgba(0,0,0,0.5)',
});
}
function updateScore(gemCollected){
    // finished with time left 1000points
    if(gemCollected){
        totalScore+=50;
    }
    if(localStorage.getItem("levelNumber")=="2"){
        totalScore+=250;
    }
    else if(localStorage.getItem("levelNumber")=="3"){
        totalScore+=300;
    }
    else if(timeLeft>0 && localStorage.getItem("levelNumber")=="4"){
        totalScore+=1000;
    }
    // finished but time is up  500 points level 3 prize
    else if(localStorage.getItem("levelNumber")=="4"){
        totalScore+=350;
    }

    scoreText.setText("Score: " + totalScore);

}
  