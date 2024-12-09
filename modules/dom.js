/*Things to do
Initialise game - Maybe a welcome screen?


On click a letter 
- check if letter has already been selected
    - If so, display some sort of error

- Check if letter is in hangman word
    - If it is, reveal location, update object
    - If not, update image, update object
- Update "keyboard" based off key press

- Check game over condition
    - 0 lives: lose
    - 0 hidden letters: win
        Display game over

Loop back to letter click if game in progress

If game is finished, prompt for another game
Add last game's word to used word
Remove last game's word from word bank
Display last game's word somewhere

Resetting Game
Create a new object/renew values for existing object?


*/

const hangmanDrawings = document.getElementById('hangmanWrapper');
// console.log(hangmanDrawings.children[0]);

export const createEl = (parent, child, text, id) => {
  const el = document.createElement(child);
  const pText = document.createTextNode(text);
  //   console.log(text);
  el.appendChild(pText);
  el.id = id;
  parent.appendChild(el);
};

export const updateEl = (element, text) => {
  element.textContent = text;
};

export const updatePicture = (game) => {
  const progress = game.wrongGuesses;
  //   console.log(hangmanDrawings.children[progress]);
  hangmanDrawings.children[progress].classList.remove('invisible');
  hangmanDrawings.children[progress].classList.add('visible');
};

export const resetPicture = () => {
  const hangmanWrapper = document.querySelector('#hangmanWrapper');
  const hangmen = hangmanWrapper.querySelectorAll('div');
  //   console.log(hangmen);
  hangmen.forEach((drawing) => {
    drawing.classList.remove('visible');
    drawing.classList.add('invisible');
  });
};

export const updateButton = (button, guessType) => {
  button.classList.remove('default');
  button.classList.add(guessType);
  button.disabled = true;
};

export const resetButton = (button) => {
  if (button.classList.contains('correct')) {
    button.classList.remove('correct');
    button.classList.add('default');
  } else if (button.classList.contains('incorrect')) {
    button.classList.remove('incorrect');
    button.classList.add('default');
  }
  button.disabled = false;
};
