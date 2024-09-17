const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

const gridSize = 20; 
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: gridSize, y: 0 }; 
let food = {};
let score = 0; 
let gameInterval; 

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        endGame('Jogo terminado ! Pontuação final: ${score}');
        return;
    }

    if (isCollision(newHead)) {
        endGame('Jogo terminado! Pontuação final: ${score}');
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreElement.textContent = score;
        placeFood(); 
    } else {
        snake.pop();
    }
}

function isCollision(newHead) {
    return snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    drawFood(); 
    drawSnake();

    moveSnake();
}

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 };
    placeFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
}

function endGame(message) {
    clearInterval(gameInterval);
    alert(message);
}

function changeDirection(event) {
    const { key } = event;
    switch (key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction.x = 0;
                direction.y = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction.x = 0;
                direction.y = gridSize;
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction.x = -gridSize;
                direction.y = 0;
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction.x = gridSize;
                direction.y = 0;
            }
            break;
    }
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

placeFood();
drawFood();
drawSnake();