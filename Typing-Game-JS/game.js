const levels = {
    easy: [
        { 
            sentence: "The cat is lounging on the soft, warm mat, enjoying the sun's rays streaming through the window.",
            answer: "the cat is lounging on the soft warm mat enjoying the suns rays streaming through the window"
        },
        { 
            sentence: "I enjoy eating juicy apples while sitting under the shade of a large tree.",
            answer: "i enjoy eating juicy apples while sitting under the shade of a large tree"
        }
    ],
    medium: [
        { 
            sentence: "It is a sunny day outside, perfect for a picnic in the park with friends and family.",
            answer: "it is a sunny day outside perfect for a picnic in the park with friends and family"
        },
        { 
            sentence: "The quick brown fox jumps over the lazy dog, showcasing its agility and playful spirit.",
            answer: "the quick brown fox jumps over the lazy dog showcasing its agility and playful spirit"
        }
    ],
    hard: [
        { 
            sentence: "In the midst of chaos, there is also opportunity; the key is to see beyond the noise and find your path.",
            answer: "in the midst of chaos there is also opportunity the key is to see beyond the noise and find your path"
        },
        { 
            sentence: "To be or not to be, that is the question that has puzzled minds for centuries, echoing through history.",
            answer: "to be or not to be that is the question that has puzzled minds for centuries echoing through history"
        }
    ]
};

let selectedDifficulty = null;
let currentLevel = 0;
let score = 0;

function createDifficultySelection() {
    const difficultySelection = document.getElementById("difficulty-selection");
    ['easy', 'medium', 'hard'].forEach((difficulty) => {
        const button = document.createElement("button");
        button.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        button.onclick = () => selectDifficulty(difficulty);
        difficultySelection.appendChild(button);
    });
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("start-game").style.display = "block"; // Show start button
}

document.getElementById("start-game").addEventListener("click", () => {
    currentLevel = 0;
    score = 0;
    document.getElementById("start-game").style.display = "none";
    document.getElementById("game").style.display = "block";
    displayLevel();
});

function displayLevel() {
    const levelInfo = document.getElementById("level-info");
    const scoreInfo = document.getElementById("score-info");
    const sentence = document.getElementById("sentence");
    
    levelInfo.textContent = `Level: ${currentLevel + 1}`;
    scoreInfo.textContent = `Score: ${score}`;
    
    const levelSentences = levels[selectedDifficulty];
    const currentSentence = levelSentences[currentLevel];
    
    sentence.textContent = currentSentence.sentence; // Use a sentence from the current level
    resetInput();
    updateProgressBar(); // Initialize progress bar
}

function resetInput() {
    document.getElementById("user-input").value = "";
    updateHighlightedText("");
}

document.getElementById("user-input").addEventListener("input", function() {
    const userInput = this.value.toLowerCase();
    const currentSentence = levels[selectedDifficulty][currentLevel].answer;

    updateHighlightedText(userInput, currentSentence);
    updateProgressBar(userInput, currentSentence); // Update progress bar
});

function updateHighlightedText(userInput, correctSentence) {
    const sentenceDiv = document.getElementById("sentence");
    let highlightedHTML = '';

    for (let i = 0; i < correctSentence.length; i++) {
        if (userInput[i] === correctSentence[i]) {
            highlightedHTML += `<span class="correct">${correctSentence[i]}</span>`;
        } else if (userInput[i] !== undefined) {
            highlightedHTML += `<span class="incorrect">${correctSentence[i]}</span>`;
        } else {
            highlightedHTML += correctSentence[i]; // No input yet
        }
    }
    
    sentenceDiv.innerHTML = highlightedHTML;
}

function updateProgressBar(userInput, correctSentence) {
    const progressBar = document.getElementById("progress-bar");
    const correctChars = userInput.split('').filter((char, index) => char === correctSentence[index]).length;
    const progressPercentage = (correctChars / correctSentence.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    if (userInput === correctSentence) {
        score++;
        currentLevel++;
        if (currentLevel < levels[selectedDifficulty].length) {
            displayLevel();
        } else {
            document.getElementById("result").textContent = "Congratulations! You've completed the game!";
            disableGame();
        }
    }
}

function disableGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("reset").style.display = "block"; 
    document.getElementById("change-level").style.display = "block"; 
}

document.getElementById("reset").addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    document.getElementById("result").textContent = "";
    document.getElementById("user-input").value = "";
    document.getElementById("progress-bar").style.width = "0%"; // Reset progress bar
    currentLevel = 0;
    score = 0;
    displayLevel();
}

document.getElementById("change-level").addEventListener("click", () => {
    document.getElementById("difficulty-selection").style.display = "block";
    document.getElementById("reset").style.display = "none";
    document.getElementById("change-level").style.display = "none";
});

createDifficultySelection();
