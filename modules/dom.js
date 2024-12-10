const hangmanDrawings = document.getElementById('hangmanWrapper');

export const createEl = (parent, child, text, id) => {
  const el = document.createElement(child);
  const pText = document.createTextNode(text);
  el.appendChild(pText);
  el.id = id;
  parent.appendChild(el);
};

export const updateEl = (element, text) => {
  element.textContent = text;
};

export const updatePicture = (game) => {
  const progress = game.wrongGuesses;
  hangmanDrawings.children[progress].classList.remove('invisible');
  hangmanDrawings.children[progress].classList.add('visible');
};

export const resetPicture = () => {
  const hangmanWrapper = document.querySelector('#hangmanWrapper');
  const hangmen = hangmanWrapper.querySelectorAll('div');
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
