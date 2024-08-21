const board = document.querySelector(".board");

const ROW_COUNT = 6;
const COL_COUNT = 7;

let red = true;

let game = [];

const end = (player) => {
  alert(player === 1 ? "RED WINS" : "YELLOW WINS");
  restartGame();
};

const checkFour = (a, b, c, d) => {
  return a !== null && a === b && a === c && a === d;
};

const checkHorizontal = () => {
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT - 3; col++) {
      if (
        checkFour(
          game[row][col],
          game[row][col + 1],
          game[row][col + 2],
          game[row][col + 3]
        )
      ) {
        return game[row][col];
      }
    }
  }
  return null;
};

const checkVertical = () => {
  for (let col = 0; col < COL_COUNT; col++) {
    for (let row = 0; row < ROW_COUNT - 3; row++) {
      if (
        checkFour(
          game[row][col],
          game[row + 1][col],
          game[row + 2][col],
          game[row + 3][col]
        )
      ) {
        return game[row][col];
      }
    }
  }
  return null;
};

const checkMainDiagonal = () => {
  for (let row = 0; row < ROW_COUNT - 3; row++) {
    for (let col = 0; col < COL_COUNT - 3; col++) {
      if (
        checkFour(
          game[row][col],
          game[row + 1][col + 1],
          game[row + 2][col + 2],
          game[row + 3][col + 3]
        )
      ) {
        return game[row][col];
      }
    }
  }
  return null;
};

const checkAnotherDiagonal = () => {
  for (let row = ROW_COUNT - 1; row >= 3; row--) {
    for (let col = 0; col < COL_COUNT - 3; col++) {
      if (
        checkFour(
          game[row][col],
          game[row - 1][col - 1],
          game[row - 2][col - 2],
          game[row - 3][col - 3]
        )
      ) {
        return game[row][col];
      }
    }
  }
  return null;
};

const check = () => {
  const horizontal = checkHorizontal();
  if (horizontal) return end(horizontal);

  const vertical = checkVertical();
  if (vertical) return end(vertical);

  const diagonal = checkMainDiagonal();
  if (diagonal) return end(diagonal);

  const diagonalAnother = checkAnotherDiagonal();
  if (diagonalAnother) return end(diagonalAnother);
};

const onTileClick = (e) => {
  const target = e.target;
  const position = {
    x: target.getAttribute("data-x"),
    y: target.getAttribute("data-y"),
  };

  for (let row = 0; row < ROW_COUNT; row++) {
    if (game[row][position.x] === null) {
      game[row][position.x] = red ? 1 : 2;

      red = !red;

      draw();
      check();
      break;
    }
  }
};

const draw = () => {
  board.innerHTML = "";

  console.log(red ? "Reds turn" : "Yellows turn");

  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      const tileEl = document.createElement("div");
      tileEl.classList.add("tile");
      tileEl.addEventListener("click", onTileClick);
      tileEl.setAttribute("data-x", j);
      tileEl.setAttribute("data-y", ROW_COUNT - 1 - i);
      const tile = game[ROW_COUNT - 1 - i][j];
      if (tile !== null) {
        if (tile === 2) {
          tileEl.classList.add("yellow");
        }
        if (tile === 1) {
          tileEl.classList.add("red");
        }
      }

      board.appendChild(tileEl);
    }
  }
};

const restartGame = () => {
  game = [];
  for (let i = 0; i < ROW_COUNT; i++) {
    const row = [];
    for (let j = 0; j < COL_COUNT; j++) {
      row.push(null);
    }
    game.push(row);
  }
  draw();
};

restartGame();