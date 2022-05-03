/*<--------Game Constants & Variables------->*/
let inputVelocity = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 19;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };


/*<-----Game Functions---->*/

function main(ctime) {
    window.requestAnimationFrame(main); //create game loop...we also use setInterval method

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) { // print after 1/speed time
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

/*-------when game will end or collide------*/
/*isCollide start*/
function isCollide(snake) {

    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
/*isCollide end*/


/*gameEngine start*/
function gameEngine() {
    /*-------Part 1: Updating the snake array & Food-------*/
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputVelocity = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    /*----If you have eaten the food, increment the score and regenerate the food----*/

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputVelocity.x, y: snakeArr[0].y + inputVelocity.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) } // logic for random genarate food
    }

    /*------Moving the snake-----*/
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputVelocity.x;
    snakeArr[0].y += inputVelocity.y;



    /*--------Part 2: Display the snake and Food------*/

    /*-----Display the snake-----*/
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    /*------Display the food-------*/
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
/*gameEngine end*/


/*<---------Main logic starts here---------->*/
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputVelocity = { x: 0, y: 1 } // Start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputVelocity.x = 0;
            inputVelocity.y = -1;
            break;

        case "ArrowDown":
            inputVelocity.x = 0;
            inputVelocity.y = 1;
            break;

        case "ArrowLeft":
            inputVelocity.x = -1;
            inputVelocity.y = 0;
            break;

        case "ArrowRight":
            inputVelocity.x = 1;
            inputVelocity.y = 0;
            break;
            
        default:
            break;
    }

});
