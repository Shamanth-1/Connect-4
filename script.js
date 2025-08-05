const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];
let gameOver = false;

const game = document.getElementById('game');
const status = document.getElementById('status');

// Create grid
function createBoard() {
  game.innerHTML = '';
  board = [];

  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      game.appendChild(cell);
      row.push('');
    }
    board.push(row);
  }

  document.querySelectorAll('.cell').forEach(cell =>
    cell.addEventListener('click', handleClick)
  );
}

// Handle click
function handleClick(e) {
  if (gameOver) return;

  const col = parseInt(e.target.dataset.col);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        status.textContent = `Player ${capitalize(currentPlayer)} wins!`;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        status.textContent = `Player ${capitalize(currentPlayer)}'s turn`;
      }
      break;
    }
  }
}

// Check for win
function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) + checkDirection(row, col, -1, 0) > 2 || // vertical
    checkDirection(row, col, 0, 1) + checkDirection(row, col, 0, -1) > 2 || // horizontal
    checkDirection(row, col, 1, 1) + checkDirection(row, col, -1, -1) > 2 || // diagonal \
    checkDirection(row, col, 1, -1) + checkDirection(row, col, -1, 1) > 2    // diagonal /
  );
}

// Check direction
function checkDirection(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;

  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

// Reset game
function resetGame() {
  currentPlayer = 'red';
  status.textContent = `Player Red's turn`;
  gameOver = false;
  createBoard();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start game
createBoard();
