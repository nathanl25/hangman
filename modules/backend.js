// import wordBank from '../assets/example-words.json';
import data from '../assets/example-words.json' with {type: 'json'};
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
  game.lives = 10;
  game.correctLetters = new Array(game.wordLength);
  game.correctLetters.fill('_');
  game.usedLetters = [];
  //   console.log(game);
  return game;
};

export const gameMove = (game, letter) => {
  if (validInput(game, letter)) {
    guessLetter(game, letter);
  } else {
    console.log('You already picked this move, dummy');
  }
  const gameSt = checkGameStatus(game);
  if (gameSt === 'lose') {
    console.log('You lose');
  } else if (gameSt === 'win') {
    console.log('You win');
  } else {
    console.log(`Word: ${game.correctLetters}`);
    console.log(`Lives remaining: ${game.lives}`);
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

const guessLetter = (game, letter) => {
  if (game.word.includes(letter)) {
    updateCorrectLetters(game, letter);
  } else {
    game.lives--;
  }
  updateUsedLetters(game, letter);
  return game;
};

const checkGameStatus = (game) => {
  if (game.lives === 0) {
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
