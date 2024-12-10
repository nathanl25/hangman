import {
  newGame,
  wordBank,
  prevWords,
  resetGame,
  gameMove,
  updateHistory,
} from './modules/backend.js';
import {
  createEl,
  updateEl,
  resetButton,
  resetPicture,
} from './modules/dom.js';

const game = newGame(wordBank);
const hangmanWord = document.getElementById('hangmanWord');
const prevWordContainer = document.getElementById('prevWordDisplay');
const prevDisplay = document.getElementById('previousWords');
const prevButton = document.getElementById('prevButton');
const newGameButton = document.getElementById('newGameButton');
createEl(hangmanWord, 'p', game.correctLetters.join(' '), 'hangmanWordDisplay');
createEl(
  hangmanWord,
  'p',
  `Lives Remaining: ${10 - game.wrongGuesses}`,
  'hangmanLivesDisplay'
);
const hangmanWordDisp = document.getElementById('hangmanWordDisplay');
const hangmanLivesDisp = document.getElementById('hangmanLivesDisplay');
const allButtons = document.querySelectorAll('.keyboard__button');
allButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const gameOver = gameMove(game, button);
    if (gameOver) {
      updateEl(hangmanWordDisp, game.word.join(' '));
      updateEl(hangmanLivesDisp, gameOver);
      updateHistory(wordBank, prevWords);
      updateEl(prevDisplay, prevWords.join(', '));
      newGameButton.classList.remove('invisible');
      allButtons.forEach((button) => {
        button.disabled = true;
      });
    } else {
      updateEl(hangmanWordDisp, game.correctLetters.join(' '));
      updateEl(hangmanLivesDisp, `Lives Remaining: ${10 - game.wrongGuesses}`);
    }
  });
});

prevButton.addEventListener('click', () => {
  prevWordContainer.classList.add('visible');
});
prevWordContainer.addEventListener('click', () => {
  prevWordContainer.classList.remove('visible');
});

newGameButton.addEventListener('click', () => {
  allButtons.forEach((button) => {
    resetButton(button);
  });
  resetGame(wordBank, game);
  updateEl(hangmanWordDisp, game.correctLetters.join(' '));
  updateEl(hangmanLivesDisp, `Lives Remaining: ${10 - game.wrongGuesses}`);
  resetPicture();
  newGameButton.classList.add('invisible');
});
