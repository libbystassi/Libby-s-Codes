let furby

function preload(){
	furby = loadImage ('furby.png')
}

//initialize the image, then pre load it before adding it

function setup(){
	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER)
}

function draw(){
	image(furby, windowWidth/2, windowHeight/2)
	//if(mouseIsPressed == true){
	//	background("blue")
	//}else{
	//	background("black")
	//}
}


