// DOM elements
const diceContainer = document.getElementById("dice");
const scoreList = document.getElementById("score-list");
const totalScoreElement = document.getElementById("total-score");
const winMessage = document.getElementById("win-message");
const rollButton = document.getElementById("roll-button");

// Initialize game variables
let totalScore = 0;
const targetScore = 10000;
const diceImages = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
let previousRoll = null; // Variable to store the previous roll

// Function to roll a single die
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to calculate the score for a roll
function calculateScore(diceValues) {
    let score = 0;

    // Count the occurrences of each number (1-6)
    const counts = [0, 0, 0, 0, 0, 0];
    for (const value of diceValues) {
        counts[value - 1]++;
    }

    // Calculate scores based on the rules
    for (let i = 0; i < 6; i++) {
        if (counts[i] >= 3) {
            if (i === 0) {
                score += 1000;
            } else {
                score += (i + 1) * 100;
            }
            counts[i] -= 3;
        }

        if (i === 0 && counts[i] > 0) {
            score += counts[i] * 100;
        } else if (i === 4 && counts[i] > 0) {
            score += counts[i] * 50;
        }
    }

    if (diceValues.join("") === "123456") {
        score += 1500;
    }

    return score;
}

// Function to update the total score
function updateTotalScore(score) {
    totalScore += score;
    totalScoreElement.textContent = totalScore;

    if (totalScore >= targetScore) {
        // Display the winning message with animation
        winMessage.textContent = "Congratulations! You won the game!";
        winMessage.style.display = "block";

        // Disable the roll button
        rollButton.disabled = true;
    }
}
// Function to display the dice roll and score
function displayRoll(diceValues, score) {
    const rollResult = document.createElement("li");
    rollResult.textContent = `Roll: [${diceValues.join(", ")}] Score: ${score}`;
    scoreList.appendChild(rollResult);
    previousRoll = rollResult; // Store the previous roll element
}

// Function to handle a dice roll
function rollDice() {
    // Clear the previous roll display
    if (previousRoll) {
        scoreList.removeChild(previousRoll);
        previousRoll = null;
    }

    // Roll six dice
    const diceValues = [];
    for (let i = 0; i < 6; i++) {
        const value = rollDie();
        diceValues.push(value);
    }

    // Display the dice roll
    diceContainer.textContent = diceValues.map((value) => diceImages[value - 1]).join(" ");

    // Calculate the score for the roll
    const score = calculateScore(diceValues);

    // Update the total score and display the roll
    updateTotalScore(score);
    displayRoll(diceValues, score);
}





// Add click event listener to the roll button
rollButton.addEventListener("click", rollDice);



// Create a reset button element
const resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";

// Append the reset button to the body element
document.body.appendChild(resetButton);

// Add a click event listener to the reset button to reset the game
resetButton.addEventListener("click", resetGame);

// Function to reset the game
function resetGame() {
    // Reset game variables
    totalScore = 0;
    totalScoreElement.textContent = totalScore;
    scoreList.innerHTML = "";
    winMessage.style.display = "none";
    rollButton.disabled = false;

    // Clear the previous roll element without removing it from the DOM
    previousRoll = null;

    // Remove any existing click event listeners from the roll button
    rollButton.removeEventListener("click", rollDice);

    // Add click event listener to the roll button again
    rollButton.addEventListener("click", rollDice);

    // Clear the dice container
    diceContainer.textContent = "";

    // Remove any remaining confetti elements from the DOM
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((element) => {
        document.body.removeChild(element);
    });
}


