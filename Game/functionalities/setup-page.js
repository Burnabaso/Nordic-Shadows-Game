const nextButton1 = document.getElementById("setup-button-1");
const nextButton2 = document.getElementById("setup-button-2");

const vikingCharacter = document.getElementById("viking-character");
const mageCharacter = document.getElementById("mage-character");
const assassinCharacter = document.getElementById("assassin-character");
var chosenCharacter;

const userNameInput = document.getElementById("username");
var userName;

nextButton1?.addEventListener("click", function () {
window.location.href = "http://localhost:5500/pages/player-setup/username.html";
});
nextButton2?.addEventListener("click", function () {
    if(userNameInput.value.trim()===""){
        alert("You must name yourself");
    }
    else{
        const userValue = userNameInput.value.trim();
        userName = userValue;
        localStorage.setItem("chosenUsername", userName);
        window.location.href = "http://localhost:5500/pages/player-setup/character.html";
    }
});

vikingCharacter?.addEventListener("click", function () {
  chosenCharacter = "viking";
  localStorage.setItem("chosenCharacter", chosenCharacter);
  window.location.href = "http://localhost:5500/pages/game.html";
});
mageCharacter?.addEventListener("click", function () {
  chosenCharacter = "mage";
  localStorage.setItem("chosenCharacter", chosenCharacter);
  window.location.href = "http://localhost:5500/pages/game.html";
});
assassinCharacter?.addEventListener("click", function () {
  chosenCharacter = "assassin";
  localStorage.setItem("chosenCharacter", chosenCharacter);
  window.location.href = "http://localhost:5500/pages/game.html";
});
