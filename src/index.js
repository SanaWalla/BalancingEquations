import checkEquation from "./checkEquation";

const rounds = [
  {
    equation: {
      left: [1, '+', '?'],
      right: [2],
    },
    tiles:[0,1,13,5,12,10,6,4,9,8,14,11,3,2,15,14],
  },
  {
    equation: {
      left: [2, '+', '?'],
      right: [5],
    },
    tiles:[2,5,15,12,1,8,11,4,3,10,14,6,9,0,13,14],
  },
  {
    equation: {
      left: [2, '?', '?'],
      right: [5, 'x', 2],
    },
    tiles:[12,11,'*',6,3,'+',10,'/',9,'-',14,0,4,1,5,13],
  },
];

// temporary. Just made this to receive user input for test
const TEMPgetUserInput = (left) => {
  
  let input;

  while (!input) {
    input = prompt(`Complete this equation ${left.join('')}`);
  }
  
  return input;
}
  
for (let round of rounds) {
  const {left, right} = round.equation;
  let equation = [...left, '=', ...right];
    
  // Display this round's equation 
  console.log('problem:', equation.join(''));

  // Get user inputs to balance equation
  equation = equation.map((x) => {
      if (x === 'x' || x == 'X') return '*';
      if (x != '?') return x;

      // temporary. Just made this to receive user input for test
      x = TEMPgetUserInput(equation);

      return x;
  });

  console.log('Your answer:', equation.join(''));

  // split equation into left & right side 
  const leftSide = equation.slice(0, left.length);
  const rightSide = equation.slice(left.length + 1);

  // check equation is balanced
  console.log(checkEquation(
    eval(leftSide.join('')), 
    eval(rightSide.join(''))
  ));
}