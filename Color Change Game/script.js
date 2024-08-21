const board = document.querySelector(".board");

const maxWidth = 500;

let score = 0;
let rowCount = 2;
let colCount = 2;
let margin = 100;
let timer = 60;

const updateScore = () => {
    const pointEl = document.querySelector("#point");
    pointEl.innerHTML = score;
};

const updateCountdown = () => {
    const countdownEl = document.querySelector("#countdown");
    countdownEl.innerHTML = timer;
};

const gameover = () => {
    const gameoverEl = document.querySelector("#game-over");
    gameoverEl.className = "shown";
};

const countdown = () => {
    if (timer != 0){
        timer--;
        updateCountdown();
    }else{
        gameover();
    }
};

setInterval(countdown, 1000);

const draw = () => {
    board.innerHTML = "";
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const oddIndex = Math.floor(Math.random() * rowCount * colCount);

    for (let i = 0; i < rowCount * colCount; i++){
        const tileEl = document.createElement("div");
        tileEl.className = "tile";
        tileEl.style.width = `${maxWidth / colCount}px`;
        tileEl.style.height = `${maxWidth / rowCount}px`;

        if (i === oddIndex){
            tileEl.style.backgroundColor = `rgb(${red - margin}, ${green - margin}, ${blue - margin})`;
            tileEl.addEventListener("click", handleCorrectClick);
        }else{
            tileEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            tileEl.addEventListener("click", handleWrongClick);
        }

        board.appendChild(tileEl);
        updateScore();
    };
};

const handleWrongClick = () => {
    timer -= 5;
};

const handleCorrectClick = () => {
    score++;
    if (score % 3 === 0){
        rowCount++;
        colCount++;
        if (margin != 20){
            margin -= 10;
        };
    };
    draw();
};

draw();