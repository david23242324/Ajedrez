import './style.css';
import { Chess } from 'chess.js';

const game = new Chess();

const app = document.querySelector('#app');
const board = document.createElement('div');
board.className = 'chessboard';
app.appendChild(board);

// Mapa de piezas a símbolos Unicode
const pieceSymbols = {
  p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
  P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
};

// Renderizar el tablero
function renderBoard() {
  board.innerHTML = '';
  const state = game.board();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = state[row][col];
      if (piece) {
        square.textContent = pieceSymbols[piece.color === 'w' ? piece.type.toUpperCase() : piece.type];
      }

      board.appendChild(square);
    }
  }
}

renderBoard();

let selected = null;

board.addEventListener('click', (e) => {
  const square = e.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  if (isNaN(row) || isNaN(col)) return;

  const file = String.fromCharCode(97 + col); // 'a' to 'h'
  const rank = 8 - row; // 8 to 1
  const coord = file + rank;
  const piece = game.get(coord);

  if (!selected) {
    if (piece && piece.color === game.turn()) {
      selected = coord;
      clearSelection();
      clearHints();
      square.classList.add('selected');
      showHints(coord);
    }
    return;
  }

  if (piece && piece.color === game.turn()) {
    selected = coord;
    clearSelection();
    clearHints();
    square.classList.add('selected');
    showHints(coord);
    return;
  }

  const move = game.move({ from: selected, to: coord });
  clearSelection();
  clearHints();
  selected = null;
  if (move) renderBoard();
});

function clearSelection() {
  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('selected');
  });
}

function showHints(squareName) {
  const moves = game.moves({ square: squareName, verbose: true });
  moves.forEach(move => {
    const col = move.to.charCodeAt(0) - 97;
    const row = 8 - parseInt(move.to[1]);
    const target = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (target) target.classList.add('hint');
  });
}

function clearHints() {
  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('hint');
  });
}