let pinkArray = [ [255, 182, 193], [255, 105, 180], [255, 192, 203], [219, 112, 147], [255, 20, 147], [255, 160, 203], 
[255, 128, 171], [231, 84, 128], [255, 153, 204], [242, 143, 174], [255, 182, 193], [255, 105, 180], [255, 192, 203]];

let yellowArray = [ [255, 255, 0], [255, 250, 205], [255, 239, 136], [255, 255, 102], [255, 223, 0], [255, 215, 0], 
[255, 255, 153], [240, 230, 140], [255, 248, 220], [250, 250, 110], [255, 255, 0], [255, 250, 205], [255, 239, 136]];

let orangeArray = [ [255, 165, 0], [255, 140, 0], [255, 200, 124], [255, 180, 50], [255, 117, 24], [255, 160, 122], 
[255, 130, 67], [255, 204, 92], [255, 95, 31], [255, 174, 66], [255, 165, 0], [255, 140, 0], [255, 200, 124]];

let purpleFlower0
let purpleFlower2
let purpleFlower3
let purpleFlower4
let purpleFlower5
let purpleFlower6
let purpleFlower7
let purpleFlower8
let purpleFlower9
let purpleFlower10
let purpleFlower11
let purpleFlower12

let orangeFlower0
let orangeFlower1
let orangeFlower2
let orangeFlower3
let orangeFlower4
let orangeFlower5
let orangeFlower6
let orangeFlower7
let orangeFlower8
let orangeFlower9
let orangeFlower10
let orangeFlower11
let orangeFlower12



let purpleArray = [];
let orangeFlowerArray = [];


function preload(){
  purpleFlower0 = loadImage ('purpleflower0.png')
  purpleFlower1 = loadImage ('purpleflower1.png')
  purpleFlower2 = loadImage ('purpleflower2.png')
  purpleFlower3 = loadImage ('purpleflower3.png')
  purpleFlower4 = loadImage ('purpleflower4.png')
  purpleFlower5 = loadImage ('purpleflower5.png')
  purpleFlower6 = loadImage ('purpleflower6.png')
  purpleFlower7 = loadImage ('purpleflower7.png')
  purpleFlower8 = loadImage ('purpleflower8.png')
  purpleFlower9 = loadImage ('purpleflower9.png')
  purpleFlower10 = loadImage ('purpleflower10.png')
  purpleFlower11 = loadImage ('purpleflower11.png')
  purpleFlower12 = loadImage ('purpleflower12.png')

  orangeFlower0 = loadImage ('orangeflower0.png')
  orangeFlower1 = loadImage ('orangeflower0.png')
  orangeFlower2 = loadImage ('orangeflower0.png')
  orangeFlower3 = loadImage ('orangeflower0.png')
  orangeFlower4 = loadImage ('orangeflower0.png')
  orangeFlower5 = loadImage ('orangeflower0.png')
  orangeFlower6 = loadImage ('orangeflower0.png')
  orangeFlower7 = loadImage ('orangeflower0.png')
  orangeFlower8 = loadImage ('orangeflower0.png')
  orangeFlower9 = loadImage ('orangeflower0.png')
  orangeFlower10 = loadImage ('orangeflower0.png')
  orangeFlower11 = loadImage ('orangeflower0.png')
  orangeFlower12 = loadImage ('orangeflower0.png')


  purpleArray = [purpleFlower0, purpleFlower1, purpleFlower2, 
    purpleFlower3, purpleFlower4, purpleFlower5, purpleFlower6,
    purpleFlower7, purpleFlower8, purpleFlower9, purpleFlower10,
    purpleFlower11, purpleFlower12]

  orangeFlowerArray = [orangeFlower0, orangeFlower1, orangeFlower2, orangeFlower3, 
    orangeFlower4, orangeFlower5, orangeFlower6, orangeFlower7, orangeFlower8, 
    orangeFlower9, orangeFlower10, orangeFlower11, orangeFlower12]

}


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(135, 206, 235); 
  drawGrass();

  pinkFlowerLoop();
  yellowFlowerLoop();
  orangeFlowerLoop();
  secondPinkFlowerLoop();
  secondYellowFlowerLoop();
  secondOrangeFlowerLoop();
  
  drawSun();
  drawBear();
}

function pinkFlowerLoop(){
  for(var i = 0; i <= 12; i++){
    let pinkFlowerX = i * 50
    drawFlower(pinkFlowerX, 325, pinkArray[i]);
  }
}

function yellowFlowerLoop(){
  for (var i = 0; i < yellowArray.length; i++) {
    let yellowFlowerX = i * 50;
    drawFlower(yellowFlowerX, 405, yellowArray[i]);
  }
}

function orangeFlowerLoop(){
  for (var i = 0; i < orangeArray.length; i++) {
    let orangeFlowerX = i * 50;
    drawFlower(orangeFlowerX, 485, orangeArray[i]);
  }
}

function secondPinkFlowerLoop(){
  for (var i = 0; i < purpleArray.length; i++) {
    let purpleFlowerX = i * 50 - 25;
  image(purpleArray[i], purpleFlowerX, 300, 50, 50);
  }
}

function secondYellowFlowerLoop(){
  for (var i = 0; i < purpleArray.length; i++) {
    let purpleFlowerX = i * 50 - 25;
  image(purpleArray[i], purpleFlowerX, 380, 50, 50);
  }
}

function secondOrangeFlowerLoop(){
  for (var i = 0; i < orangeFlowerArray.length; i++) {
    let orangeSecondFlowerX = i * 50 - 25;
  image(orangeFlowerArray[i], orangeSecondFlowerX, 460, 50, 40);
  }
}

function drawGrass() {
  fill(120, 200, 100);
  rectMode(CENTER)
  stroke(25, 110, 5)
  strokeWeight(30)
  rect(width/2, height, width + 100, height/2);
}

function drawSun() {
  stroke(235, 177, 52)
  strokeWeight(10)
  fill(255, 223, 0);
  ellipse(80, 80, 100, 100);
}

function drawBear() {
   // Head
  noStroke();
  fill(160, 82, 45);
  //ellipse(width/2, height/2, 160, 160);
  ellipse(mouseX, mouseY, 160, 160);
  
  // Ears
  fill(139, 69, 19);
  ellipse(mouseX - 70, mouseY - 70, 50, 50);
  ellipse(mouseX + 70, mouseY - 70, 50, 50);


  // Eyes
  fill(0);
  ellipse(mouseX - 40, mouseY - 15, 15, 15);
  ellipse(mouseX + 40, mouseY -15, 15, 15);

  // Nose
  fill(0);
  ellipse(mouseX, mouseY + 10, 25, 15);

  // Body
  fill(160, 82, 45);
  ellipse(mouseX, mouseY + 150, 180, 200);

  // Belly
  fill(222, 184, 135);
  ellipse(mouseX, mouseY + 150, 100, 120);
}

function drawFlower(x, y, color) {
  // Stem
  stroke(0, 100, 0);
  strokeWeight(4);
  line(x, y, x, y + 125);

  // Petals
  noStroke();
  fill(color);
  ellipse(x, y, 50, 50);

}