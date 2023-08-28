
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    const confettiColors = ["#FFD700", "#FF6347", "#00FF7F", "#6495ED", "#FF69B4"];
    
    const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    
    confetti.style.backgroundColor = randomColor;
    
    const positionX = Math.random() * window.innerWidth;
    const positionY = Math.random() * window.innerHeight;
    const rotation = Math.random() * 360;
    
    confetti.style.left = positionX + "px";
    confetti.style.top = positionY + "px";
    confetti.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(confetti);
    
    confetti.addEventListener("animationend", () => {
        document.body.removeChild(confetti);
    });
}


function displayConfetti() {
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function updateTotalScore(score) {
    totalScore += score;
    totalScoreElement.textContent = totalScore;

    if (totalScore >= targetScore) {
       
        winMessage.textContent = "Congratulations! You won the game!";
        winMessage.style.display = "block";

        
        displayConfetti();

        
        rollButton.disabled = true;
    }
}