let xPos;
let yPos;

let xSpeed = 2;
let ySpeed = 2;

let furby;

let score = 0
let mouseDist
let startBool = true
let winBool = false

function preload() {
  furby = loadImage('purpleflower0.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xPos = windowWidth / 2;
  yPos = windowHeight / 2;
  background(0);
  imageMode(CENTER);
}

function draw() {
  if(startBool == true){
  	startGame()
  }

  if(winBool == true){
  	winGame()
}
}

function startGame(){
	background(235, 162, 191);
  fill(255);
  textSize(40)
  text('Tag the flower! Your score is ' + score + ' points!!', 100, 100)

  xPos = xPos + xSpeed;
  yPos = yPos + ySpeed;

  image(furby, xPos, yPos, 70, 70);

  mouseDist= dist(mouseX, mouseY, xPos, yPos)

  if (xPos >= windowWidth - 15 || xPos <= 15) {
    xSpeed = xSpeed * -1;
  }

  if (yPos >= windowHeight - 15 || yPos <= 15) {
    ySpeed = ySpeed * -1;
  }

  if(mouseDist < 15){
  	score ++

  	xPos = random(16, windowWidth - 16)
  	xSpeed = xSpeed * 1.1
  	ySpeed = ySpeed * 1.1

  }

  if(score == 10){
  	winBool = true
  	startBool = false
  }
}

function winGame(){
	background(0,0, 255)
	fill(255)
	textSize(40)
	text("You Win!!", windowWidth/2, 50)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}