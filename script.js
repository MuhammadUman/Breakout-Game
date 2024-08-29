const grid = document.querySelector(".grid");
const userStart = [230, 10];
let currentPosition = userStart;
const boardWidth = 570;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
let timerId;
let xDirection = 2;
let yDirection = 2;
let blocksId = [];
let blockWidth = 100;
let blockHeight = 20;
const scoreId = document.querySelector(".score");
let score = 0;

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
  }
}
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
console.log(blocks.length);

function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
  blocksId = document.querySelectorAll(".block");
}
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.append(user);

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - 100) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
window.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  collisionCheck();
}

timerId = setInterval(moveBall, 20);

function collisionCheck() {
  if (score === blocks.length) {
    alert("YOU WON");
    clearInterval(timerId); 
    return; 
  }
  if (
    ballCurrentPosition[0] >= boardWidth - 20 ||
    ballCurrentPosition[1] >= 300 - 20 ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    alert("GAME OVER")
    clearInterval(timerId);
  }
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] >= blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] <= blocks[i].bottomLeft[0] + blockWidth &&
      ballCurrentPosition[1] >= blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] <= blocks[i].bottomLeft[1] + blockHeight
    ) {
      grid.removeChild(blocksId[i]);
      changeBlockDirection();
      
      break;
    }
  }
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + 20
  ) {
    changeDirection();
  }
}

function changeBlockDirection() {
  score++;
  scoreId.textContent = score;
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }

}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

addBlock();
