import { operate } from "./helperFunctions";

const roundFactory = (round, time) => {
  const {left, right, tiles} = round;
  const equation = [...left, '=', ...right];
  const missingValues = findMissingValues();
  let turnCount = 0;

  // Initialize time 
  setInterval(() => {
    time = time - 1000;
  }, 1000);

  const getTime = () => time;

  // Return an array with the index of each missing value
  function findMissingValues() {
    return equation.reduce((arr, value, i) => {
      if (value === '?') arr.push(i);
      return arr;
    }, []);
  }

  const getCurrentMissingValue = () => {
    return missingValues[turnCount];
  }

  const getUserInput = (e) => {
    const index = e.target.dataset.index;
    return tiles[index];
  }

  // Adds the selected value to the first empty value
  const updateEquation = (e) => {
    if (turnCount >= missingValues.length) return;
    
    const value = getUserInput(e);
    equation[missingValues[turnCount]] = value;
    turnCount++;
  }

  // Undoes the players inputs in reverse chronological order
  const undo = () => {
    if (turnCount <= 0) return;

    equation[missingValues[turnCount - 1]] = '?'
    turnCount--;
  }

  // Checks to see if the left and right sides of the equation are balanced
  const checkEquation = () => {
    const l = equation.slice(0, 3);
    const r = equation.slice(4, 7);

    return operate(...l) === operate(...r);
  }

  return {
    tiles,
    equation,
    getCurrentMissingValue,
    getTime,
    updateEquation,
    undo,
    checkEquation,
  }
}

export default roundFactory;