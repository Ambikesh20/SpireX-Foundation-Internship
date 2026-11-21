// Game State Variables
let secretNumber = Math.floor(Math.random() * 20) + 1;
let attempts = 5;
let score = 0;

// DOM Elements
const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const messageEl = document.getElementById('message');
const attemptsLeftEl = document.getElementById('attemptsLeft');
const scoreEl = document.getElementById('score');
const gameBox = document.getElementById('gameBox');

// Function to update message text and style
function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = 'message'; // reset classes
    if (type) {
        messageEl.classList.add(type);
    }
}

// Function to handle guess checking
function checkGuess() {
    const userGuess = Number(guessInput.value);

    // Validate input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        showMessage('Please enter a valid number between 1 and 20!', 'msg-error');
        return;
    }

    // Check guess against secret number
    if (userGuess === secretNumber) {
        score += attempts * 10; // Bonus score based on remaining attempts
        scoreEl.textContent = score;
        showMessage(`🎉 Correct! You Won! The number was ${secretNumber}.`, 'msg-success');
        gameBox.classList.add('win-celebration');
        endGame();
    } else {
        attempts--;
        attemptsLeftEl.textContent = attempts;

        if (attempts === 0) {
            showMessage(`Game Over! The secret number was ${secretNumber}.`, 'msg-error');
            endGame();
        } else if (userGuess > secretNumber) {
            showMessage('Too High! Try a smaller number.', 'msg-hint');
        } else {
            showMessage('Too Low! Try a bigger number.', 'msg-hint');
        }
    }

    guessInput.value = '';
    guessInput.focus();
}

// Disable input and show Play Again button
function endGame() {
    guessInput.disabled = true;
    checkBtn.disabled = true;
    playAgainBtn.classList.remove('hidden');
}

// Reset game for a new round
function resetGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    attempts = 5;
    attemptsLeftEl.textContent = attempts;
    
    guessInput.disabled = false;
    checkBtn.disabled = false;
    guessInput.value = '';
    
    playAgainBtn.classList.add('hidden');
    gameBox.classList.remove('win-celebration');
    showMessage('Start guessing...', '');
    guessInput.focus();
}

// Event Listeners
checkBtn.addEventListener('click', checkGuess);
playAgainBtn.addEventListener('click', resetGame);

// Allow pressing "Enter" key to submit guess
guessInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !checkBtn.disabled) {
        checkGuess();
    }
});