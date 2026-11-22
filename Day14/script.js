// Game configuration
const CHOICES = {
  rock: { label: "Rock", emoji: "🪨", beats: "scissors", action: "crushes" },
  paper: { label: "Paper", emoji: "📄", beats: "rock", action: "covers" },
  scissors: { label: "Scissors", emoji: "✂️", beats: "paper", action: "cuts" }
};

const CHOICE_KEYS = Object.keys(CHOICES);

// Game state
let userScore = 0;
let computerScore = 0;
let roundCount = 0;

// DOM elements
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const roundCountEl = document.getElementById("round-count");

const userChoiceBox = document.getElementById("user-choice-box");
const computerChoiceBox = document.getElementById("computer-choice-box");
const userChoiceText = document.getElementById("user-choice-text");
const computerChoiceText = document.getElementById("computer-choice-text");

const resultBadge = document.getElementById("result-badge");
const roundMessage = document.getElementById("round-message");

const choiceButtons = document.querySelectorAll(".choice-btn");
const restartBtn = document.getElementById("restart-btn");

// Generate a random move for the computer
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICE_KEYS.length);
  return CHOICE_KEYS[randomIndex];
}

// Decide the round outcome
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "draw";
  }
  return CHOICES[userChoice].beats === computerChoice ? "win" : "lose";
}

// Trigger pop animation on the choice circles
function animateCircle(element) {
  element.classList.remove("pop");
  void element.offsetWidth; // Force reflow so animation replays
  element.classList.add("pop");
}

// Update the UI after each round
function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  const outcome = determineWinner(userChoice, computerChoice);

  const userMove = CHOICES[userChoice];
  const computerMove = CHOICES[computerChoice];

  roundCount++;

  // Update displayed choices
  userChoiceBox.textContent = userMove.emoji;
  userChoiceText.textContent = userMove.label;
  computerChoiceBox.textContent = computerMove.emoji;
  computerChoiceText.textContent = computerMove.label;

  // Reset highlight rings
  userChoiceBox.classList.remove("winner", "loser", "draw");
  computerChoiceBox.classList.remove("winner", "loser", "draw");

  // Update scores, highlights, and round message
  if (outcome === "win") {
    userScore++;
    userChoiceBox.classList.add("winner");
    computerChoiceBox.classList.add("loser");
    resultBadge.textContent = "You Win!";
    resultBadge.className = "result-badge win";
    roundMessage.textContent = `${userMove.label} ${userMove.action} ${computerMove.label}! Great move!`;
  } else if (outcome === "lose") {
    computerScore++;
    userChoiceBox.classList.add("loser");
    computerChoiceBox.classList.add("winner");
    resultBadge.textContent = "You Lose";
    resultBadge.className = "result-badge lose";
    roundMessage.textContent = `${computerMove.label} ${computerMove.action} ${userMove.label}. Try again!`;
  } else {
    userChoiceBox.classList.add("draw");
    computerChoiceBox.classList.add("draw");
    resultBadge.textContent = "It's a Draw";
    resultBadge.className = "result-badge draw";
    roundMessage.textContent = `You both picked ${userMove.label}. Play another round!`;
  }

  animateCircle(userChoiceBox);
  animateCircle(computerChoiceBox);

  // Update scoreboard
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  roundCountEl.textContent = roundCount;
}

// Reset everything back to initial state
function restartGame() {
  userScore = 0;
  computerScore = 0;
  roundCount = 0;

  userScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  roundCountEl.textContent = "0";

  userChoiceBox.textContent = "❓";
  computerChoiceBox.textContent = "❓";
  userChoiceText.textContent = "Waiting...";
  computerChoiceText.textContent = "Waiting...";

  userChoiceBox.classList.remove("winner", "loser", "draw", "pop");
  computerChoiceBox.classList.remove("winner", "loser", "draw", "pop");

  resultBadge.textContent = "Make Your Move";
  resultBadge.className = "result-badge neutral";
  roundMessage.textContent = "Pick Rock, Paper, or Scissors below to start the game!";
}

// Attach event listeners
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedChoice = button.dataset.choice;
    playRound(selectedChoice);
  });
});

restartBtn.addEventListener("click", restartGame);