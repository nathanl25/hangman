// import wordBank from '../assets/example-words.json';
// make js file instead
import { data } from '../assets/example-words.js';
import { updatePicture, updateButton } from './dom.js';
// console.log(data);
export const wordBank = {};
// wordBank.words = [
//   'apple',
//   'banana',
//   'orange',
//   'grape',
//   'kiwi',
//   'pear',
//   'peach',
//   'plum',
//   'melon',
//   'lemon',
// ];
wordBank.words = data;
// console.log(wordBank.words);
wordBank.size = wordBank.words.length;
// console.log(wordBank.size);
wordBank.currWord = -1;
// export { wordBank };
export const prevWords = [''];

export const newGame = (wordBank) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWord = randIndex;
  const game = new Object();
  //   console.log(randIndex);
  game.word = wordBank.words[randIndex].split('');
  game.wordLength = game.word.length;
  game.wrongGuesses = 0;
  game.correctLetters = new Array(game.wordLength);
  game.correctLetters.fill('_');
  game.usedLetters = [];
  //   console.log(game);
  return game;
};

export const gameMove = (game, button) => {
  const letter = button.innerText.toLowerCase();
  if (validInput(game, letter)) {
    guessLetter(game, button);
  } else {
    console.log('You already picked this move, dummy');
  }
  const gameSt = checkGameStatus(game);
  if (gameSt === 'lose') {
    console.log('You lose');
    return 'l';
  } else if (gameSt === 'win') {
    console.log('You win');
    return 'w';
  } else {
    console.log(`Word: ${game.correctLetters}`);
    console.log(`Lives remaining: ${10 - game.wrongGuesses}`);
    return 'c';
  }
};

const validInput = (game, letter) => {
  if (letter.toUpperCase() === letter.toLowerCase()) {
    return false;
  } else if (game.usedLetters.includes(letter)) {
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
  if (game.wrongGuesses === 9) {
    return 'lose';
  } else if (!game.correctLetters.includes('_')) {
    return 'win';
  }
  return 'in progress';
};

export const updateHistory = (wordBank, prevWords, word) => {
  prevWords.push(word);
  wordBank.splice(wordBank.currWord, 1);
  wordBank.size--;
};

// newGame(wordBank);
