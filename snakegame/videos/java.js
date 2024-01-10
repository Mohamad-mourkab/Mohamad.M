const board = document.getElementById('game-board');
const instruction = document.getElementById('instructions')
const logo = document.getElementById('logo')
const score = document.getElementById('score')
const highScoreText = document.getElementById('highScore')
const gameOverText = document.getElementById('gameOverText')
const gameOver = document.getElementById('gameOver')
const tips = document.getElementById('tips')
//game var

const gridSize = 20;
let snake = [{ x: 10, y: 10 }]
let food = generateFood();
let highScore = 0;
let direction = 'left';
let gameIntervalt;
let gameSpeedDelay = 200;
let gameStarted = false


function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}
// snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div',
            'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//position of the snake or food

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

//food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}


//movements
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);


    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameIntervalt);
        gameIntervalt = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop()
    }
}


// start game function

function startGame() {
    gameStarted = true;
    instruction.style.display = 'none';
    logo.style.display = 'none';
    gameOverText.style.display = 'none';
    gameOver.style.display = 'none';
    gameIntervalt = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}



//test
// draw();
// setInterval (() => {
//     move();
//     draw();
// }, 200);

function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === 'Space')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'w':
                direction = 'up';
                break;
            case 's':
                direction = 'down';
                break;
            case 'd':
                direction = 'right';
                break;
            case 'a':
                direction = 'left';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 1;
    }
    else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 0.5;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }]
    gameOverText.style.display = 'block';
    gameOver.style.display = 'block';
    logo.style.display = 'block';
    food = generateFood();
    direction = 'left'
    gameSpeedDelay = 200;
    updateScore();
}

function removeTips(){
    tips.style.display = 'none'
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
    clearInterval(gameIntervalt);
    gameStarted = false;
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore
        highScoreText.textContent = highScore.toString().padStart(3, '0')
    }
    highScoreText.style.display = 'block';
}