const Display = () => {
  const gameUI = document.querySelector('.game-left');
  const equationWrapper = document.querySelector('.equation-wrapper');
  const tilesHtml = document.querySelector('#tiles');
  const undoBtn = document.querySelector('#undo');
  const submitBtn = document.querySelector('#submit');
  
  const valuesHtml = document.querySelectorAll('.value');

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

  const activateSubmitBtn = (action) => {
    submitBtn.addEventListener('click', action);
  };

  const activateUndoBtn = (action) => {
    undoBtn.addEventListener('click', action);
  };

  const resetGameUI = () => {
    equationWrapper.innerHTML = '';
    tilesHtml.innerHTML = '';
  }
  

  return {
    renderTiles,
    renderEquation,
    updateEquation,
    activateSubmitBtn,
    activateUndoBtn,
    resetGameUI,
  }
};

export default Display;