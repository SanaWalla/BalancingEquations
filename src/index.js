import Display from './Display';
import roundFactory from './roundFactory';
import roundData from './roundData';

const DOM = Display();


function runGame(data, roundCount) {
  const round = roundFactory(data[roundCount]);
  DOM.resetGameUI();

  DOM.setScore(roundCount * 100);
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
    console.log(roundCount);
    
    if (round.checkEquation(e) && roundCount <= roundData.length) {
      console.log('WINNER!');
      roundCount++;
      runGame(data, roundCount);
    } else {
      console.log('Womp womp :(');
    }
  });
}


runGame(roundData, 0);




