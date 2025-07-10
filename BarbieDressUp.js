//move done button, make pink rectangle appear over whole outfit for hair

let startY;
let itemHeight;

let gameState = "introPrompt";
let selectedTopImage = null;
let selectedHairImage = null;
let selectedBottomImage = null; // NEW: For selected bottom image

let selectedClothes = null;

let selectedItem; // This variable seems unused currently, you might want to remove it if not needed

// New variables for the selection message
let showTopSelectionMessage = false;
let showHairSelectionMessage = false;
let showBottomSelectionMessage = false; // NEW: For bottom selection message


let selectionMessageStartTime = 0;
let messageDuration = 2000; // 2 seconds in milliseconds (was 5 seconds in your comment, but 2000ms in code)


let selectedTopItemName = ""; // To store the name of the selected top
let selectedHairItemName = ""; // To store the name of the selected top
let selectedBottomItemName = ""; // NEW: To store the name of the selected bottom


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

let chosenEvent = "";
let playerChoice = "";

let barbie1, barbie2, barbie3;
let model;
let barbieCount = 0;
let allLogoPositions = [];
let minDistance;

// Instead of individual image variables, use an array of objects
let topsData = [];
let hairData = [];
let bottomData = []; // NEW: For bottom data

let dressArray1 = [];
let dressArray2 = [];
let topsArray1 = []; // Will hold objects with img and name
let topsArray2 = []; // Will hold objects with img and name
let bottomsArray1 = []; // NEW: Will hold objects with img and name
let bottomsArray2 = []; // NEW: Will hold objects with img and name
let shoesArray1 = [];
let shoesArray2 = [];
let hairArray1 = [];
let hairArray2 = [];

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
let activeRules = []; // Added for showingRules state
let rulesIndex = 0; // Added for showingRules state

function preload() {
  barbie1 = loadImage('barbie.png');
  barbie2 = loadImage('BarbieLogo2.png');
  barbie3 = loadImage('BarbieLogo3.png');
  model = loadImage('model.png');

  // Load tops and store them with names in topsData
  topsData = [
    { img: loadImage('top1.png'), name: "Too extravagant. Minus one life. 3 lives remaining." },
    { img: loadImage('top2.png'), name: "Too much collarbone. Minus one life. 3 lives remaining." },
    { img: loadImage('top3.png'), name: "Too juvenile. Minus one life. 3 lives remaining." },
    { img: loadImage('top4.png'), name: "Red is suggestive. Minus one life. 3 lives remaining." },
    { img: loadImage('top5.png'), name: "Green doesn't stand out. Minus one life. 6 lives remaining." },
    { img: loadImage('top6.png'), name: "Too much cleavage. Minus one life. 3 lives remaining." },
    { img: loadImage('top7.png'), name: "A tube top is not ladylike. Minus one life. 3 lives remaining." },
    { img: loadImage('top8.png'), name: "Not covered enough. Minus one life. 3 lives remaining." },
    { img: loadImage('top9.png'), name: "Too much midriff. Minus one life. 3 lives remaining." },
    { img: loadImage('top10.png'), name: "Too modest. Minus one life. 3 lives remaining." }
  ];

  hairData = [
    { img: loadImage('hair1.png'), name: "Too messy. Minus one life. 0 lives remaining." },
    { img: loadImage('hair2.png'), name: "Too tight. Minus one life. 0 lives remaining." },
    { img: loadImage('hair3.png'), name: "Looks lazy. Minus one life. 0 lives remaining." },
    { img: loadImage('hair4.png'), name: "Too immature. Minus one life. 0 lives remaining." },
    { img: loadImage('hair5.png'), name: "Not attractive. Minus one life. 0 lives remaining." },
    { img: loadImage('hair6.png'), name: "Looks young. Minus one life. 0 lives remaining." },
    { img: loadImage('hair7.png'), name: "Boring is not ladylike. Minus one life. 0 lives remaining." },
    { img: loadImage('hair8.png'), name: "Too frizzy. Minus one life. 0 lives remaining." },
    { img: loadImage('hair9.png'), name: "Too flat. Minus one life. 0 lives remaining." },
    { img: loadImage('hair10.png'), name: "Too short. Minus one life. 0 lives remaining." }
  ];

  bottomData = [ // NEW: Load bottoms and store them with names in bottomData
    { img: loadImage('bottom1.png'), name: "Too bland. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom2.png'), name: "Too tight. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom3.png'), name: "Too short. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom4.png'), name: "Too low. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom5.png'), name: "Too girly. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom6.png'), name: "Too dreary. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom7.png'), name: "Too suggestive. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom8.png'), name: "Too immature. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom9.png'), name: "Too modest. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom10.png'), name: "Too attention-seeking. Minus one life. 2 lives remaining." }
  ];
}

