const board = document.getElementById('game-board');

//game var

let snake = [{ x: 10, y: 10 }]
let food = generatefood();
const gridSize = 20

function draw(){
    board.innerHTML = "";
    drawSnake();
    drawFood();
}
// snake
function drawSnake(){
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

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

//food
function drawFood(){
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generatefood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return( x, y )
}

//test
draw();