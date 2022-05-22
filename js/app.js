/* eslint-disable no-magic-numbers */
import {
  dictionary
} from './dictionary.js';

let words = Object.values(dictionary);

let answer = words[Math.floor(Math.random() * words.length)];

console.log(answer);

const isCorrectSymbol = (message) => {
  let result = answer.includes(message)
  return result
}

const place = (message, position) => {
  let answerMessage = answer[position]
  let result = message === answerMessage
  return result
}

let currentRow = 0;
let currentColumn = 0;

const guesses = [
  [],
  [],
  [],
  [],
  [],
  []
];

document.addEventListener('keyup', (keyUpEvent) => {

  const isBackspace = keyUpEvent.keyCode === 8;
  const isEnter = keyUpEvent.keyCode === 13;

  if (isBackspace) {
    assignValueForCurrentSquare('');
    if (currentColumn > 0) {
      currentColumn--;
    }
  } else if (isEnter) {
    if (currentColumn === 4) {
      guess();
    }
  } else {
    const message = String.fromCharCode(keyUpEvent.keyCode);
    assignValueForCurrentSquare(message);

    if (keyUpEvent.key.length === 1 && keyUpEvent.key.match(/[А-Яа-яёЁЇїІіЄєҐґ]/i)) {

      assignValueForCurrentSquare(keyUpEvent.key);
      if (currentColumn !== 4) {
        currentColumn = currentColumn + 1;
      }
    }
  }
});

const guess = () => {

  const row = guesses[currentRow];
  let symbolCount = 0;
  for (let column = 0; column < 5; column++) {
    const currentSymbol = row[column];
    let color = 'salmon';

    if (isCorrectSymbol(currentSymbol)) {
      color = 'yellow';
    }

    if (place(currentSymbol, column)) {
      color = 'palegreen';
      symbolCount++;
    }
    assignColor(currentRow, column, color);
  }

  if (symbolCount === 5) {
    alert('Congratulations! You won');
  } else {
    selectNextRow()
  }
}

const selectNextRow = () => {
  if (currentRow === 5) {
    alert('Game over');
  } else {
    currentRow = currentRow + 1;
    currentColumn = 0;
  }
}

const assignColor = (row, column, color) => {
  document.getElementById(`r${row}c${column}`).style.backgroundColor = color;
}

const assignValueForCurrentSquare = (message) => {
  const targetId = `r${currentRow}c${currentColumn}`;
  guesses[currentRow][currentColumn] = message;
  document.getElementById(targetId).value = message;
}

// eslint-disable-next-line no-unused-vars
const focusNextElement = (rowNum, colNum) => {
  if (colNum !== 5) {
    document.getElementById(`r${rowNum}c${colNum + 1}`).focus();
  }
}

let button = document.querySelector('.reset');
button.addEventListener('click', function () {
  location.reload();
});

let btnCheck = document.querySelector('.check');
btnCheck.addEventListener('click', function () {
  guess();
});