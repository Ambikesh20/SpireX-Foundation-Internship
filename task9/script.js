// Elements ko select karna
const body = document.body;
const colorText = document.querySelector('#color-display span');

const redBtn = document.getElementById('red-btn');
const greenBtn = document.getElementById('green-btn');
const blueBtn = document.getElementById('blue-btn');
const yellowBtn = document.getElementById('yellow-btn');
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');

// Original default color
const defaultColor = '#f4f4f9';

// Background color aur text update karne ka function
function changeBackgroundColor(color, colorName) {
    body.style.backgroundColor = color;
    colorText.textContent = colorName;
}

// Random Hex Color generate karne ka function
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Button Click Events
redBtn.addEventListener('click', () => changeBackgroundColor('#e74c3c', 'Red'));
greenBtn.addEventListener('click', () => changeBackgroundColor('#2ecc71', 'Green'));
blueBtn.addEventListener('click', () => changeBackgroundColor('#3498db', 'Blue'));
yellowBtn.addEventListener('click', () => changeBackgroundColor('#f1c40f', 'Yellow'));

randomBtn.addEventListener('click', () => {
    const randomHex = getRandomColor();
    changeBackgroundColor(randomHex, randomHex);
});

resetBtn.addEventListener('click', () => changeBackgroundColor(defaultColor, 'Default'));