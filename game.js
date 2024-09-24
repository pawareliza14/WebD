const levels = [
    { 
        sentence: "In the beginning, the universe was created. This has made a lot of people very angry and has widely been regarded as a bad move.",
        answer: "the universe was created"
    },
    { 
        sentence: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        answer: "single man in possession of a good fortune"
    },
    { 
        sentence: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
        answer: "best of times"
    },
    // Add more levels with larger paragraphs as needed
];

let currentLevel = 0;
let score = 0;
let timeLimit = 30; // Time for each level
let timerInterval;

function displayLevel() {
    const levelInfo = document.getElementById("level-info");
    const scoreInfo = document.getElementById("score-info");
    const sentence = document.getElementById("sentence");
    levelInfo.textContent = `Level: ${currentLevel + 1}`;
    scoreInfo.textContent = `Score: ${score}`;
    sentence.textContent = levels[currentLevel].sentence;
    resetTimer();
    resetInput();
}

function resetInput() {
    document.getElementById("user-input").value = "";
    updateHighlightedText("");
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLimit = 30;
    document.getElementById("timer").textContent = `Time: ${timeLimit}`;
    timerInterval = setInterval(() => {
        timeLimit--;
        document.getElementById("timer").textContent = `Time: ${timeLimit}`;
        if (timeLimit <= 0) {
            clearInterval(timerInterval);
            document.getElementById("result").textContent = "Time's up! Game over.";
            disableGame();
        }
    }, 1000);
}

function disableGame() {
    document.getElementById("submit").disabled = true;
    document.getElementById("user-input").disabled = true;
    document.getElementById("reset").style.display = "block"; // Show reset button
}

function resetGame() {
    currentLevel = 0;
    score = 0;
    displayLevel();
    document.getElementById("result").textContent = "";
    document.getElementById("reset").style.display = "none"; // Hide reset button
    document.getElementById("submit").disabled = false;
    document.getElementById("user-input").disabled = false;
}

function updateHighlightedText(userInput) {
    const sentence = levels[currentLevel].sentence;
    const highlightedText = sentence.split('').map((char, index) => {
        if (index < userInput.length) {
            if (char === userInput[index]) {
                return `<span class="correct">${char}</span>`; // Correctly typed
            } else {
                return `<span class="incorrect">${char}</span>`; // Incorrectly typed
            }
        }
        return char; // Not typed yet
    }).join('');
    
    document.getElementById("sentence").innerHTML = highlightedText;
}

document.getElementById("user-input").addEventListener("input", (event) => {
    const userInput = event.target.value;
    updateHighlightedText(userInput);
});

document.getElementById("submit").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = levels[currentLevel].answer;

    if (userInput === correctAnswer) {
        score += 10; // Increment score
        document.getElementById("result").textContent = "Correct! Moving to the next level...";
        currentLevel++;
        resetInput();
        if (currentLevel < levels.length) {
            displayLevel();
        } else {
            document.getElementById("result").textContent = "Congratulations! You've completed all levels!";
            disableGame();
        }
    } else {
        document.getElementById("result").textContent = "Try again!";
    }
});

document.getElementById("reset").addEventListener("click", resetGame);

// Initialize game
displayLevel();
