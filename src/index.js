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
    const time = round.getTime()
    DOM.setTime(time);
    if (time <= 0) {
      gameOver(gameTime);
      return;
    };
  }, 1000);
  
  DOM.setScore(roundCount * 100);
  DOM.renderEquation(round.equation, round.getCurrentMissingValue());
  DOM.renderTiles(round.tiles, 'click', (e) => {
    round.updateEquation(e);
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });

  DOM.renderSubmitBtn((e) => {
    if (round.checkEquation(e) && roundCount <= roundData.length) {
      roundCount++;
      clearInterval(gameTime);
      
      // load the next round with current remaining time + 4 seconds
      runGame(data, roundCount, (round.getTime() + 4000));
    } else {
      gameOver(gameTime);
      return;
    }
  });

  DOM.renderUndoBtn(() => {
    round.undo();
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });
}

function gameOver(timer) {
  console.log('Womp womp :(');
  DOM.deactivateTiles();
  clearInterval(timer);
}


runGame(roundData, 0, 60000);




