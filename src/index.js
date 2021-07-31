import Display from './Display';
import roundFactory from './roundFactory';
import roundData from './roundData';

const DOM = Display();

function runGame(data, roundCount, time) {
  const score = roundCount * 100;
  const round = roundFactory(data[roundCount], time);
  
  // Clear any existing elements from prior rounds
  DOM.resetGameUI();

  // Set game time
  let gameTime = setInterval(() => {
    const time = round.getTime()
    DOM.setTime(time);
    if (time <= 0) {
      gameOver('Game Over. Score', gameTime, score);
      return;
    };
  }, 1000);
  
  DOM.setScore(score);
  DOM.renderEquation(round.equation, round.getCurrentMissingValue());
  DOM.renderTiles(round.tiles, 'click', (e) => {
    round.updateEquation(e);
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });

  DOM.renderSubmitBtn((e) => {
    if (round.checkEquation(e) && roundCount < roundData.length - 1) {
      // Loads next round
      
      roundCount++;
      clearInterval(gameTime);
      
      // load the next round with current remaining time + 4 seconds
      runGame(data, roundCount, (round.getTime() + 4000));
    } else if(round.checkEquation(e) && roundCount == roundData.length - 1) {
      // Runs success sequence

      gameOver('You Win! Score', gameTime, score);
      return;
    } else {
      // Runs fail sequence

      gameOver('Game Over. Score', gameTime, score);
      return;
    }
  });

  DOM.renderUndoBtn(() => {
    round.undo();
    DOM.updateEquation(round.equation, round.getCurrentMissingValue());
  });
}

function gameOver(message, timer, score) {
  DOM.resetGameUI();
  DOM.renderPopup(`${message}: ${score}`, () => {runGame(roundData, 0, 60000)});
  clearInterval(timer);
};

runGame(roundData, 0, 60000);




