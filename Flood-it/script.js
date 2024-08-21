const board = document.querySelector(".board");

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;
const ROWS = 6;
const COLS = 6;

const COLOR_COUNT = 6;

const COLORS = ["red", "green", "blue", "yellow", "cyan", "orange"];

const createTile = (width, height) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.style.width = `${width}px`;
  tile.style.height = `${height}px`;
  return tile;
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max - min) + min;
};

const generateGameBoard = () => {
  const gameBoard = [];
  for (let row = 0; row < ROWS; row++) {
    gameBoard[row] = [];
    for (let col = 0; col < COLS; col++) {
      gameBoard[row][col] = generateRandomNumber(0, COLOR_COUNT);
    }
  }
  return gameBoard;
};

const floodFill = (board, row, col, targetColor, replacementColor) => {
  if (targetColor === replacementColor) return;
  if (board[row][col] !== targetColor) return;

  board[row][col] = replacementColor;

  if (row > 0) floodFill(board, row - 1, col, targetColor, replacementColor);
  if (row < ROWS - 1)
    floodFill(board, row + 1, col, targetColor, replacementColor);
  if (col > 0) floodFill(board, row, col - 1, targetColor, replacementColor);
  if (col < COLS - 1)
    floodFill(board, row, col + 1, targetColor, replacementColor);
};

let gameBoard = generateGameBoard();

const draw = () => {
  board.innerHTML = "";
  board.style.width = `${BOARD_WIDTH}px`;
  board.style.height = `${BOARD_HEIGHT}px`;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const tileWidth = BOARD_WIDTH / COLS;
      const tileHeight = BOARD_HEIGHT / ROWS;
      const tile = createTile(tileWidth, tileHeight);
      const tileColor = COLORS[gameBoard[row][col]];
      tile.style.backgroundColor = tileColor;
      tile.addEventListener("click", () => {
        const targetColor = gameBoard[0][0];
        const replacementColor = gameBoard[row][col];
        floodFill(gameBoard, 0, 0, targetColor, replacementColor);
        draw();
        const winned = checkWin();
        if (winned) {
          alert("You won");
        }
      });
      board.appendChild(tile);
    }
  }
};

const checkWin = () => {
  const flatted = gameBoard.flat();
  const firstValue = gameBoard[0][0];
  for (let i = 1; i < flatted.length; i++) {
    if (firstValue !== flatted[i]) return false;
  }
  return true;
};

const restartGame = () => {
  gameBoard = generateGameBoard();
  draw();
};

const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", restartGame);

restartGame();