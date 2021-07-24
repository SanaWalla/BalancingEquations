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

const operate = (num1, operator, num2) => {
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
};

const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type);

    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }

    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });

    return el;
};

export {
    operate,
    elFactory,
};