const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Check if there is a winner
const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    displayWinner(`${currentPlayer} wins!`);
    return;
  }

  if (!gameState.includes('')) {
    gameActive = false;
    displayWinner('It\'s a draw!');
  }
};

// Display the winner in a popup
const displayWinner = (message) => {
  winnerMessage.textContent = message;
  popup.style.display = 'flex';
};

// Restart the game
const restartGame = () => {
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
  popup.style.display = 'none';
};

// Attach click event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Attach click event to restart button
restartButton.addEventListener('click', restartGame);
