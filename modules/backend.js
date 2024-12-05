// import wordBank from '../assets/example-words.json';
// import data from '../assets/example-words.json' with {type: 'json'};
// console.log(data);
const wordBank = new Object();
wordBank.words = [
  'apple',
  'banana',
  'orange',
  'grape',
  'kiwi',
  'pear',
  'peach',
  'plum',
  'melon',
  'lemon',
  'pineapple',
];
wordBank.size = wordBank.length;
wordBank.currWord = -1;
const prevWords = [''];

const newGame = (wordBank) => {
  const randIndex = Math.floor(Math.random() * wordBank.size);
  wordBank.currWord = randIndex;
  const game = new Object();
  game.word = wordBank[randIndex].split('');
  game.wordLength = game.word.length;
  game.lives = 10;
  game.correctLetters = new Array(game.wordLength);
  game.correctLetters.fill('_');
  game.usedLetters = [];
  console.log(game);
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
  } else if (game.correctLetters.includes('_')) {
    return 'win';
  }
  return 'in progress';
};

const updateHistory = (wordBank, prevWords, word) => {
  prevWords.push(word);
  wordBank.splice(wordBank.currWord, 1);
  wordBank.size--;
};

newGame(wordBank);
