'use strict';

const input = document.querySelector('.guess');
const number = document.querySelector('.number');
const again = document.querySelector('.again');
const check = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');

var randomNumber = Number(Math.trunc(Math.random() * 20 + 1));

again.addEventListener('click', function (e) {
  e.preventDefault();
  input.value = ' ';
  number.textContent = '?';
  message.textContent = ' Start guessing...';
  score.textContent = 0;
  randomNumber = Number(Math.trunc(Math.random() * 20 + 1));
});

let numClick = 0;
let numClickHighScore = 0;
check.addEventListener('click', function (e) {
  e.preventDefault();
  if (Number(input.value) > randomNumber) {
    message.textContent = 'Too high';
    numClick++;
  } else if (Number(input.value) < randomNumber) {
    message.textContent = 'Too low';
    numClick++;
  } else {
    message.textContent = 'great';
    number.textContent = randomNumber;
    numClick++;
    score.textContent = numClick;
    if (Number(highScore.textContent) < Number(numClick)) {
      highScore.textContent = numClick;
    }
  }
});

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    check.click();
  }
});