function setup() {
  // Populate topsArray1 and topsArray2 from topsData
  topsArray1 = topsData.slice(0, 5);
  topsArray2 = topsData.slice(5, 10);

  hairArray1 = hairData.slice(0, 5);
  hairArray2 = hairData.slice(5, 10);

  bottomsArray1 = bottomData.slice(0, 5); // NEW: Populate bottomsArray1
  bottomsArray2 = bottomData.slice(5, 10); // NEW: Populate bottomsArray2


  createCanvas(windowWidth, windowHeight);
  background(247, 215, 233);
  textAlign(CENTER, CENTER);
  textFont('Comic Sans MS');
  chosenEvent = random(eventList);
  imageMode(CENTER);
  rectMode(CENTER);

  minDistance = width * 0.08; //relative to width
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let itemHeight = height / 6.5;

  // Handle the selection message states first, and the new game over state
  if (gameState === "showingTopSelectionMessage") {
    displayTopSelectionMessage();
    return; // Stop drawing other elements while the message is displayed
  }

  if (gameState === "showingHairSelectionMessage") {
    displayHairSelectionMessage();
    return; // Stop drawing other elements while the message is displayed
  }

  if (gameState === "showingBottomSelectionMessage") { // NEW: Handle bottom selection message
    displayBottomSelectionMessage();
    return; // Stop drawing other elements while the message is displayed
  }

  // --- NEW: Handle the game over state ---
  if (gameState === "gameOverLose") {
    background(0); // Black background
    fill(255);       // White text
    textSize(height / 15);
    text("YOU LOSE!", width / 2, height / 2);
    return; // Stop drawing anything else
  }
  // --- END NEW ---

  // This block handles the intro and rule-showing states.
  if (["introPrompt", "noOption", "rulesPrompt", "showingRules"].includes(gameState)) {
    runIntroFlow();
    return; // Stop drawing the rest of the scene if in intro flow
  }

  // DRAW THE SELECTED TOP IMAGE ON THE MODEL (ONLY if not in the hair or bottom phase)
  // This is the ONLY place selectedTopImage should be drawn.
  if (selectedTopImage !== null && gameState !== "puttingOnHair") {
    image(selectedTopImage, width / 2, height / 2.2, width / 10, itemHeight);
  }

//right here 
  // Draw the selected bottom image on the model
  if (selectedBottomImage !== null && gameState !== "puttingOnHair") { // NEW: Draw selected bottom
    image(selectedBottomImage, width / 2, height / 1.53, width / 6.4, itemHeight * 1.8); // Adjust position and size as needed
  }

  // Draw the selected hair image on the model
  if (selectedHairImage !== null) {
    image(selectedHairImage, width / 2, height / 1.7, width / 4, itemHeight * 3);
  }


  // If not in intro flow and no specific clothes are being 'put on', draw the model.
  // The model is drawn here so the chosen top and bottom can appear on top of it.
  if (selectedClothes == null || gameState === "start") {
    image(model, width / 2, height / 2 + height * 0.085, width * 0.21, height * 0.6);
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

function displayTopSelectionMessage() {
  // Draw the black rectangle covering the whole window
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, height);

  // Draw the white text
  fill(255);
  textSize(height / 20); // Adjust text size as needed
  text(selectedTopItemName, width / 2, height / 2);

  // Check if 5 seconds have passed
  if (millis() - selectionMessageStartTime >= messageDuration) {
    showTopSelectionMessage = false;
    background(247, 215, 233);
    gameState = "puttingOnBottoms";
  }
}

function displayBottomSelectionMessage() { // NEW: Function for bottom selection message
  // Draw the black rectangle covering the whole window
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, height);

  // Draw the white text
  fill(255);
  textSize(height / 20); // Adjust text size as needed
  text(selectedBottomItemName, width / 2, height / 2);

  // Check if 5 seconds have passed
  if (millis() - selectionMessageStartTime >= messageDuration) {
    showBottomSelectionMessage = false;
    background(247, 215, 233);
    gameState = "puttingOnShoes"; // Transition to shoes after bottom message
  }
}


