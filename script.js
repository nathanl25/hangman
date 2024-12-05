import { newGame, wordBank, prevWords } from './modules/backend.js';
import { gameMove, updateHistory } from './modules/backend.js';

const game = newGame(wordBank);
// console.log(game);

let allButtons = document.querySelectorAll('.keyboard__button');
// console.log(wordBank);
allButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const letter = button.innerText.toLowerCase();
    gameMove(game, letter);
    console.log(letter);
  });
});
