import { elFactory } from "./helperFunctions";

const Display = () => {
  const equationWrapper = document.querySelector('.equation-wrapper');
  const tilesHtml = document.querySelector('#tiles');
  const btnsWrapper = document.querySelector('.buttons-wrapper');
  const scoreHtml = document.querySelector('#score');
  const timeHtml = document.querySelector('#time');

  const renderTiles = ((tiles, event, action) => {

    const createTile = (content, index, event, action) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = content;
      tile.dataset.index = index;
      tilesHtml.appendChild(tile);
      tile.addEventListener(event, (e) => {action(e)});
    }

    for (let i = 0; i < tiles.length; i++) {
      createTile(tiles[i], i, event, action);
    }
  });

  const renderEquation = (equation) => {
    
    const createValue = (content) => {
      const eqValue = document.createElement('div');
      eqValue.classList.add('equation-value');

      if ( typeof content == 'string') {
        if (!content.search(/[\+\-*\/]/)) eqValue.classList.add('operator');
        if (content == '=') eqValue.classList.add('equals');
      }

      eqValue.textContent = content;
      equationWrapper.appendChild(eqValue);
    }
    
    for (let i = 0; i < equation.length; i++) {
      createValue(equation[i], i);
    }

  };

  const updateEquation = (equation) => {
    equationWrapper.innerHTML = '';

    renderEquation(equation);
  };
 
  const renderSubmitBtn = (action) => {
    if (btnsWrapper.querySelector('#submit'))
      btnsWrapper.removeChild(btnsWrapper.querySelector('#submit'));

    const submitBtn = elFactory('div', {id: 'submit', class: 'btn submit'}, 'Submit');
    submitBtn.addEventListener('click', action);
    
    btnsWrapper.appendChild(submitBtn);
  }

  const renderUndoBtn = (action) => {
    if (btnsWrapper.querySelector('#undo')) 
      btnsWrapper.removeChild(btnsWrapper.querySelector('#undo'));
    
    const undoBtn = elFactory('div', {id: 'undo', class: 'btn undo'}, 'Undo');
    undoBtn.addEventListener('click', action);

    btnsWrapper.appendChild(undoBtn);
  }

  const resetGameUI = () => {
    equationWrapper.innerHTML = '';
    tilesHtml.innerHTML = '';
  };

  const setScore = (newScore) => {
    scoreHtml.innerHTML = newScore;
  };
  
  const setTime = (newTime) => {
    const min = Math.floor(newTime / 60000);
    const sec = (newTime % 60000) / 1000;
    timeHtml.textContent = `Time: ${min}:${String(sec).padStart(2, '0')}`;
  };
  

  return {
    renderTiles,
    renderEquation,
    updateEquation,
    renderSubmitBtn,
    renderUndoBtn,
    resetGameUI,
    setScore,
    setTime,
  }
};

export default Display;