let squareNums = [400, 36, 49, 64, 81, 100]

function setup(){
	createCanvas(windowWidth, windowHeight)

	print(squareNums[3])

}

function draw(){	
	for(let i=0; i<squareNums.length; i++){
		let posX = random(100, windowWidth)
		let posY = random(100, windowHeight)

		noStroke()
		fill(random(255), random(255), random(255))
		ellipse(posX, posY, squareNums[i], squareNums[i])
		//useful
		//since in draw it will keep happening

	}
	//could make cool background of fashion game
	//use timers to go slower
	//array of pretty colors

}



