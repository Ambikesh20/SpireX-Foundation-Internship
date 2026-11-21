
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;

    // Check empty fields
    if (!name || !email || !age || !course || !password) {
        showMessage("Please fill all the fields!", "error");
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address!", "error");
        return;
    }

    // Validate age
    if (Number(age) < 1 || Number(age) > 120) {
        showMessage("Please enter a valid age!", "error");
        return;
    }

    // Validate password length
    if (password.length < 8) {
        showMessage("Password must be at least 8 characters!", "error");
        return;
    }

    // Registration successful
    showMessage(
        "Registration Successful! Welcome, " + name + " 🎉",
        "success"
    );

    form.reset();
});

// Display message
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}
