

let timer = 0
let timePassed = 1000 

let backgroundColor

function setup(){
	createCanvas(windowWidth, windowHeight)
	backgroundColor = color(random(255), random(255), random(255))
	
}


function draw(){ 
	background(backgroundColor)

	//timer example. i am confused

	if(millis() >= timer + timePassed){
		backgroundColor = color(random(255), random(255), random(255))
		timer = millis()
	}

	
}




function windowResized() { 
  resizeCanvas(windowWidth, windowHeight);
}












