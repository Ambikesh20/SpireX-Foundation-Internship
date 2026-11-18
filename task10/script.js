let count = 0;
const counterDisplay = document.getElementById('counter');

function updateDisplay() {
    counterDisplay.textContent = count;
    
    if (count > 0) {
        counterDisplay.style.color = "green";
    } else if (count < 0) {
        counterDisplay.style.color = "red";
    } else {
        counterDisplay.style.color = "#333";
    }
}

document.getElementById('increase').addEventListener('click', function() {
    count++; 
    updateDisplay();
});

document.getElementById('decrease').addEventListener('click', function() {
    if (count > 0) {
        count--; 
    }
    updateDisplay();
});

document.getElementById('reset').addEventListener('click', function() {
    count = 0; 
    updateDisplay();
});

document.getElementById('increase5').addEventListener('click', function() {
    count += 5; 
    updateDisplay();
});