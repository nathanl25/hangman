import { data } from '../assets/example-words.js';
import { updatePicture, updateButton } from './dom.js';
export const wordBank = {};
wordBank.words = data;
wordBank.size = wordBank.words.length;
wordBank.currWordIndex = -1;
export const prevWords = [];

export const newGame = (wordBank) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWordIndex = randIndex;
  const game = new Object();
  game.word = wordBank.words[randIndex].split('');
  game.wordLength = game.word.length;
  game.wrongGuesses = 0;
  game.correctLetters = new Array(game.wordLength);
  game.correctLetters.fill('_');
  game.usedLetters = [];
  return game;
};

export const resetGame = (wordBank, game) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWordIndex = randIndex;
  game.word = wordBank.words[randIndex].split('');
  game.wordLength = game.word.length;
  game.wrongGuesses = 0;
  game.correctLetters = new Array(game.wordLength);
  game.correctLetters.fill('_');
  game.usedLetters = [];
};

export const gameMove = (game, button) => {
  const letter = button.innerText.toLowerCase();
  if (validInput(game, letter)) {
    guessLetter(game, button);
  } else {
    return 0;
  }
  const gameSt = checkGameStatus(game);

  if (gameSt === 'lose') {
    return 'Better Luck Next Time.';
  } else if (gameSt === 'win') {
    return 'You Win!';
  } else {
    return 0;
  }
};

const validInput = (game, letter) => {
  switch (true) {
    case game.wrongGuesses > 9:
    case letter.toUpperCase() === letter.toLowerCase():
    case game.usedLetters.includes(letter):
    case !game.correctLetters.includes('_'):
      return false;
  }
  return true;
};

const updateCorrectLetters = (game, letter) => {
  for (let i = 0; i < game.wordLength; i++) {
    if (game.word[i] === letter) {
      game.correctLetters[i] = letter;
    }
  }
};

const updateUsedLetters = (game, letter) => {
  game.usedLetters.push(letter);
};

const guessLetter = (game, button) => {
  const letter = button.innerText.toLowerCase();
  if (game.word.includes(letter)) {
    updateCorrectLetters(game, letter);
    updateButton(button, 'correct');
  } else {
    updateButton(button, 'incorrect');
    updatePicture(game);
    game.wrongGuesses++;
  }
  updateUsedLetters(game, letter);
  return game;
};

const checkGameStatus = (game) => {
  if (game.wrongGuesses === 10) {
    return 'lose';
  } else if (!game.correctLetters.includes('_')) {
    return 'win';
  }
  return 'in progress';
};

export const updateHistory = (wordBank, prevWords) => {
  const oldWord = wordBank.words[wordBank.currWordIndex];
  const formattedWord = oldWord.charAt(0).toUpperCase() + oldWord.slice(1);
  prevWords.push(formattedWord);
  wordBank.words.splice(wordBank.currWordIndex, 1);
  wordBank.size--;
};
