let modemSound
let playButton
let canvas

function preload(){
	modemSound = loadSound('ModemSound.mp3')
}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight)
	canvas.style('z-index', '-1')
	canvas.position(0,0)

	playButton = createButton('play')//green is what appears on the play button
	playButton.position(100,100)
	playButton.mousePressed(playModem)
}

function playModem(){
	if(!modemSound.isPlaying()){
		modemSound.loop()
		playButton.html('pause')
	}else{
		modemSound.pause()
		playButton.html('play')
	}
}
function draw(){
	background(0)
}
//grab this code from discord