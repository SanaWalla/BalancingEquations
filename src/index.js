import Display from './Display';
import roundFactory from './roundFactory';
import roundData from './roundData';

const DOM = Display();


function runGame(data, roundCount) {
  const round = roundFactory(data[roundCount]);
  
  DOM.resetGameUI();
  DOM.renderEquation(round.equation);
  DOM.renderTiles(round.tiles, 'click', (e) => {
    round.updateEquation(e);
    DOM.updateEquation(round.equation);
  });

  DOM.activateUndoBtn(() => {
    round.undo();
    DOM.updateEquation(round.equation);
  });

  DOM.activateSubmitBtn((e) => {
    if (round.checkEquation(e)) {
      console.log('WINNER!');
      roundCount++;
      runGame(data, roundCount);
    } else {
      console.log('Womp womp :(');
    }
  });
}


runGame(roundData, 0);