function displayHairSelectionMessage() {
  // Draw the black rectangle covering the whole window
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, height);

  // Draw the white text
  fill(255);
  textSize(height / 20); // Adjust text size as needed
  text(selectedHairItemName, width / 2, height / 2);

  // Check if 5 seconds have passed
  if (millis() - selectionMessageStartTime >= messageDuration) {
    showHairSelectionMessage = false;
    // --- MODIFIED: Transition to "gameOverLose" instead of "done" ---
    gameState = "gameOverLose";
    // --- END MODIFICATION ---
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
  } else if (gameState === "noOption") {
    text("Sorry, “No” isn’t an option. Rules were written for you.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Yes");
  } else if (gameState === "rulesPrompt") {
    text("Before we begin, review the Rules.", width / 2, height / 3);
    drawButton(width / 2, height * 0.6, "Rules");
  } else if (gameState === "showingRules") {
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

      if (r.x < width * 0.031 || r.x > width - width * 0.031) {
        r.vx *= -1;
      }
      if (r.y < height * 0.072 || r.y > height - height * 0.072) {
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
      x < width / 2 + width * 0.182 &&
      x > width / 2 - width * 0.182 &&
      y < height / 2 + height * 0.58 &&
      y > height / 2 - height * 0.387
    ) {
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
  textSize(height / 30);
  text("💖 I’ve got a " + chosenEvent + " coming up soon! 💖", width / 2, height * 0.12);
  text("Can you help me get ready? ✨", width / 2, height * 0.18);
  text("Choose an outfit style below:", width / 2, height * 0.30);
}

function lives() {
  stroke(255);
  strokeWeight(5);
  fill(255, 20, 147);
  fill(242, 138, 193);
  textSize(height / 30);
  text("Lives:", width - width / 8, height / 19);

  let r = height * 0.05;

  if (gameState === "puttingOnTop") {
    ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  if (gameState === "puttingOnDress" || gameState === "puttingOnBottoms") {
    noStroke()
    fill(247, 215, 233);
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(242, 138, 193)
    //ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  if (gameState === "puttingOnShoes") {
    noStroke()
    fill(247, 215, 233);
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    rect(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r)
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(242, 138, 193)
    //ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    //ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  if (gameState === "puttingOnHair") {
    noStroke()
    fill(247, 215, 233);
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    rect(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r)
    rect(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(186, 4, 25)
    //ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    //ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    //ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

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

  if (gameState === "puttingOnDress") {
    lives();
    closet(dressArray1, dressArray2);
    text("Pick a dress for the " + chosenEvent + " 👗", width / 2, height * 0.15);
    text("Click 'Done' when you're happy!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnTop") {
    lives();
    closet(topsArray1, topsArray2); // Use topsArray1 and topsArray2
    text("Pick a cute top for the " + chosenEvent + " 💫", width / 2, height * 0.15);
    text("Then click 'Done' to add bottoms!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnBottoms") {
    lives();
    closet(bottomsArray1, bottomsArray2); // NEW: Use bottomsArray1 and bottomsArray2
    text("Great top! Now pick matching bottoms 👖", width / 2, height * 0.15);
    text("Then click 'Done' to pick shoes!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnShoes") {
    lives();
    closet(shoesArray1, shoesArray2);
    text("Time to pick some fab shoes 👠", width / 2, height * 0.15);
    text("Then click 'Done' to style hair 💇‍♀️", width / 2, height * 0.21);
  } else if (gameState === "puttingOnHair") {
    lives();
    closet(hairArray1, hairArray2);
    text("Hair time! What style screams Barbie? 💁‍♀️", width / 2, height * 0.15);
    text("Click 'Done' to finish!", width / 2, height * 0.21);
  } else if (gameState === "done") {
    // This 'done' state will now typically only be reached if your game logic
    // for losing lives is changed, or if you introduce a "win" condition.
    // As per your latest request, after hair, it leads to "gameOverLose".
    lives(); // Still call lives, though they might all be "lost" or not drawn
    text("I'm all set for the " + chosenEvent + "! 💖", width / 2, height * 0.17);
    text("Thanks for the help", width / 2, height * 0.22);
    // This is where you would list reasons for losing if you didn't end on a separate "YOU LOSE!" screen
  }
}

function showDoneButton() {
  if (
    gameState === "puttingOnDress" ||
    gameState === "puttingOnTop" ||
    gameState === "puttingOnBottoms" ||
    gameState === "puttingOnShoes" ||
    gameState === "puttingOnHair"
  ) {
    fill(247, 228, 238);
    strokeWeight(2);
    rect(width / 2, height - height / 8, width * 0.052, height * 0.048); // 100x40 on 1920x827
    fill(242, 138, 193);
    text('Done', width / 2, height - height / 8);
  }
}

function closet(array1, array2) {
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

  // Loop through objects to draw images
  for (var i = 0; i < array1.length; i++) {
    // Check if the array contains objects (like topsArray1/2, bottomsArray1/2, hairArray1/2) or just images
    if (array1[i].img) {
      image(array1[i].img, width / 9, startY + (spacing * i), width / 9, itemHeight);
    } else {
      image(array1[i], width / 9, startY + (spacing * i), width / 9, itemHeight);
    }
  }

  for (var i = 0; i < array2.length; i++) {
    // Check if the array contains objects (like topsArray1/2, bottomsArray1/2, hairArray1/2) or just images
    if (array2[i].img) {
      image(array2[i].img, width - width / 9, startY + (spacing * i), width / 9, itemHeight);
    } else {
      image(array2[i], width - width / 9, startY + (spacing * i), width / 9, itemHeight);
    }
  }
}

function mousePressed() {
  // intro clicks
  if (gameState === "introPrompt") {
    if (inside(mouseX, mouseY, width / 2 - width * 0.0625, height * 0.6)) {
      gameState = "rulesPrompt";
      return;
    }
    if (inside(mouseX, mouseY, width / 2 + width * 0.0625, height * 0.6)) {
      gameState = "noOption";
      return;
    }
  } else if (gameState === "noOption") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6)) {
      gameState = "rulesPrompt";
      return;
    }
  } else if (gameState === "rulesPrompt") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6)) {
      gameState = "showingRules";
      activeRules = [];
      rulesIndex = 0;
      return;
    }
  } else if (gameState === "showingRules") {
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

  // Check for Done button click (only if not in a message state or game over state)
  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2 &&
    !showTopSelectionMessage && // Don't allow clicks during message display
    !showHairSelectionMessage && // Don't allow clicks during message display
    !showBottomSelectionMessage && // NEW: Don't allow clicks during bottom message display
    gameState !== "gameOverLose" // Don't allow clicks if game is over
  ) {
    nextStage(); // Call nextStage if Done button is clicked
    return; // Crucial: Stop further mousePressed logic once Done is handled
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
  startY = height / 2 - height / 3.5;

  // Logic for selecting tops when in "puttingOnTop" state
  if (gameState === "puttingOnTop") {
    // Check for clicks on tops in the left array (topsArray1 - now array of objects)
    for (let i = 0; i < topsArray1.length; i++) {
      let currentTop = topsArray1[i]; // Get the object containing img and name
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
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = currentTop.img; // Set the selected top image
        selectedTopItemName = currentTop.name; // Set the name of the selected top
        selectedClothes = "yay";
        return; // Exit function after handling click
      }
    }

    // Check for clicks on tops in the right array (topsArray2 - now array of objects)
    for (let i = 0; i < topsArray2.length; i++) {
      let currentTop = topsArray2[i]; // Get the object containing img and name
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
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = currentTop.img; // Set the selected top image
        selectedTopItemName = currentTop.name; // Set the name of the selected top
        selectedClothes = "yay";
        return; // Exit function after handling click
      }
    }
  }

  // NEW: Logic for selecting bottoms when in "puttingOnBottoms" state
  if (gameState === "puttingOnBottoms") {
    // Check for clicks on bottoms in the left array (bottomsArray1)
    for (let i = 0; i < bottomsArray1.length; i++) {
      let currentBottom = bottomsArray1[i]; // Get the object containing img and name
      let currentBottomX = width / 9;
      let currentBottomY = startY + spacing * i;
      let currentBottomWidth = width / 9;
      let currentBottomHeight = itemHeight;

      if (
        mouseX > currentBottomX - currentBottomWidth / 2 &&
        mouseX < currentBottomX + currentBottomWidth / 2 &&
        mouseY > currentBottomY - currentBottomHeight / 2 &&
        mouseY < currentBottomY + currentBottomHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedBottomImage = currentBottom.img; // Set the selected bottom image
        selectedBottomItemName = currentBottom.name; // Set the name of the selected bottom
        selectedClothes = "yay"; // You might want a different variable for bottom selection status
        return; // Exit function after handling click
      }
    }

    // Check for clicks on bottoms in the right array (bottomsArray2)
    for (let i = 0; i < bottomsArray2.length; i++) {
      let currentBottom = bottomsArray2[i]; // Get the object containing img and name
      let currentBottomX = width - width / 9;
      let currentBottomY = startY + spacing * i;
      let currentBottomWidth = width / 9;
      let currentBottomHeight = itemHeight;

      if (
        mouseX > currentBottomX - currentBottomWidth / 2 &&
        mouseX < currentBottomX + currentBottomWidth / 2 &&
        mouseY > currentBottomY - currentBottomHeight / 2 &&
        mouseY < currentBottomY + currentBottomHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedBottomImage = currentBottom.img; // Set the selected bottom image
        selectedBottomItemName = currentBottom.name; // Set the name of the selected bottom
        selectedClothes = "yay"; // You might want a different variable for bottom selection status
        return; // Exit function after handling click
      }
    }
  }


  // --- LOGIC FOR HAIR SELECTION ---
  if (gameState === "puttingOnHair") {
    // Check for clicks on hair in the left array (hairArray1)
    for (let i = 0; i < hairArray1.length; i++) {
      let currentHair = hairArray1[i]; // Get the object containing img and name
      let currentHairX = width / 9;
      let currentHairY = startY + spacing * i;
      let currentHairWidth = width / 9;
      let currentHairHeight = itemHeight;

      if (
        mouseX > currentHairX - currentHairWidth / 2 &&
        mouseX < currentHairX + currentHairWidth / 2 &&
        mouseY > currentHairY - currentHairHeight / 2 &&
        mouseY < currentHairY + currentHairHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedHairImage = currentHair.img; // Set the selected hair image
        selectedHairItemName = currentHair.name; // Set the name of the selected hair
        selectedClothes = "yay"; // You might want a different variable for hair selection status
        return; // Exit function after handling click
      }
    }

    // Check for clicks on hair in the right array (hairArray2)
    for (let i = 0; i < hairArray2.length; i++) {
      let currentHair = hairArray2[i]; // Get the object containing img and name
      let currentHairX = width - width / 9;
      let currentHairY = startY + spacing * i;
      let currentHairWidth = width / 9;
      let currentHairHeight = itemHeight;

      if (
        mouseX > currentHairX - currentHairWidth / 2 &&
        mouseX < currentHairX + currentHairWidth / 2 &&
        mouseY > currentHairY - currentHairHeight / 2 &&
        mouseY < currentHairY + currentHairHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedHairImage = currentHair.img; // Set the selected hair image
        selectedHairItemName = currentHair.name; // Set the name of the selected hair
        selectedClothes = "yay"; // You might want a different variable for hair selection status
        return; // Exit function after handling click
      }
    }
  }
}


