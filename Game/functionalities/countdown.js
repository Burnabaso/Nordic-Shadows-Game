function handleCountdown(scene) {
  timerText = scene.add.text(10, 10, formatTime(timeLeft), {
    fontSize: "32px",
    color: "#ffffff",
  });

  // Add a repeating event to count down every second
  scene.time.addEvent({
    delay: 1000,
    callback: updateCountdown,
    callbackScope: scene,
    loop: true,
  });
}

function updateCountdown() {
  if (timeLeft > 0) {
    timeLeft--; // Decrease time left by 1 second
    timerText.setText(formatTime(timeLeft)); // Update the text with formatted time
  } else if(localStorage.getItem("levelNumber")==="4" && timeLeft>=0) {
    timeBonus = 1000;}
    else{
        timeBonus = 0;
        this.time.removeAllEvents(); // Stop the timer
  }
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if needed
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}
