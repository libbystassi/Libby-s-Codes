
let gameState = "introPrompt";  
let selectedTopImage = null;
let selectedClothes = null;


const eventList = [
  "Garden Party",
  "Movie Premiere",
  "Date at the Diner",
  "Gala Night",
  "Picnic at the Park",
  "Royal Ball",
  "Beach Vacation",
  "Lunch Date with Friends"
];

let chosenEvent  = "";
let playerChoice = "";

let barbie1, barbie2, barbie3;
let model;
let barbieCount = 0;
let allLogoPositions = [];
let minDistance;

let top1;
let top2;
let top3;
let top4;
let top5;
let top6;
let top7;
let top8;
let top9;
let top10;

let top1Picked = false;
let top2Picked = false;
let top3Picked = false;
let top4Picked = false;
let top5Picked = false;
let top6Picked = false;
let top7Picked = false;
let top8Picked = false;
let top9Picked = false;
let top10Picked = false;

let dressArray1= [];
let dressArray2= [];
let topsArray1= [];
let topsArray2= [];
let bottomsArray1= [];
let bottomsArray2= [];
let shoesArray1= [];
let shoesArray2= [];
let hairArray1= [];
let hairArray2= [];
let lipstickArray1= [];
let lipstickArray2= [];
let mascaraArray1= [];
let mascaraArray2= [];
let eyeshadowArray1= [];
let eyeshadowArray2= [];
let blushArray1= [];
let blushArray2= [];

const ruleBank = [
  "Wear makeup, but look natural.",
  "Be thin, but eat whatever.",
  "Speak up, but don’t be loud.",
  "Lead, but never boss.",
  "Work hard, but make it look easy.",
  "Be fit, yet stay graceful.",
  "Age? Never show it.",
  "Smile. Always.",
  "Show skin, but stay classy.",
  "Be confident, but never cocky.",
  "Be stylish, but don’t try too hard.",
  "Have curves, but no belly.",
  "Be unique, but fit in.",
  "Look effortless, but spend hours getting ready.",
  "Be tan, but protect your skin.",
  "Wear heels, but walk like you’re floating.",
  "Look polished, even at the gym.",
  "Have perfect hair, even in the rain.",
  "Be bold, but not intimidating.",
  "Be smart, but never too opinionated.",
  "Be ambitious, but not threatening.",
  "Cry, but only if it’s sweet.",
  "Be modest, but still desirable.",
  "Be quirky, but not weird.",
  "Be independent, but don’t make him feel useless.",
  "Love your body, but change everything.",
  "Be spontaneous, but plan everything.",
  "Have boundaries, but never say no.",
  "Be soft, but never weak.",
  "Be natural, but get procedures done.",
  "Be low-maintenance, but look high-maintenance.",
  "Have standards, but don’t be picky.",
  "Have fun, but don’t party too much.",
  "Be chill, but not boring.",
  "Flirt, but don’t lead him on.",
  "Be mysterious, but share everything online."
];

const ruleSpeedRange = 1.8;

function preload() {
  barbie1 = loadImage('barbie.png');
  barbie2 = loadImage('BarbieLogo2.png');
  barbie3 = loadImage('BarbieLogo3.png');
  model = loadImage('model.png');

  top1 = loadImage('top1.png');
  top2 = loadImage('top2.png');
  top3 = loadImage('top3.png');
  top4 = loadImage('top4.png');
  top5 = loadImage('top5.png');
  top6 = loadImage('top6.png');
  top7 = loadImage('top7.png');
  top8 = loadImage('top8.png');
  top9 = loadImage('top9.png');
  top10 = loadImage('top10.png');
}

function setup() {
  topArray1 = [top1, top2, top3, top4, top5];
  topArray2 = [top6, top7, top8, top9, top10];


  createCanvas(windowWidth, windowHeight);
  background(247, 215, 233);
  textAlign(CENTER, CENTER);
  textSize(width * 0.015); // scales with screen width
  textFont('Comic Sans MS');
  chosenEvent = random(eventList);
  imageMode(CENTER);
  rectMode(CENTER);

  minDistance = width * 0.05; // was 100, now relative to width
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let itemHeight = height / 6.5;

  if (selectedTopImage !== null) {
      // The Y position is aligned with the model's Y, you might need slight adjustments
      // based on the specific top images to make them sit perfectly.
      image(selectedTopImage, width/2, height/2.2, width / 10, itemHeight);
  }

  // This block handles the intro and rule-showing states.
  if (["introPrompt", "noOption", "rulesPrompt", "showingRules"].includes(gameState)) {
    runIntroFlow();
    return; // Stop drawing the rest of the scene if in intro flow
  }

  if (selectedClothes == null) {
    // If not in intro flow with no clothes on, draw the model.
    // The model is drawn here so the chosen top can appear on top of it.
    image(model, width/2, height/2 + height * 0.085, width * 0.21, height * 0.6);
  }


  // Barbie logo animation in the background
  if (barbieCount === 0 || barbieCount === 200) {
    background(247, 215, 233);
    allLogoPositions = [];
    barbieCount = 0;
  }

  if (barbieCount % 25 === 0) {
    placeLogo(barbie1, width * 0.052, height * 0.121);
    placeLogo(barbie2, width * 0.052, height * 0.121);
    placeLogo(barbie3, width * 0.078, height * 0.121);
  }
  barbieCount++;

  // Pink rectangle at the top
  stroke(227, 20, 131);
  strokeWeight(10);
  fill(255, 180, 220);
  rect(width / 2, height * 0.193, width * 0.396, height * 0.302);

  // Display based on game state
  if (gameState === "start") {
    showIntro();
    showOutfitButtons();
  } else {
    showResponse();
    showDoneButton();
  }
}

