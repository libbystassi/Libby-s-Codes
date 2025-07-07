let gameState = "start";
let eventList = [
  "Garden Party",
  "Movie Premiere",
  "Date at the Diner",
  "Gala Night",
  "Picnic at the Park",
  "Royal Ball",
  "Beach Vacation",
  "Lunch Date with Friends"
];

let chosenEvent = "";
let playerChoice = "";

let xPos;
let yPos;

let xSpeed = 3;
let ySpeed = 3;

let barbie;
let barbieCount = 0;

function preload() {
  barbie = loadImage('barbie.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 180, 220); 
  textAlign(CENTER);
  textSize(28);
  textFont('Comic Sans MS'); // Cute default font
  chosenEvent = random(eventList);
  imageMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  if (barbieCount === 0 || barbieCount === 200) {
    background(255, 180, 220);
    barbieCount = 0;
  }

  if (barbieCount % 15 === 0) { 
    xPos = random(width);
    yPos = random(height);
    image(barbie, xPos, yPos, 100, 100);
  }

  barbieCount++; 

  fill(255, 180, 220);
  rect(width / 2, height / 2 - 130, 760, 200);

  if (gameState === "start") {
    showIntro();
  }

  if (gameState === "choiceMade") {
    showResponse();
  }
}

function showIntro() {
  fill(255, 20, 147); // Hot pink text
  text("💖 I’ve got a " + chosenEvent + " coming up soon! 💖", width / 2, 100);
  text("Can you help me get ready? ✨", width / 2, 150);
  text("Press key D for Dress or key T for Top & Pants", width / 2, 250);
}

function keyPressed() {
  if (gameState === "start") {
    if (key === 'D' || key === 'd') {
      playerChoice = "Dress";
      gameState = "choiceMade";
    }

    if (key === 'T' || key === 't') {
      playerChoice = "Top & Pants";
      gameState = "choiceMade";
    }
  }
}

function showResponse() {
  fill(255, 20, 147); // Hot pink text
  if (playerChoice === "Dress") {
    text("Yay! Let’s find a dress for the ", width / 2, 125)
    text(chosenEvent + "👗", width / 2, 170);
  } else if (playerChoice === "Top & Pants") {
    text("Cute! Let’s find an outfit for the ", width / 2, 125)
    text(chosenEvent + "💫", width / 2, 170);  }
}
