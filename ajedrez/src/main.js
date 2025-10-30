import './style.css';

const app = document.querySelector('#app');
const board = document.createElement('div');
board.className = 'chessboard';

const pieces = {
  white: ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖', '♙'],
  black: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟']
};

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');

    if (row === 0) square.textContent = pieces.black[col];
    else if (row === 1) square.textContent = pieces.black[8];
    else if (row === 6) square.textContent = pieces.white[8];
    else if (row === 7) square.textContent = pieces.white[col];

    board.appendChild(square);
  }
}

app.appendChild(board);