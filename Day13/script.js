const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePasswordBtn = document.getElementById("togglePassword");
const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthMessage = document.getElementById("strengthMessage");
const matchMessage = document.getElementById("matchMessage");
const resetBtn = document.getElementById("resetBtn");

const rules = {
  length: document.getElementById("rule-length"),
  upper: document.getElementById("rule-upper"),
  lower: document.getElementById("rule-lower"),
  number: document.getElementById("rule-number"),
  special: document.getElementById("rule-special"),
};

// Helper to update each checklist item
function updateRuleUI(element, isValid) {
  const icon = element.querySelector(".icon");
  if (isValid) {
    element.classList.add("valid");
    icon.textContent = "✓";
  } else {
    element.classList.remove("valid");
    icon.textContent = "○";
  }
}

// Check password strength in real time
function checkPasswordStrength() {
  const password = passwordInput.value;

  // Reset bar and message classes
  strengthBar.className = "strength-bar";
  strengthMessage.className = "strength-message";

  if (password.length === 0) {
    strengthMessage.textContent = "Please enter a password.";
    Object.values(rules).forEach((el) => updateRuleUI(el, false));
    checkPasswordMatch();
    return;
  }

  // Evaluate the 5 password criteria
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  for (const key in checks) {
    updateRuleUI(rules[key], checks[key]);
    if (checks[key]) score++;
  }

  // Apply strength logic: 0–2 Weak, 3–4 Medium, 5 Strong
  if (score <= 2) {
    strengthBar.classList.add("weak");
    strengthMessage.classList.add("weak");
    strengthMessage.textContent = "Strength: Weak";
  } else if (score <= 4) {
    strengthBar.classList.add("medium");
    strengthMessage.classList.add("medium");
    strengthMessage.textContent = "Strength: Medium";
  } else {
    strengthBar.classList.add("strong");
    strengthMessage.classList.add("strong");
    strengthMessage.textContent = "Strength: Strong";
  }

  checkPasswordMatch();
}

// Check if Password and Confirm Password match
function checkPasswordMatch() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  matchMessage.className = "match-message";

  if (confirmPassword.length === 0) {
    matchMessage.textContent = "";
    return;
  }

  if (password === confirmPassword) {
    matchMessage.textContent = "Passwords Match";
    matchMessage.classList.add("match");
  } else {
    matchMessage.textContent = "Passwords Do Not Match";
    matchMessage.classList.add("no-match");
  }
}

// Show / Hide Password toggle helper
function toggleVisibility(inputField, button) {
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  button.textContent = isPassword ? "Hide" : "Show";
}

// Reset all fields and UI states
function resetForm() {
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  passwordInput.type = "password";
  confirmPasswordInput.type = "password";
  togglePasswordBtn.textContent = "Show";
  toggleConfirmPasswordBtn.textContent = "Show";

  strengthBar.className = "strength-bar";
  strengthMessage.className = "strength-message";
  strengthMessage.textContent = "Please enter a password.";

  matchMessage.className = "match-message";
  matchMessage.textContent = "";

  Object.values(rules).forEach((el) => updateRuleUI(el, false));
}

// Event Listeners
passwordInput.addEventListener("input", checkPasswordStrength);
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

togglePasswordBtn.addEventListener("click", () =>
  toggleVisibility(passwordInput, togglePasswordBtn)
);

toggleConfirmPasswordBtn.addEventListener("click", () =>
  toggleVisibility(confirmPasswordInput, toggleConfirmPasswordBtn)
);

resetBtn.addEventListener("click", resetForm);