function runIntroFlow() {
  background(0);                 
  fill(255);                     
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);

  if (gameState === "introPrompt") {
    text("Do you accept the Feminine Challenge?", width / 2, height / 3);
    drawButton(width / 2 - width * 0.0625, height * 0.6, "Yes");
    drawButton(width / 2 + width * 0.0625, height * 0.6, "No");
  }

  else if (gameState === "noOption") {
    text("Sorry, “No” isn’t an option.\nRules were written for you.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Yes");
  }

  else if (gameState === "rulesPrompt") {
    text("Before we begin, review the Rules.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Rules");
  }

  else if (gameState === "showingRules") {
    if (frameCount % 3 === 0 && rulesIndex < ruleBank.length) {
      activeRules.push({
        txt: ruleBank[rulesIndex],
        x: random(width * 0.031, width - width * 0.031),
        y: random(height * 0.072, height - height * 0.072),
        vx: random(-ruleSpeedRange, ruleSpeedRange),
        vy: random(-ruleSpeedRange, ruleSpeedRange)
      });
      rulesIndex++;
    }

    activeRules.forEach(r => {
      r.x += r.vx;
      r.y += r.vy;

      if (r.x < width * 0.031 || r.x > width - width * 0.031){
        r.vx *= -1;
      }
      if (r.y < height * 0.072 || r.y > height - height * 0.072){
        r.vy *= -1;
      }

      text(r.txt, r.x, r.y);
    });

    fill(180, 0, 0);
    drawButton(width / 2, height * 0.9, "DONE");
  }
}

function drawButton(cx, cy, label) {
  rectMode(CENTER);
  fill(255);
  stroke(255);
  rect(cx, cy, width * 0.09375, height * 0.0605, 8);
  fill(0);
  noStroke();
  text(label, cx, cy + 5);
}

function placeLogo(img, w, h) {
  let tries = 0;
  const maxTries = 100;
  let x, y;
  let valid = false;

  while (!valid && tries < maxTries) {
    x = random(w / 2, width - w / 2);
    y = random(h / 2, height - h / 2);
    valid = true;

    for (let i = 0; i < allLogoPositions.length; i++) {
      let other = allLogoPositions[i];
      let d = dist(x, y, other.x, other.y);
      if (d < minDistance) valid = false;
    }

    if (
      x < width/2 + width * 0.182 &&
      x > width/2 - width * 0.182 &&
      y < height/2 + height * 0.58 &&
      y > height/2 - height * 0.387
    ){
      valid = false;
    }

    tries++;
  }

  if (valid) {
    image(img, x, y, w, h);
    allLogoPositions.push({ x: x, y: y });
  }
}
function showIntro() { 
  fill(255, 20, 147);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(height / 25);
  text("💖 I’ve got a " + chosenEvent + " coming up soon! 💖", width / 2, height * 0.12);
  text("Can you help me get ready? ✨", width / 2, height * 0.18);
  text("Choose an outfit style below:", width / 2, height * 0.30);
  lives();
}

function lives(){
  stroke(255);
  strokeWeight(5);
  fill(255, 20, 147);
  fill(242, 138, 193);
  textSize(height / 30);
  text("Lives:", width - width / 9, height / 19);
  
  let r = height * 0.05;
  ellipse(width - width / 9 - width * 0.087, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 + width * 0.048, height / 8 - height * 0.034, r, r);
  ellipse(width - width / 9 + width * 0.075, height / 8 - height * 0.034, r, r);

}

