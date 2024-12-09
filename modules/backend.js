// import wordBank from '../assets/example-words.json';
// make js file instead
import { data } from '../assets/example-words.js';
import { updatePicture, updateButton } from './dom.js';
// console.log(data);
export const wordBank = {};
wordBank.words = data;
wordBank.size = wordBank.words.length;
wordBank.currWordIndex = -1;
export const prevWords = [];
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
// console.log(wordBank.words);
// console.log(wordBank.size);
// export { wordBank };

export const newGame = (wordBank) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWordIndex = randIndex;
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

export const resetGame = (wordBank, game) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWordIndex = randIndex;
  // const game = new Object();
  //   console.log(randIndex);
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
    // console.log('You lose');
    return 'Better Luck Next Time.';
  } else if (gameSt === 'win') {
    // console.log('You win');
    return 'You Win!';
  } else {
    // console.log(`Word: ${game.correctLetters}`);
    // console.log(`Lives remaining: ${10 - game.wrongGuesses}`);
    return 0;
  }
};

const validInput = (game, letter) => {
  //   if (letter.toUpperCase() === letter.toLowerCase()) {
  //     return false;
  //   } else if (game.usedLetters.includes(letter)) {
  //     return false;
  //   }
  //   console.log(letter);
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
  prevWords.push(oldWord);
  wordBank.words.splice(wordBank.currWordIndex, 1);
  wordBank.size--;
};

// newGame(wordBank);
