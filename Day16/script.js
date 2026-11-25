let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
  currentOperandElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

function appendNumber(number) {
  if (currentOperand === 'Cannot divide by 0' || shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  
  // Prevent multiple decimals
  if (number === '.' && currentOperand.includes('.')) return;
  
  // Handle leading zero
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else if (currentOperand === '' && number === '.') {
    currentOperand = '0.';
  } else {
    currentOperand += number;
  }
  
  updateDisplay();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === 'Cannot divide by 0') {
    clearDisplay();
    return;
  }
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  shouldResetScreen = true;
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) {
        currentOperand = 'Cannot divide by 0';
        previousOperand = '';
        operation = undefined;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  // Round to prevent floating point precision bugs (e.g., 0.1 + 0.2)
  currentOperand = Math.round(computation * 100000000) / 100000000;
  currentOperand = currentOperand.toString();
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
  updateDisplay();
}

function deleteLast() {
  if (currentOperand === 'Cannot divide by 0' || shouldResetScreen) {
    clearDisplay();
    return;
  }
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

// Optional: Keyboard support for easier testing
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
  if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault();
    compute();
  }
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearDisplay();
  if (e.key === '+' || e.key === '-') chooseOperation(e.key);
  if (e.key === '*') chooseOperation('×');
  if (e.key === '/') {
    e.preventDefault();
    chooseOperation('÷');
  }
});