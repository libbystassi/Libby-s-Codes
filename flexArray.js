let furby;
let xValuesArray = [];
let yValuesArray = [];

function preload() {
	furby = loadImage('furby.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
}

function draw() {
	background(150, 40, 100);

	for (let i = 0; i < xValuesArray.length; i++) {
		image(furby, xValuesArray[i], yValuesArray[i], 60, 60);
	}

	if(dist(mousexValuesArray, mouseyValuesArray, xValuesArray[i], yValuesArray[i], <30)){
		xValuesArray.splice(i, 1)
		yValuesArray.splice(i, 1)
	}
}

function mouseClicked() {
	xValuesArray.push(mouseX);
	yValuesArray.push(mouseY);
}

//posted in discord, use that code to figure out wtf is happening
//need to learn about splce