function nextStage() {
  if (gameState === "puttingOnTop") {
    // Only proceed if a top has been selected
    if (selectedTopImage !== null) {
      showTopSelectionMessage = true;
      selectionMessageStartTime = millis(); // Record the current time
      gameState = "showingTopSelectionMessage"; // New state to display the message
    } else {
      // Give feedback to the user that they need to select a top
      console.log("Please select a top first!");
      // Add an on-screen message here for the user
    }
  } else if (gameState === "puttingOnBottoms") { // NEW: Handle next stage from bottoms
    if (selectedBottomImage !== null) {
      showBottomSelectionMessage = true;
      selectionMessageStartTime = millis();
      gameState = "showingBottomSelectionMessage";
    } else {
      console.log("Please select a bottom first!");
      // Add an on-screen message here for the user
    }
  } else if (gameState === "puttingOnDress") {
    gameState = "puttingOnShoes";
  } else if (gameState === "puttingOnShoes") {
    gameState = "puttingOnHair";
  } else if (gameState === "puttingOnHair") {
    if (selectedHairImage !== null) { // Check if a hair image has been selected
      showHairSelectionMessage = true;
      selectionMessageStartTime = millis(); // Record the current time
      gameState = "showingHairSelectionMessage"; // Transition to the new message state
    } else {
      console.log("Please select a hairstyle first!"); // Feedback if no hair is selected
      // You can also add an on-screen message here for the user
    }
  }
}

function inside(mx, my, cx, cy, w = width * 0.09375, h = height * 0.0604) { // 180x50
  return mx > cx - w / 2 && mx < cx + w / 2 &&
    my > cy - h / 2 && my < cy + h / 2;
}