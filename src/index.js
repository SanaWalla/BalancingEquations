import Display from './Display';
import roundFactory from './roundFactory';
import roundData from './roundData';

const DOM = Display();

function runGame(data, roundCount, time) {
  const round = roundFactory(data[roundCount], time);
  
  // Clear any existing elements from prior rounds
  DOM.resetGameUI();

  // Set game time
  let gameTime = setInterval(() => {
    const time = round.getTime();
    DOM.setTime(time);
    
  }, 1000);
  
  DOM.setScore(roundCount * 100);
  DOM.renderAvatar(roundCount);
  DOM.renderEquation(round.equation, round.getCurrentMissingValue());
  DOM.renderTiles(round.tiles, 'click', (e) => {
    round.updateEquation(e);
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });

  DOM.renderSubmitBtn((e) => {
    if (round.checkEquation(e) && roundCount <= roundData.length) {
      roundCount++;
      DOM.addPizza(roundCount);
      clearInterval(gameTime);
      
      // load the next round with current remaining time + 4 seconds
      runGame(data, roundCount, (round.getTime() + 4000));
    } else {
      console.log('Womp womp :(');
      DOM.dropPizza();
    }
  });

  DOM.renderUndoBtn(() => {
    round.undo();
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });
}


runGame(roundData, 0, 60000);