function showOutfitButtons() {
  noStroke();
  fill(242, 138, 193);
  rect(width / 4, height / 2, width * 0.104, height * 0.07, width * 0.01);
  fill(255);
  textSize(height / 30);
  text("Dress 👗", width / 4, height / 2 + height * 0.012);

  fill(242, 138, 193);
  rect((3 * width) / 4, height / 2, width * 0.104, height * 0.07, width * 0.01);
  fill(255);
  text("Top & Bottoms", (3 * width) / 4, height / 2 + height * 0.012);
}


function showResponse() {
  fill(255, 20, 147);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(height / 30);
  lives();

  if (gameState === "puttingOnDress") {
    closet(dressArray1, dressArray2);
    text("Pick a dress for the " + chosenEvent + " 👗", width / 2, height * 0.15);
    text("Click 'Done' when you're happy!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnTop") {
    closet(topArray1, topArray2);
    text("Pick a cute top for the " + chosenEvent + " 💫", width / 2, height * 0.15);
    text("Then click 'Done' to add bottoms!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnBottoms") {
    closet(bottomsArray1, bottomsArray2);
    text("Great top! Now pick matching bottoms 👖", width / 2, height * 0.15);
    text("Then click 'Done' to pick shoes!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnShoes") {
    closet(shoesArray1, shoesArray2);
    text("Time to pick some fab shoes 👠", width / 2, height * 0.15);
    text("Then click 'Done' to style hair 💇‍♀️", width / 2, height * 0.21);
  } else if (gameState === "puttingOnHair") {
    closet(hairArray1, hairArray2);
    text("Hair time! What style screams Barbie? 💁‍♀️", width / 2, height * 0.15);
    text("Click 'Done' to do makeup 💄", width / 2, height * 0.21);
  } else if (gameState === "makeupLipstick") {
    closet(lipstickArray1, lipstickArray2);
    text("Start makeup: Apply lipstick 💄", width / 2, height * 0.15);
    text("Click 'Done' to continue!", width / 2, height * 0.21);
  } else if (gameState === "makeupEyeshadow") {
    closet(eyeShadowArray1, eyeShadowArray2);
    text("Add eyeshadow 💜", width / 2, height * 0.15);
    text("Click 'Done' to continue!", width / 2, height * 0.21);
  } else if (gameState === "makeupMascara") {
    closet(mascaraArray1, mascaraArray2);
    text("Add mascara for glam lashes 🖤", width / 2, height * 0.15);
    text("Click 'Done' to continue!", width / 2, height * 0.21);
  } else if (gameState === "makeupBlush") {
    closet(blushArray1, blushArray2);
    text("Finish with blush for rosy cheeks 💕", width / 2, height * 0.15);
    text("Click 'Done' to finish the look!", width / 2, height * 0.21);
  } else if (gameState === "done") {
    text("I'm all set for the " + chosenEvent + "! 💖", width / 2, height * 0.17);
    text("Thanks for the help", width / 2, height * 0.22);
  }
}

function showDoneButton() { 
  if (
    gameState === "puttingOnDress"   || gameState === "puttingOnTop" ||
    gameState === "puttingOnBottoms"   || gameState === "puttingOnShoes" ||
    gameState === "puttingOnHair"    || gameState === "makeupLipstick" ||
    gameState === "makeupEyeshadow"  || gameState === "makeupMascara" ||
    gameState === "makeupBlush"
  ) {
    fill(247, 228, 238);
    strokeWeight(2);
    rect(width / 2, height - height / 8, width * 0.052, height * 0.048); // 100x40 on 1920x827
    fill(242, 138, 193);
    text('Done', width / 2, height - height / 8);
  }
}

function closet(array1, array2){
  fill(250, 212, 235);
  stroke(255, 71, 183);
  strokeWeight(5);
  rect(width / 9, height / 2, width / 6, height - height / 4);

  fill(250, 212, 235);
  stroke(255, 71, 183);
  strokeWeight(5);
  rect(width - width / 9, height / 2, width / 6, height - height / 4);
  
  let itemHeight = height / 6;
  let spacing = height * 0.145;
  let startY = (height / 2 - height / 3.5);

  for (var i = 0; i < array1.length; i++){
    image(array1[i], width / 9, startY + (spacing * i), width / 9, itemHeight);
  }

  for (var i = 0; i < array2.length; i++){
    image(array2[i], width - width / 9, startY + (spacing * i), width / 9, itemHeight);
  }
}

function mousePressed() {
  // intro clicks
  if (gameState === "introPrompt") {
    // Corrected comparison: use '==='
    if (inside(mouseX, mouseY, width / 2 - width * 0.0625, height * 0.6)) {
      gameState = "rulesPrompt";
      return;
    }
    // Corrected comparison: use '==='
    if (inside(mouseX, mouseY, width / 2 + width * 0.0625, height * 0.6)) {
      gameState = "noOption";
      return;
    }
  } else if (gameState === "noOption") {
    // Corrected comparison: use '==='
    if (inside(mouseX, mouseY, width / 2, height * 0.6)) {
      gameState = "rulesPrompt";
      return;
    }
  } else if (gameState === "rulesPrompt") {
    // Corrected comparison: use '==='
    if (inside(mouseX, mouseY, width / 2, height * 0.6)) {
      gameState = "showingRules";
      activeRules = [];
      rulesIndex = 0;
      return;
    }
  } else if (gameState === "showingRules") {
    // Corrected comparison: use '==='
    if (inside(mouseX, mouseY, width / 2, height * 0.9)) {
      gameState = "start";
      return;
    } // hand off to pink world
  }

  // barbie world clicks
  // done button specifics
  const btnX = width / 2;
  const btnY = height - height / 8;
  const btnW = width * 0.052; // 100px
  const btnH = height * 0.048; // 40px

  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2
  ) {
    nextStage();
    // fill with that pink
  }

  if (
    gameState === "start" &&
    mouseX > width / 4 - width * 0.052 &&
    mouseX < width / 4 + width * 0.052 &&
    mouseY > height / 2 - height * 0.036 &&
    mouseY < height / 2 + height * 0.036
  ) {
    playerChoice = "Dress";
    gameState = "puttingOnDress";

    fill(247, 215, 233);
    rect(width / 4, height / 2, width * 0.104, height * 0.072); // 200x60
    rect((3 * width) / 4, height / 2, width * 0.104, height * 0.072);
  }

  if (
    gameState === "start" &&
    mouseX > (3 * width) / 4 - width * 0.052 &&
    mouseX < (3 * width) / 4 + width * 0.052 &&
    mouseY > height / 2 - height * 0.036 &&
    mouseY < height / 2 + height * 0.036
  ) {
    playerChoice = "Top & Bottoms";
    gameState = "puttingOnTop";

    fill(247, 215, 233);
    rect(width / 4, height / 2, width * 0.104, height * 0.072);
    rect((3 * width) / 4, height / 2, width * 0.104, height * 0.072);
  }

  let itemHeight = height / 6;
  let spacing = height * 0.145;
  let startY = height / 2 - height / 3.5;

  // Logic for selecting tops when in "puttingOnTop" state
  if (gameState === "puttingOnTop") {
    // Check for clicks on tops in the left array (topArray1)
    for (let i = 0; i < topArray1.length; i++) {
      let currentTopX = width / 9;
      let currentTopY = startY + spacing * i;
      let currentTopWidth = width / 9;
      let currentTopHeight = itemHeight;

      if (
        mouseX > currentTopX - currentTopWidth / 2 &&
        mouseX < currentTopX + currentTopWidth / 2 &&
        mouseY > currentTopY - currentTopHeight / 2 &&
        mouseY < currentTopY + currentTopHeight / 2
      ) {

        noStroke()
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = topArray1[i];
        selectedClothes = "yay" 
        // Set the selected top image
        // You can add a visual highlight here if you want
        return; // Exit function after handling click
      }
    }

    // Check for clicks on tops in the right array (topArray2)
    for (let i = 0; i < topArray2.length; i++) {
      let currentTopX = width - width / 9;
      let currentTopY = startY + spacing * i;
      let currentTopWidth = width / 9;
      let currentTopHeight = itemHeight;

      if (
        mouseX > currentTopX - currentTopWidth / 2 &&
        mouseX < currentTopX + currentTopWidth / 2 &&
        mouseY > currentTopY - currentTopHeight / 2 &&
        mouseY < currentTopY + currentTopHeight / 2
      ) {

        noStroke()
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = topArray2[i]; 
        selectedClothes = "yay" 
        // Set the selected top image
        // You can add a visual highlight here if you want
        return; // Exit function after handling click
      }
    }
  }
}


function nextStage() {
  if (gameState === "puttingOnDress")        gameState = "puttingOnShoes";
  else if (gameState === "puttingOnTop")     gameState = "puttingOnBottoms";
  else if (gameState === "puttingOnBottoms")   gameState = "puttingOnShoes";
  else if (gameState === "puttingOnShoes")   gameState = "puttingOnHair";
  else if (gameState === "puttingOnHair")    gameState = "makeupLipstick";
  else if (gameState === "makeupLipstick")   gameState = "makeupEyeshadow";
  else if (gameState === "makeupEyeshadow")  gameState = "makeupMascara";
  else if (gameState === "makeupMascara")    gameState = "makeupBlush";
  else if (gameState === "makeupBlush")      gameState = "done";
}

function inside(mx, my, cx, cy, w = width * 0.09375, h = height * 0.0604) { // 180x50
  return mx > cx - w / 2 && mx < cx + w / 2 &&
         my > cy - h / 2 && my < cy + h / 2;
}
