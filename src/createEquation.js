function multiply(num1, num2) {
    return num1 * num2;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            if (num2 == 0) {
                return null;
            }
            return divide(num1, num2);
            break;
        default:
            return
    }
}

export default function createEquation(number1a, op1, number1b, number2a, op2, number2b) {
    const num1A = document.querySelector('#num1A');
    const num1B = document.querySelector('#num1B');
    const num2A = document.querySelector('#num2A');
    const num2B = document.querySelector('#num2B');
    const operation1 = document.querySelector('#operation1');
    const operation2 = document.querySelector('#operation2');
    num1A.innerHTML = number1a;
    num1B.innerHTML = number1b;
    num2A.innerHTML = number2a;
    num2B.innerHTML = number2b;
    operation1.innerHTML = op1;
    operation2.innerHTML = op2;

    const leftSide = operate(op1, number1a, number1b);
    const rightSide = operate(op2, number2a, number2b);

    if (leftSide === rightSide) { console.log('you win!') }
    else { console.log('try again') };
}