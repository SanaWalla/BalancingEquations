import { elFactory } from "./helperFunctions";

const Display = () => {
  const equationWrapper = document.querySelector('.equation-wrapper');
  const tilesHtml = document.querySelector('#tiles');
  const btnsWrapper = document.querySelector('.buttons-wrapper');
  const scoreHtml = document.querySelector('#score');
  const timeHtml = document.querySelector('#time');
  const avatarWrapper = document.querySelector('.avatar-wrapper');

  const renderTiles = ((tiles, event, action) => {

    const createTile = (content, index, style, event, action) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = content;
      tile.dataset.index = index;
      tile.style.backgroundImage = `url('../../dist/img/tiles/Tile${style}.svg')`;
      tilesHtml.appendChild(tile);
      tile.addEventListener(event, (e) => {action(e)});
    }

    for (let i = 0; i < tiles.length; i++) {
      createTile(tiles[i], i, Math.floor((Math.random() * 5) +1), event, action);
    }
  });

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

  const renderAvatar = (roundCount) => {
    if (avatarWrapper.querySelector('.avatar') != undefined) {
      avatarWrapper.removeChild(avatarWrapper.querySelector('.avatar'));
    }
    
    roundCount === 0 ? roundCount = 1 : roundCount;
    const avatar = elFactory('img', {
      class: 'avatar', 
      src: `../dist/img/avatar/avatar${1}.png`
    });

    if (roundCount < 3) 
      avatar.src = `../dist/img/avatars/avatar${1}.png`;
    if (roundCount < 6 && roundCount >= 3) 
      avatar.src = `../dist/img/avatars/avatar${2}.png`;
    if (roundCount < 9 && roundCount >= 6) 
      avatar.src = `../dist/img/avatars/avatar${3}.png`;
    if (roundCount >= 9)
      avatar.src = `../dist/img/avatars/avatar${4}.png`;
    
    avatarWrapper.appendChild(avatar);
  }

  const addPizza = (roundCount) => {
    const rndInt = Math.floor(Math.random() * 6) + 1
    const pizza = elFactory('img', {class: 'pizza', src: `../dist/img/pizza/pizza${rndInt}.png`});
    
    
    if (roundCount === 1) {
      pizza.style.bottom = '136px';
    } else {
      pizza.style.bottom = `${136 + ((roundCount - 1) * 14)}px`;
    }
    avatarWrapper.appendChild(pizza);
  };

  const dropPizza = (roundCount) => {
    const pizzas = avatarWrapper.querySelectorAll('.pizza');
    pizzas.forEach((pizza, i) => {
      const rndInt = Math.floor(Math.random() * 13);
      setInterval(() => {
        pizza.style.transform = `rotate(${rndInt}deg) translateY(${136 + (i * 14)}px)`
      }, 900 - (i * 60)); // use roundCount to calc time to subtract from
    });
  };
  

  return {
    renderTiles,
    renderEquation,
    updateEquation,
    renderAvatar,
    addPizza,
    dropPizza,
    renderSubmitBtn,
    renderUndoBtn,
    resetGameUI,
    setScore,
    setTime,
  }
};

export default Display;