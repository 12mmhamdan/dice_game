const diceContainer = document.getElementById("dice");
const scoreList = document.getElementById("score-list");
const totalScoreElement = document.getElementById("total-score");
const winMessage = document.getElementById("win-message");
const rollButton = document.getElementById("roll-button");

let totalScore = 0;
const targetScore = 10000;
const diceImages = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
let previousRoll = null;

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function calculateScore(diceValues) {
    let score = 0;

    const counts = [0, 0, 0, 0, 0, 0];
    for (const value of diceValues) {
        counts[value - 1]++;
    }

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

function updateTotalScore(score) {
    totalScore += score;
    totalScoreElement.textContent = totalScore;

    if (totalScore >= targetScore) {
        winMessage.textContent = "Congratulations! You won the game!";
        winMessage.style.display = "block";

        rollButton.disabled = true;
    }
}
function displayRoll(diceValues, score) {
    const rollResult = document.createElement("li");
    rollResult.textContent = `Roll: [${diceValues.join(", ")}] Score: ${score}`;
    scoreList.appendChild(rollResult);
    previousRoll = rollResult; 
}

function rollDice() {
    if (previousRoll) {
        scoreList.removeChild(previousRoll);
        previousRoll = null;
    }

    const diceValues = [];
    for (let i = 0; i < 6; i++) {
        const value = rollDie();
        diceValues.push(value);
    }

    diceContainer.textContent = diceValues.map((value) => diceImages[value - 1]).join(" ");

    const score = calculateScore(diceValues);

    updateTotalScore(score);
    displayRoll(diceValues, score);
}





rollButton.addEventListener("click", rollDice);



const resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";

document.body.appendChild(resetButton);

resetButton.addEventListener("click", resetGame);

function resetGame() {
    totalScore = 0;
    totalScoreElement.textContent = totalScore;
    scoreList.innerHTML = "";
    winMessage.style.display = "none";
    rollButton.disabled = false;

    previousRoll = null;

    rollButton.removeEventListener("click", rollDice);

    rollButton.addEventListener("click", rollDice);

    diceContainer.textContent = "";

    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((element) => {
        document.body.removeChild(element);
    });
}


