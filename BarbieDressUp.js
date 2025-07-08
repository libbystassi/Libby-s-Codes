
let gameState = "introPrompt";  

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
let barbieCount = 0;
let allLogoPositions = [];
let minDistance = 100;

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

const ruleSpeedRange = 1.8

function preload() {
  barbie1 = loadImage('barbie.png');
  barbie2 = loadImage('BarbieLogo2.png');
  barbie3 = loadImage('BarbieLogo3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 180, 220);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont('Comic Sans MS');
  chosenEvent = random(eventList);
  imageMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  if (["introPrompt", "noOption", "rulesPrompt", "showingRules"].includes(gameState)) {
    //if this array includes our intro state variable
    runIntroFlow();               
    return;                       
  }

  if (barbieCount === 0 || barbieCount === 400) {
    background(255, 180, 220);
    allLogoPositions = [];
    barbieCount = 0;
  }

  if (barbieCount % 25 === 0) {
    placeLogo(barbie1, 100, 100);
    placeLogo(barbie2, 100, 100);
    placeLogo(barbie3, 150, 100);
  }
  barbieCount++;

  stroke(227, 20, 131);
  strokeWeight(10);
  fill(255, 180, 220);
  rect(width / 2, 160, 760, 250);

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

  //1. Accept the challenge
  if (gameState === "introPrompt") {
    text("Do you accept the Feminine Challenge?", width / 2, height / 3);

    drawButton(width / 2 - 120, height * 0.6, "Yes");
    drawButton(width / 2 + 120, height * 0.6, "No");
  }

  //2. No isn’t an option
  else if (gameState === "noOption") {
    text("Sorry, “No” isn’t an option.\nRules were written for you.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Yes");
  }

  //3. Prompt to read rules
  else if (gameState === "rulesPrompt") {
    text("Before we begin, review the Rules.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Read Rules");
  }

  //4. Storm of contradictory rules
  else if (gameState === "showingRules") {
    // introduce a new rule every 3 frames (until all are on screen)
    if (frameCount % 3 === 0 && rulesIndex < ruleBank.length) {
      activeRules.push({
        txt: ruleBank[rulesIndex],
        x: random(60, width - 60),
        y: random(60, height - 60),
        vx: random(-ruleSpeedRange, ruleSpeedRange),
        vy: random(-ruleSpeedRange, ruleSpeedRange)
      });
      rulesIndex++;
    }

    // animate and draw every active rule
    //cool r loop thing I discovered for arrays
    activeRules.forEach(r => {
      // move
      r.x += r.vx;
      r.y += r.vy;

      // bounce inside safe bounds
      if (r.x < 60 || r.x > width - 60){
        r.vx *= -1;
      }
      if (r.y < 60 || r.y > height - 60){
        r.vy *= -1;
      }

      text(r.txt, r.x, r.y);
    });

    // DONE button
    fill(180, 0, 0);
    drawButton(width / 2, height * 0.9, "DONE");
  }
}

function drawButton(cx, cy, label) {
  rectMode(CENTER);
  fill(255);
  stroke(255);
  rect(cx, cy, 180, 50, 8);
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
    tries++;
  }

  if (valid) {
    image(img, x, y, w, h);
    allLogoPositions.push({ x: x, y: y });
    //pushing the x and y values as one character in the array
  }
}

function showIntro() {
  fill(255, 20, 147);
  noStroke();
  textAlign(CENTER, CENTER);
  text("💖 I’ve got a " + chosenEvent + " coming up soon! 💖", width / 2, 100);
  text("Can you help me get ready? ✨", width / 2, 150);
  text("Choose an outfit style below:", width / 2, 250);
}

function showOutfitButtons() {
  // Dress button – left
  fill(242, 138, 193);
  rect(width / 4, height / 2, 200, 60, 20);
  fill(255);
  text("Dress 👗", width / 4, height / 2 + 10);

  // Top & Pants button – right
  fill(242, 138, 193);
  rect((3 * width) / 4, height / 2, 200, 60, 20);
  fill(255);
  text("Top & Pants 💫", (3 * width) / 4, height / 2 + 10);
}

