let ellipseBrushBool = false
let squareBrushBool = false
let imageBrushBool = false

let flower

function preload(){
	flower = loadImage('purpleflower0.png')

}

function setup(){
	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER)

}

function draw(){
	//double equal to check if true, one equal to make it true, 
	//three equals for strings

	if (ellipseBrushBool == true){
		ellipseBrush()
	}

	if (squareBrushBool == true){
		squareBrush()
	}

	if (imageBrushBool == true){
		imageBrush()
	}

}

function keyPressed(){
	//activates ellipse
	if (key === 'e'){
		ellipseBrushBool = true
		squareBrushBool = false
		imageBrushBool = false
	}
	//activates square
	if (key === 's'){
		ellipseBrushBool = false
		squareBrushBool = true
		imageBrushBool = false
	}
	//activates image
	if (key === 'i'){
		ellipseBrushBool = false
		squareBrushBool = false
		imageBrushBool = true
		
	}
	//off
	if (key === 'o'){
		ellipseBrushBool = false
		squareBrushBool = false
		imageBrushBool = false

		background(255)
		
	}
}

function ellipseBrush(){
	fill(random(255), random(255), random(255))
	ellipse(mouseX, mouseY, 50, 50)
}

function squareBrush(){
	fill(random(255), random(255), random(255))
	rect(mouseX, mouseY, 50, 50)

}

function imageBrush(){
	if(mouseIsPressed){
  		image(flower, mouseX - 50, mouseY - 50, 100, 100)
	}

}