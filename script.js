import { newGame, wordBank, prevWords } from './modules/backend.js';
import { gameMove, updateHistory } from './modules/backend.js';
import { createEl, updateEl } from './modules/dom.js';

const game = newGame(wordBank);
// console.log(game);
// const hangmanPic = document.getElementById('hangmanPicture');
const hangmanWord = document.getElementById('hangmanWord');
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
let allButtons = document.querySelectorAll('.keyboard__button');
// console.log(wordBank);
allButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // const letter = button.innerText.toLowerCase();
    const gameStatus = gameMove(game, button);
    updateEl(hangmanWordDisp, game.correctLetters.join(' '));
    updateEl(hangmanLivesDisp, `Lives Remaining: ${10 - game.wrongGuesses}`);
    // if (gameStatus) {do something}
  });
});
