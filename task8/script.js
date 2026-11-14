// Correct answers for the General Knowledge questions
const correctAnswers = {
  q1: "B", // Random Access Memory
  q2: "C", // Mars
  q3: "A", // Pacific Ocean
  q4: "B", // Charles Babbage
  q5: "C"  // 7
};

// Get DOM elements
const quizForm = document.getElementById("quiz-form");
const errorMessage = document.getElementById("error-message");
const resultContainer = document.getElementById("result-container");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

// Listen for form submit
quizForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page refresh

  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;
  let allAnswered = true;

  // Check each question's selected radio button
  for (let key in correctAnswers) {
    const selectedOption = document.querySelector(`input[name="${key}"]:checked`);

    if (!selectedOption) {
      allAnswered = false;
      break;
    }

    if (selectedOption.value === correctAnswers[key]) {
      score++;
    }
  }

  // If any question is unanswered, show warning message
  if (!allAnswered) {
    errorMessage.textContent = "Please select an answer for all questions before submitting!";
    errorMessage.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    return;
  }

  // Hide error message
  errorMessage.classList.add("hidden");

  // Message based on high or low score
  let message = "";
  if (score >= 4) {
    message = "Excellent! Your general knowledge is impressive.";
  } else if (score >= 2) {
    message = "Good job! Keep learning and try again.";
  } else {
    message = "Nice try! Brush up on your GK and give it another go.";
  }

  // Display score and feedback
  resultContainer.innerHTML = `
    <h2>Your Score: ${score}/${totalQuestions}</h2>
    <p>${message}</p>
  `;
  resultContainer.classList.remove("hidden");

  // Show Restart button and hide Submit button
  submitBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
});

// Reset the quiz when Restart is clicked
restartBtn.addEventListener("click", function () {
  quizForm.reset();
  resultContainer.classList.add("hidden");
  errorMessage.classList.add("hidden");

  restartBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");
});