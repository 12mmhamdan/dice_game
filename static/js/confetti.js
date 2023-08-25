// confetti.js

// Function to create and animate a confetti element
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    // Set random position and rotation
    const positionX = Math.random() * window.innerWidth;
    const positionY = Math.random() * window.innerHeight;
    const rotation = Math.random() * 360;
    
    confetti.style.left = positionX + "px";
    confetti.style.top = positionY + "px";
    confetti.style.transform = `rotate(${rotation}deg)`;
    
    // Add confetti to the document
    document.body.appendChild(confetti);
    
    // Remove confetti after animation completes
    confetti.addEventListener("animationend", () => {
        document.body.removeChild(confetti);
    });
}

// Function to display confetti
function displayConfetti() {
    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

// Function to update the total score and check if the game is won
function updateTotalScore(score) {
    totalScore += score;
    totalScoreElement.textContent = totalScore;

    if (totalScore >= targetScore) {
        // Display the winning message
        winMessage.textContent = "Congratulations! You won the game!";
        winMessage.style.display = "block";

        // Display confetti
        displayConfetti();

        // Disable the roll button
        rollButton.disabled = true;
    }
}