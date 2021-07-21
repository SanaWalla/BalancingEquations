import Display from './Display';
import roundFactory from './roundFactory';


const roundOneData = {
  left: [1, '+', '?'],
  right: [1, '+', '?'],
  tiles: [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
  ]
}

const DOM = Display();

// Initialize round
const roundOne = roundFactory(roundOneData);
DOM.renderEquation(roundOne.equation);
DOM.renderTiles(roundOne.tiles, 'click', (e) => {
  roundOne.updateEquation(e);
  DOM.updateEquation(roundOne.equation);
});

DOM.activateUndoBtn(() => {
  roundOne.undo();
  DOM.updateEquation(roundOne.equation);
});

DOM.activateSubmitBtn(roundOne.checkEquation);