function showResponse() {
  fill(255, 20, 147);
  noStroke();
  textAlign(CENTER, CENTER);

  if (gameState === "puttingOnDress") {
    text("Pick a dress for the " + chosenEvent + " 👗", width / 2, 125);
    text("Click 'Done' when you're happy!", width / 2, 170);
  } else if (gameState === "puttingOnTop") {
    text("Pick a cute top for the " + chosenEvent + " 💫", width / 2, 125);
    text("Then click 'Done' to add pants!", width / 2, 170);
  } else if (gameState === "puttingOnPants") {
    text("Great top! Now pick matching pants 👖", width / 2, 125);
    text("Then click 'Done' to pick shoes!", width / 2, 170);
  } else if (gameState === "puttingOnShoes") {
    text("Time to pick some fab shoes 👠", width / 2, 125);
    text("Then click 'Done' to style hair 💇‍♀️", width / 2, 170);
  } else if (gameState === "puttingOnHair") {
    text("Hair time! What style screams Barbie? 💁‍♀️", width / 2, 125);
    text("Click 'Done' to do makeup 💄", width / 2, 170);
  } else if (gameState === "makeupLipstick") {
    text("Start makeup: Apply lipstick 💄", width / 2, 125);
    text("Click 'Done' to continue!", width / 2, 170);
  } else if (gameState === "makeupEyeshadow") {
    text("Add eyeshadow 💜", width / 2, 125);
    text("Click 'Done' to continue!", width / 2, 170);
  } else if (gameState === "makeupMascara") {
    text("Add mascara for glam lashes 🖤", width / 2, 125);
    text("Click 'Done' to continue!", width / 2, 170);
  } else if (gameState === "makeupBlush") {
    text("Finish with blush for rosy cheeks 💕", width / 2, 125);
    text("Click 'Done' to finish the look!", width / 2, 170);
  } else if (gameState === "done") {
    text("I'm all set for the " + chosenEvent + "! 💖", width / 2, 140);
    text("Thanks for the help", width / 2, 180);
  }
}

function showDoneButton() {
  if (
    gameState === "puttingOnDress"   || gameState === "puttingOnTop" ||
    gameState === "puttingOnPants"   || gameState === "puttingOnShoes" ||
    gameState === "puttingOnHair"    || gameState === "makeupLipstick" ||
    gameState === "makeupEyeshadow"  || gameState === "makeupMascara" ||
    gameState === "makeupBlush"
  ) {
    fill(247, 228, 238);
    strokeWeight(2);
    rect(width / 2, height - height / 4, 100, 40);
    fill(242, 138, 193);
    text('Done', width / 2, (height - height / 4) + 10);
  }
}

function mousePressed() {
//intro clicks
  if (gameState === "introPrompt") {
    if (inside(mouseX, mouseY, width / 2 - 120, height * 0.6))
      { gameState = "rulesPrompt"; return; }
    if (inside(mouseX, mouseY, width / 2 + 120, height * 0.6))
      { gameState = "noOption";   return; }
  }
  else if (gameState === "noOption") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6))
      { gameState = "rulesPrompt"; return; }
  }
  else if (gameState === "rulesPrompt") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6)) {
      gameState   = "showingRules";
      activeRules = [];
      rulesIndex  = 0;
      return;
    }
  }
  else if (gameState === "showingRules") {
    if (inside(mouseX, mouseY, width / 2, height * 0.9))
      { gameState = "start"; return; }   // hand off to pink world
  }

  //barbie world clicks
  //done button specifics. constant because it doenst change
  const btnX = width / 2;
  const btnY = height - height / 4;
  const btnW = 100;
  const btnH = 40;

  if (
    mouseX > btnX - btnW / 2 && mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2
  ) {
    nextStage();
  }

  if (
    gameState === "start" &&
    mouseX > width / 4 - 100 && mouseX < width / 4 + 100 &&
    mouseY > height / 2 - 30 && mouseY < height / 2 + 30
  ) {
    playerChoice = "Dress";
    gameState = "puttingOnDress";
  }

  if (
    gameState === "start" &&
    mouseX > (3 * width) / 4 - 100 && mouseX < (3 * width) / 4 + 100 &&
    mouseY > height / 2 - 30 && mouseY < height / 2 + 30
  ) {
    playerChoice = "Top & Pants";
    gameState = "puttingOnTop";
  }
}

function nextStage() {
  if (gameState === "puttingOnDress")        gameState = "puttingOnShoes";
  else if (gameState === "puttingOnTop")     gameState = "puttingOnPants";
  else if (gameState === "puttingOnPants")   gameState = "puttingOnShoes";
  else if (gameState === "puttingOnShoes")   gameState = "puttingOnHair";
  else if (gameState === "puttingOnHair")    gameState = "makeupLipstick";
  else if (gameState === "makeupLipstick")   gameState = "makeupEyeshadow";
  else if (gameState === "makeupEyeshadow")  gameState = "makeupMascara";
  else if (gameState === "makeupMascara")    gameState = "makeupBlush";
  else if (gameState === "makeupBlush")      gameState = "done";
}


function inside(mx, my, cx, cy, w = 180, h = 50) {
  return mx > cx - w / 2 && mx < cx + w / 2 &&
         my > cy - h / 2 && my < cy + h / 2;
}
