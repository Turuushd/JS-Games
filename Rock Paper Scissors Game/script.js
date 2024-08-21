const rps = document.querySelector(".rps");
const userResult = document.querySelector(".user-result");
const comResult = document.querySelector(".com-result");
const result = document.querySelector(".result");
const rockEl = document.querySelector(".rock");
const paperEl = document.querySelector(".paper");
const scissorsEl = document.querySelector(".scissors");
const userScore = document.querySelector(".user-point");
const comScore = document.querySelector(".com-point");

let elements = ["✊🏻", "✋🏻", "✌🏻"];
let com = "";
let userPoint = ""; 
let comPoint = ""; 

rockEl.addEventListener("click", () => {
    showUserResult("✊🏻");
    showComResult();
});

paperEl.addEventListener("click", () => {
    showUserResult("✋🏻");
    showComResult();
});

scissorsEl.addEventListener("click", () => {
    showUserResult("✌🏻");
    showComResult();
});

const randomCom = () => {
    let random = Math.floor(Math.random() * 3);
    com = elements[random];
};

const showUserResult = (element) => {
    userResult.innerHTML = `${element}`;
};

const showComResult = () => {
    randomCom();
    comResult.innerHTML = `${com}`;
    determine();
};

const determine = () => {
    if (userResult.innerHTML === "✊🏻"){
        if (comResult.innerHTML == "✊🏻"){
            result.innerHTML = "Draw!!"
        } else if (comResult.innerHTML === "✋🏻"){
            result.innerHTML = "Computer Win!!"
            comPoint++;
            comScore.innerHTML = comPoint;
        } else if (comResult.innerHTML === "✌🏻"){
            result.innerHTML = "User Win!!"
            userPoint++;
            userScore.innerHTML = userPoint;
        }
    }else if (userResult.innerHTML === "✋🏻"){
        if (comResult.innerHTML == "✊🏻"){
            result.innerHTML = "User Win!!"
            userPoint++;
            userScore.innerHTML = userPoint;
        } else if (comResult.innerHTML === "✋🏻"){
            result.innerHTML = "Draw!!"
        } else if (comResult.innerHTML === "✌🏻"){
            result.innerHTML = "Computer Win!!"
            comPoint++;
            comScore.innerHTML = comPoint;
        }
    }else if (userResult.innerHTML === "✌🏻"){
        if (comResult.innerHTML == "✊🏻"){
            result.innerHTML = "Computer Win!!"
            comPoint++;
            comScore.innerHTML = comPoint;
        } else if (comResult.innerHTML === "✋🏻"){
            result.innerHTML = "User Win!!"
            userPoint++;
            userScore.innerHTML = userPoint;
        } else if (comResult.innerHTML === "✌🏻"){
            result.innerHTML = "Draw!!"
        }
    }; 
};