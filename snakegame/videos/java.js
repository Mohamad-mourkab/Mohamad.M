const board = document.getElementById('game-board');
const instruction = document.getElementById('instructions')
const logo = document.getElementById('logo')
//game var

const gridSize = 10;
let snake = [{ x: 10, y: 10 }]
let food = generateFood();
let direction = 'left';
let gameIntervalt;
let gameSpeedDelay = 200;
let gameStarted = false


function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
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
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return (x, y);
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
        food = generateFood()
        clearInterval();
        gameIntervalt = setInterval(() => {
            move();
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
    gameIntervalt = setInterval(() => {
        move();
        // checkCollision();
        draw();
    }, gameSpeedDelay);
}



//test
// draw();
// setInterval (() => {
//     move();
//     draw();
// }, 200);

function handleKeyPress(event) 
{
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
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function checkCollision(){
}