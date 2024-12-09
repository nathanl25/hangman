import { newGame, wordBank, prevWords, resetGame } from './modules/backend.js';
import { gameMove, updateHistory } from './modules/backend.js';
import {
  createEl,
  updateEl,
  resetButton,
  resetPicture,
} from './modules/dom.js';

const game = newGame(wordBank);
// console.log(game);
// const hangmanPic = document.getElementById('hangmanPicture');
const hangmanWord = document.getElementById('hangmanWord');
const prevDisplay = document.getElementById('prevWordDisplay');
const prevButton = document.getElementById('prevButton');
const newGameButton = document.getElementById('newGameButton');
// const altHangmanWord = document.querySelector('#hangmanWord');
// console.log(hangmanWord);
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
// console.log(wordBank);
allButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // const letter = button.innerText.toLowerCase();
    const gameOver = gameMove(game, button);
    // if (gameStatus) {do something}
    if (gameOver) {
      // console.log(game.word);
      updateEl(hangmanWordDisp, game.word.join(' '));
      updateEl(hangmanLivesDisp, gameOver);
      updateHistory(wordBank, prevWords);
      updateEl(prevDisplay, prevWords);
      newGameButton.classList.remove('invisible');
      allButtons.forEach((button) => {
        button.disabled = true;
      });
      // console.log(prevWords);
      //display word
      //disable all buttons
      //add to word history
      //prompt rematch
    } else {
      updateEl(hangmanWordDisp, game.correctLetters.join(' '));
      updateEl(hangmanLivesDisp, `Lives Remaining: ${10 - game.wrongGuesses}`);
    }
  });
});

prevButton.addEventListener('click', () => {
  prevDisplay.classList.add('visible');
});
prevDisplay.addEventListener('click', () => {
  prevDisplay.classList.remove('visible');
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
