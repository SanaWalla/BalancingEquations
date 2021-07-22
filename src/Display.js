const Display = () => {
  const equationWrapper = document.querySelector('.equation-wrapper');
  const tilesHtml = document.querySelector('#tiles');
  const undoBtn = document.querySelector('#undo');
  const submitBtn = document.querySelector('#submit');
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

  const activateSubmitBtn = (action) => {
    submitBtn.addEventListener('click', action);
  };

  const activateUndoBtn = (action) => {
    undoBtn.addEventListener('click', action);
  };

  const resetGameUI = () => {
    equationWrapper.innerHTML = '';
    tilesHtml.innerHTML = '';
  };

  const setScore = (newScore) => {
    scoreHtml.innerHTML = newScore;
  };
  
  const setTime = (newTime) => {
    const min = Math.floor(newTime / 60000);
    // Seconds is not right
    const sec = String(newTime % 60000).padStart(2, '0');
    timeHtml.innerHTML = `${min}:${sec}`;
  };
  

  return {
    renderTiles,
    renderEquation,
    updateEquation,
    activateSubmitBtn,
    activateUndoBtn,
    resetGameUI,
    setScore,
    setTime,
  }
};

export default Display;