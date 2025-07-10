let xPos 
let yPos 

let xSpeed = 3
let ySpeed = 3

let ballDiameter = 100

let color = 0

let purpleflower = purpleflower0.png

function preload(){
  purpleFlower0 = loadImage ('purpleflower0.png')

}

function setup(){
	background('black')
	createCanvas(windowWidth, windowHeight)
	xPos = windowWidth/2
	yPos = windowHeight/2

	imageMode(CENTER)
}

function draw(){
	fill(0)

	text('Bouncing Ball Screensaver', 100, 100)

	xPos = xPos + xSpeed
	yPos = yPos + ySpeed

	fill(color)
	ellipse(xPos, yPos, ballDiameter, ballDiameter)
	//image(purpleflower, xPos, yPos, ballDiameter, ballDiameter)

	if (xPos >= windowWidth - ballDiameter/2|| xPos<= ballDiameter/2){
		xSpeed = xSpeed * -1
		color = [random(255), random(255), random(255)]


	}

	if (yPos >= windowHeight  - ballDiameter/2 || yPos<= ballDiameter/2){
		ySpeed = ySpeed * -1
		color = [random(255), random(255), random(255)]


	}
	//this is draw so its being checked at every frame
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
//this is usefull

