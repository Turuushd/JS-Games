let BOARD_WIDTH = 8;
let BOARD_HEIGHT = 8;

let DIRECTION = "down";

let SPEED = 100;

const board = document.querySelector(".board");

board.style.width = `${BOARD_WIDTH * 100}px`;
board.style.height = `${BOARD_HEIGHT * 100}px`;

let snake = [
  { x: Math.floor(BOARD_WIDTH / 2) - 1, y: Math.floor(BOARD_HEIGHT / 2) - 1 },
];
snake.push({ x: snake[0].x, y: snake[0].y - 1 });
snake.push({ x: snake[0].x, y: snake[0].y - 2 });

let food = {
  x: Math.floor(Math.random() * BOARD_WIDTH),
  y: Math.floor(Math.random() * BOARD_HEIGHT),
};

const drawFood = () => {
  const tile = document.querySelector(
    `[data-x="${food.x}"][data-y="${food.y}"]`
  );
  tile.classList.add("food");
};

const moveFood = () => {
  food.x = Math.floor(Math.random() * BOARD_WIDTH);
  food.y = Math.floor(Math.random() * BOARD_HEIGHT);

  const tile = document.querySelector(
    `[data-x="${food.x}"][data-y="${food.y}"]`
  );
  if (tile.classList.contains("body") || tile.classList.contains("head")) {
    moveFood();
  }

  tile.classList.add("food");
};

const eatFood = () => {
  snake.push({ x: food.x, y: food.y });
  moveFood();
};

const drawBoard = () => {
  board.innerHTML = "";
  board.style.width = `${BOARD_WIDTH * 100}px`;
  board.style.height = `${BOARD_HEIGHT * 100}px`;

  for (let i = 0; i < BOARD_HEIGHT; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      tile.setAttribute("data-x", j);
      tile.setAttribute("data-y", i);

      board.appendChild(tile);
    }
  }
  drawFood();
};

const drawSnake = () => {
  drawBoard();
  snake.forEach((part, index) => {
    if (index === 0) {
      const tile = document.querySelector(
        `[data-x="${part.x}"][data-y="${part.y}"]`
      );
      tile.classList.add("head");
    } else {
      const tile = document.querySelector(
        `[data-x="${part.x}"][data-y="${part.y}"]`
      );
      tile.classList.add("body");
    }
  });
};

const moveSnake = () => {
  const head = snake[0];

  let newHead;
  switch (DIRECTION) {
    case "right":
      newHead = { x: (head.x + 1) % BOARD_WIDTH, y: head.y };
      break;
    case "left":
      newHead = { x: (head.x - 1 + BOARD_WIDTH) % BOARD_WIDTH, y: head.y };
      break;
    case "up":
      newHead = { x: head.x, y: (head.y - 1 + BOARD_HEIGHT) % BOARD_HEIGHT };
      break;
    case "down":
      newHead = { x: head.x, y: (head.y + 1) % BOARD_HEIGHT };
      break;
  }

  if (newHead.x === food.x && newHead.y === food.y) {
    eatFood();
  }

  snake.unshift(newHead);
  snake.pop();

  drawSnake();
};

const handleKeyPress = (event) => {
  if (
    event.key === "ArrowRight" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown"
  ) {
    event.preventDefault();
  }

  switch (event.key) {
    case "ArrowRight":
      if (DIRECTION !== "left") {
        DIRECTION = "right";
      }

      break;
    case "ArrowLeft":
      if (DIRECTION !== "right") {
        DIRECTION = "left";
      }
      break;
    case "ArrowUp":
      if (DIRECTION !== "down") {
        DIRECTION = "up";
      }
      break;
    case "ArrowDown":
      if (DIRECTION !== "up") {
        DIRECTION = "down";
      }
      break;
  }
};

window.addEventListener("keydown", handleKeyPress);

setInterval(moveSnake, SPEED);