document.addEventListener("DOMContentLoaded",function(){
   document.body.innerHTML+=`
        <div class="stat-card">
            <h2 id="user-name">${userName}</h2>
            <h3>Health:</h3>
            <p id="health-value">${playerHealth}</p>
            <h3>Score:</h3>
            <p id="score-value">${totalScore}</p>
        </div>
   `
})