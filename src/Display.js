import { elFactory } from "./helperFunctions";

const Display = () => {
  const app = document.querySelector('#app');
  const gameLeft = document.querySelector('.game-left');
  const equationWrapper = document.querySelector('.equation-wrapper');
  const tilesWrapper = document.querySelector('#tiles');
  const btnsWrapper = document.querySelector('.buttons-wrapper');
  const scoreHtml = document.querySelector('#score');
  const timeHtml = document.querySelector('#time');

  const renderGameUI = () => {
    app.appendChild(gameUI());
  }

  const renderTiles = ((tiles, event, action) => {

    const createTile = (content, index, event, action) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = content;
      tile.dataset.index = index;
      tilesWrapper.appendChild(tile);
      tile.addEventListener(event, (e) => {action(e)});
    }

    for (let i = 0; i < tiles.length; i++) {
      createTile(tiles[i], i, event, action);
    }
  });

  const deactivateTiles = () => {
    const tiles = tilesHtml.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      tile.replaceWith(tile.cloneNode(true));
    });
  };

  const renderEquation = (equation, inFocus) => {

    const createValue = (content, inFocus) => {
      const eqValue = elFactory('div', {class: 'equation-value'}, String(content));
      
      if ( typeof content == 'string') {
        if (!content.search(/[\+\-*\/]/)) eqValue.classList.add('operator');
        if (content == '=') eqValue.classList.add('equals');
        if (inFocus == true) eqValue.classList.add('in-focus');
      }
  
      equationWrapper.appendChild(eqValue);
    }

    for (let i = 0; i < equation.length; i++) {
      createValue(equation[i], i == inFocus);
    }
  };

  const updateEquation = (equation, inFocus) => {
    const outputs = equationWrapper.childNodes;
    
    equation.forEach((value, i) => {
      if (outputs[i].textContent != value) outputs[i].textContent = value;
      if (i == inFocus) {
        outputs[i].classList.add('in-focus');
      } else {
        outputs[i].classList.remove('in-focus');
      }       
    });
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
    btnsWrapper.innerHTML = '';
    tilesWrapper.innerHTML = '';
  };

  const setScore = (newScore) => {
    scoreHtml.innerHTML = newScore;
  };
  
  const setTime = (newTime) => {
    const min = Math.floor(newTime / 60000);
    const sec = (newTime % 60000) / 1000;
    timeHtml.textContent = `Time: ${min}:${String(sec).padStart(2, '0')}`;
  };

  const renderPopup = (message, buttonAction) => {
    const button = elFactory('div', {class: 'button'}, 'Play Again?');
    const popup = elFactory('div', {class: 'popup-wrapper'}, message, button);
    button.addEventListener('click', () => {
       buttonAction();
       gameLeft.removeChild(popup);
    });
    gameLeft.appendChild(popup);
  }
  

  return {
    renderGameUI,
    renderTiles,
    deactivateTiles,
    renderEquation,
    updateEquation,
    renderSubmitBtn,
    renderUndoBtn,
    resetGameUI,
    setScore,
    setTime,
    renderPopup,
  }
};

export default Display;