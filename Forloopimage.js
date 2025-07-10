let furby

function preload(){
	furby = loadImage ('furby.png')
}

//initialize the image, then pre load it before adding it

function setup(){
	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER)
	for (var i = 0; i < 10; i++) {
  image(furby, random(windowWidth), random(windowHeight), 50, 50);
}
//up here the furbys stay still, below they go in random spots constantly
}

function draw(){
	//if(mouseIsPressed == true){
	//	background("blue")
	//}else{
	//	background("black")
	//}	
	image(furby, windowWidth/2, windowHeight/2)
	image(furby, mouseX, mouseY, 50, 50);

//window width and height random is useful

}



