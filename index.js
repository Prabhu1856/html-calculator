document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector('.esp');

    let currentOperand = '';
    let firstOperand = null;
    let operator = null;

    function updateDisplay() {
        display.textContent = currentOperand;
    }

    function clear() {
        currentOperand = '';
        firstOperand = null;
        operator = null;
        updateDisplay();
    }

    function appendNumber(number) {
        currentOperand += number;
        updateDisplay();
    }

    function setOperator(op) {
        if (currentOperand === '') return;
        if (firstOperand !== null) {
            compute();
        }
        firstOperand = currentOperand;
        operator = op;
        currentOperand = '';
    }

    function compute() {
        let result;
        const prev = parseFloat(firstOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result.toString();
        operator = null;
        firstOperand = null;
        updateDisplay();
    }

    document.querySelectorAll('.con > button, .ii > button, .jj > button, .hh > button').forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (buttonValue === 'c') {
                clear();
            } else if (buttonValue === '=') {
                compute();
            } else {
                appendNumber(buttonValue);
            }
        });
    });

    document.querySelectorAll('.con > button, .ii > button, .jj > button, .hh > button').forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (['+', '-', 'x', '/'].includes(buttonValue)) {
                setOperator(buttonValue);
            }
        });
    });
});

// Increased font size for better readability
document.body.style.fontSize = "70px";