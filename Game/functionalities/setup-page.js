const nextButton1 = document.getElementById("setup-button-1");
const nextButton2 = document.getElementById("setup-button-2");
const userNameInput = document.getElementById("username");
const userNameForm = document.getElementById("usernameForm");
const vikingCharacter = document.getElementById("viking-character");
const mageCharacter = document.getElementById("mage-character");
const assassinCharacter = document.getElementById("assassin-character");
var userName;
var chosenCharacter;
// nextButton2.addEventListener("click",function(){
//     const userValue = userNameInput.value.trim();
//     userName = userValue;
//     window.location.href="pages/player-setup/character.html"
//     console.log("hi")
    
// })

vikingCharacter.addEventListener("click", function(){
    chosenCharacter="viking";
    localStorage.setItem("chosenCharacter", chosenCharacter);
    window.location.href="http://localhost:5500/pages/game.html"
})
mageCharacter.addEventListener("click", function(){
    chosenCharacter="mage";
    localStorage.setItem("chosenCharacter", chosenCharacter);
    window.location.href="http://localhost:5500/pages/game.html"

})
assassinCharacter.addEventListener("click", function(){
    chosenCharacter="assassin";
    localStorage.setItem("chosenCharacter", chosenCharacter);
    window.location.href="http://localhost:5500/pages/game.html"
})
