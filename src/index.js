import Display from './Display';
import roundFactory from './roundFactory';
import roundData from './roundData';

const DOM = Display();


function runGame(data, roundCount, time) {
  const round = roundFactory(data[roundCount], time);
  DOM.resetGameUI();
  // setInterval(DOM.setTime(round.getTime()), 1000);
  

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
    if (round.checkEquation(e) && roundCount <= roundData.length) {
      console.log('WINNER!', round.getTime());
      roundCount++;
      runGame(data, roundCount, round.getTime());
    } else {
      console.log('Womp womp :(');
    }
  });
}


runGame(roundData, 0, 60000);




