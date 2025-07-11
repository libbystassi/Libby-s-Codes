
//go thru comments to check

let startY;
let itemHeight; // This is a general itemHeight. Specific items might have different display heights.

let gameState = "introPrompt";
let selectedTopImage = null;
let selectedHairImage = null;
let selectedDressImage = null; // Variable for the selected dress image
let selectedBottomImage = null;
let selectedShoesImage = null;

let selectedClothes = null;

// New variables for the selection message
let showTopSelectionMessage = false;
let showHairSelectionMessage = false;
let showBottomSelectionMessage = false;
let showDressSelectionMessage = false; 
let showShoesSelectionMessage = false
// Variable for dress selection message

let selectionMessageStartTime = 0;
let messageDuration = 2000; 

let selectedTopItemName = ""; // To store the name of the selected top
let selectedHairItemName = ""; // To store the name of the selected top
let selectedBottomItemName = ""; // To store the name of the selected bottom
let selectedDressItemName = ""; // To store the name of the selected dress
let selectedShoeItemName = "";

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
let bottomData = [];
let dressData = []; // Array to hold dress data
let shoesData = []; // Data for shoes

let dressArray1 = []; // Will hold objects with img and name for dresses
let dressArray2 = []; // Will hold objects with img and name for dresses
let topsArray1 = []; // Will hold objects with img and name
let topsArray2 = []; // Will hold objects with img and name
let bottomsArray1 = []; // Will hold objects with img and name
let bottomsArray2 = []; // Will hold objects with img and name
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
    { img: loadImage('top3.png'), name: "Too immature. Minus one life. 3 lives remaining." },
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
    { img: loadImage('hair7.png'), name: "Too boring. Minus one life. 0 lives remaining." },
    { img: loadImage('hair8.png'), name: "Too frizzy. Minus one life. 0 lives remaining." },
    { img: loadImage('hair9.png'), name: "Too flat. Minus one life. 0 lives remaining." },
    { img: loadImage('hair10.png'), name: "Too short. Minus one life. 0 lives remaining." }
  ];

  bottomData = [
    { img: loadImage('bottom1.png'), name: "Too bland. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom2.png'), name: "Too tight. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom3.png'), name: "Too short. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom4.png'), name: "Too low. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom5.png'), name: "Too girly. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom6.png'), name: "Too dark. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom7.png'), name: "Too suggestive. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom8.png'), name: "Too immature. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom9.png'), name: "Too modest. Minus one life. 2 lives remaining." },
    { img: loadImage('bottom10.png'), name: "Too attention-seeking. Minus one life. 2 lives remaining." }
  ];

  // Load dresses and store them with names in dressData
  dressData = [
    { img: loadImage('dress1.png'), name: "Too bland. Minus one life. 2 lives remaining." },
    { img: loadImage('dress2.png'), name: "Too tight. Minus one life. 2 lives remaining." },
    { img: loadImage('dress3.png'), name: "Too short. Minus one life. 2 lives remaining." },
    { img: loadImage('dress4.png'), name: "Too low. Minus one life. 2 lives remaining." },
    // Add more dresses as needed
  ];

  // Load shoes data 
  shoesData = [
    { img: loadImage('shoes1.png'), name: "Too high. Minus one life. 1 life remaining." },
    { img: loadImage('shoes2.png'), name: "Too flashy. Minus one life. 1 life remaining." },
    { img: loadImage('shoes3.png'), name: "Too flat. Minus one life. 1 life remaining." },
    { img: loadImage('shoes4.png'), name: "Too casual. Minus one life. 1 life remaining." },
    { img: loadImage('shoes5.png'), name: "Too boring. Minus one life. 1 life remaining." },
    { img: loadImage('shoes6.png'), name: "Too basic. Minus one life. 1 life remaining." },
  ];
}

function setup() {
  // Populate topsArray1 and topsArray2 from topsData
  topsArray1 = topsData.slice(0, 5);
  topsArray2 = topsData.slice(5, 10);

  hairArray1 = hairData.slice(0, 5);
  hairArray2 = hairData.slice(5, 10);

  bottomsArray1 = bottomData.slice(0, 5);
  bottomsArray2 = bottomData.slice(5, 10);

  // Populate dressArray1 and dressArray2 from dressData
  dressArray1 = dressData.slice(0, Math.ceil(dressData.length / 2));
  dressArray2 = dressData.slice(Math.ceil(dressData.length / 2));

  // Populate shoesArray1 and shoesArray2 from shoesData
  shoesArray1 = shoesData.slice(0, 3);
  shoesArray2 = shoesData.slice(3, 6);

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
  itemHeight = height / 6.5; // Re-define itemHeight for general use in draw

  // Handle the selection message states first, and the new game over state
  if (gameState === "showingTopSelectionMessage") {
    displayTopSelectionMessage();
    return;
  }

  if (gameState === "showingHairSelectionMessage") {
    displayHairSelectionMessage();
    return;
  }

  if (gameState === "showingBottomSelectionMessage") {
    displayBottomSelectionMessage();
    return;
  }

  if (gameState === "showingDressSelectionMessage") {
    displayDressSelectionMessage();
    return;
  }

  if (gameState === "showingShoesSelectionMessage") {
    displayShoesSelectionMessage();
    return;
  }

  // --- Handle the game over state ---
  if (gameState === "gameOverLose") {
    background(0); // Black background
    fill(255);      // White text
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

  // Barbie logo animation in the background (moved up so it's always behind)
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

  // *** MODIFIED LOGIC FOR MODEL AND CLOTHING DISPLAY ***

  // Only draw the model if in the "start" state (before any clothes are picked)
  if (gameState === "start") {
    image(model, width / 2, height / 2 + height * 0.085, width * 0.21, height * 0.6);
  }

  // Draw the selected dress if it's not null (regardless of other items)
  if (selectedDressImage !== null) {
    // Adjust these coordinates and dimensions to fit the dress in the model's position
    image(selectedDressImage, width / 2, 1.9*(height / 3), width * 0.15, height * 0.36);
  }

  // Draw selected top and bottom only if a dress hasn't been selected
  if (selectedDressImage === null) {
    if (selectedTopImage !== null) {
      image(selectedTopImage, width / 2, height / 1.84, width / 10, itemHeight);
    }

    if (selectedBottomImage !== null) {
      image(selectedBottomImage, width / 2, height / 1.37, width / 6.4, itemHeight * 1.8);
    }
  }

  // Draw selected shoes and hair (these should always appear if selected)
  if (selectedShoesImage !== null) {
    image(selectedShoesImage, width / 2, height / 1.14, width / 23, height / 9);
  }

  if (selectedHairImage !== null) {
    image(selectedHairImage, width / 2, height / 2.3, width / 13, itemHeight);
  }

  // *** END MODIFIED LOGIC ***

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

function displayBottomSelectionMessage() {
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

function displayDressSelectionMessage() { // Function for dress selection message
  // Draw the black rectangle covering the whole window
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, height);

  // Draw the white text
  fill(255);
  textSize(height / 20); // Adjust text size as needed
  text(selectedDressItemName, width / 2, height / 2);

  // Check if 5 seconds have passed
  if (millis() - selectionMessageStartTime >= messageDuration) {
    showDressSelectionMessage = false;
    background(247, 215, 233);
    gameState = "puttingOnShoes"; // Transition to shoes after dress message
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
    gameState = "gameOverLose"; // Transition to "gameOverLose" instead of "done"
  }
}

function displayShoesSelectionMessage() { // Function for shoes selection message
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, height);
  fill(255);
  textSize(height / 20);
  text(selectedShoesItemName, width / 2, height / 2);

  if (millis() - selectionMessageStartTime >= messageDuration) {
    showShoesSelectionMessage = false;
    background(247, 215, 233);
    gameState = "puttingOnHair"; // Transition to hair after shoes message
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

  // Lives for top or dress selection (starting state, 4 lives)
  if (gameState === "puttingOnTop" || gameState === "puttingOnDress") {
    ellipse(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  // Lives for bottoms selection (3 lives remaining)
  if (gameState === "puttingOnBottoms") {
    noStroke()
    fill(247, 215, 233); // Clear the leftmost circle
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(242, 138, 193)
    ellipse(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  // Lives for shoes selection (2 lives remaining)
  if (gameState === "puttingOnShoes") {
    noStroke()
    fill(247, 215, 233); // Clear the two leftmost circles
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    rect(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r)
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(242, 138, 193)
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
    ellipse(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
  }

  // Lives for hair selection (1 life remaining)
  if (gameState === "puttingOnHair") {
    noStroke()
    fill(247, 215, 233); // Clear the three leftmost circles
    rect(width - width / 9 - width * 0.060, height / 8 - height * 0.034, r, r);
    rect(width - width / 9 + width * 0.021, height / 8 - height * 0.034, r, r)
    rect(width - width / 9 - width * 0.033, height / 8 - height * 0.034, r, r);
    stroke(255);
    strokeWeight(5);
    fill(255, 20, 147);
    fill(186, 4, 25)
    ellipse(width - width / 9 - width * 0.006, height / 8 - height * 0.034, r, r);
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
    closet(dressArray1, dressArray2); // Use dress arrays
    text("Pick a dress for the " + chosenEvent + " 👗", width / 2, height * 0.15);
    text("Click 'Done' when you're happy!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnTop") {
    lives();
    closet(topsArray1, topsArray2);
    text("Pick a cute top for the " + chosenEvent + " 💫", width / 2, height * 0.15);
    text("Then click 'Done' to add bottoms!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnBottoms") {
    lives();
    closet(bottomsArray1, bottomsArray2);
    text("Great top! Now pick matching bottoms 👖", width / 2, height * 0.15);
    text("Then click 'Done' to pick shoes!", width / 2, height * 0.21);
  } else if (gameState === "puttingOnShoes") {
    lives();
    closet(shoesArray1, shoesArray2); // Pass shoes arrays to closet
    text("Time to pick some fab shoes 👠", width / 2, height * 0.15);
    text("Then click 'Done' to style hair 💇‍♀️", width / 2, height * 0.21);
  } else if (gameState === "puttingOnHair") {
    lives();
    closet(hairArray1, hairArray2);
    text("Hair time! What style screams Barbie? 💁‍♀️", width / 2, height * 0.15);
    text("Click 'Done' to finish!", width / 2, height * 0.21);
  } else if (gameState === "done") {
    lives();
    text("I'm all set for the " + chosenEvent + "! 💖", width / 2, height * 0.17);
    text("Thanks for the help", width / 2, height * 0.22);
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
    rect(width / 3, height - height / 8, width * 0.052, height * 0.048);
    fill(242, 138, 193);
    text('Done', width / 3, height - height / 8);
  }
}

function nextStage() {
  // Check if a dress was selected, if not, check if a top was selected
  if (gameState === "puttingOnDress" && selectedDressImage !== null) {
    gameState = "showingDressSelectionMessage";
    selectionMessageStartTime = millis();
  } else if (gameState === "puttingOnTop" && selectedTopImage !== null) {
    gameState = "showingTopSelectionMessage";
    selectionMessageStartTime = millis();
  } else if (gameState === "puttingOnBottoms" && selectedBottomImage !== null) {
    gameState = "showingBottomSelectionMessage";
    selectionMessageStartTime = millis();
  } else if (gameState === "puttingOnShoes" && selectedShoesImage !== null) {
    gameState = "showingShoesSelectionMessage";
    selectionMessageStartTime = millis();
  } else if (gameState === "puttingOnHair" && selectedHairImage !== null) {
    gameState = "showingHairSelectionMessage";
    selectionMessageStartTime = millis();
  } else {
    // Optionally, give a hint to the player if no item is selected
    // For now, it will just not change state if nothing is selected
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

  let defaultItemHeight = height / 6; // Base height for most items
  let spacing = height * 0.145;
  startY = height / 2 - height / 3.5;

  // Check if the current items are dresses
  if (gameState === "puttingOnDress") {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] && array1[i].img) {
        // Apply different dimensions for dresses (taller and slightly wider)
        image(array1[i].img, width / 9, (2 * startY) + (2 * (spacing * i)), width / 9, defaultItemHeight * 1.7);
      }
    }

    for (let i = 0; i < array2.length; i++) {
      if (array2[i] && array2[i].img) {
        // Apply different dimensions for dresses
        image(array2[i].img, width - width / 9, (2 * startY) + (2 * (spacing * i)), width / 9, defaultItemHeight * 1.5);
      }
    }
  } else if (gameState === "puttingOnShoes") { // Condition for shoes
    let shoeWidth = width / 22; // Example: narrower for shoes
    let shoeHeight = height / 5; // Example: shorter for shoes
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] && array1[i].img) {
        image(array1[i].img, width / 9, startY + (1.8*(spacing * i)), shoeWidth, shoeHeight);
      }
    }
    for (let i = 0; i < array2.length; i++) {
      if (array2[i] && array2[i].img) {
        image(array2[i].img, width - width / 9, startY + (1.8*(spacing * i)), shoeWidth, shoeHeight);
      }
    }
  } else {
    // Default dimensions for tops, bottoms, and hair
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] && array1[i].img) {
        image(array1[i].img, width / 9, startY + (spacing * i), width / 9, defaultItemHeight);
      }
    }

    for (let i = 0; i < array2.length; i++) {
      if (array2[i] && array2[i].img) {
        image(array2[i].img, width - width / 9, startY + (spacing * i), width / 9, defaultItemHeight);
      }
    }
  }
}


function mousePressed() {
  // intro clicks
  if (gameState === "introPrompt") {
    if (inside(mouseX, mouseY, width / 2 - width * 0.0625, height * 0.6, width * 0.09375, height * 0.0605)) {
      gameState = "rulesPrompt";
      return;
    }
    if (inside(mouseX, mouseY, width / 2 + width * 0.0625, height * 0.6, width * 0.09375, height * 0.0605)) {
      gameState = "noOption";
      return;
    }
  } else if (gameState === "noOption") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6, width * 0.09375, height * 0.0605)) {
      gameState = "rulesPrompt";
      return;
    }
  } else if (gameState === "rulesPrompt") {
    if (inside(mouseX, mouseY, width / 2, height * 0.6, width * 0.09375, height * 0.0605)) {
      gameState = "showingRules";
      activeRules = [];
      rulesIndex = 0;
      return;
    }
  } else if (gameState === "showingRules") {
    if (inside(mouseX, mouseY, width / 2, height * 0.9, width * 0.09375, height * 0.0605)) {
      gameState = "start";
      return;
    }
  }

  // barbie world clicks
  // done button specifics
  const btnX = width / 3;
  const btnY = height - height / 8;
  const btnW = width * 0.052;
  const btnH = height * 0.048;

  // Check for Done button click (only if not in a message state or game over state)
  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2 &&
    !showTopSelectionMessage &&
    !showHairSelectionMessage &&
    !showBottomSelectionMessage &&
    !showDressSelectionMessage &&
    !showShoesSelectionMessage && // Don't allow clicks during shoes message display
    gameState !== "gameOverLose"
  ) {
    nextStage();
    return;
  }

  // Outfit choice buttons
  if (
    gameState === "start" &&
    mouseX > width / 4 - width * 0.052 &&
    mouseX < width / 4 + width * 0.052 &&
    mouseY > height / 2 - height * 0.036 &&
    mouseY < height / 2 + height * 0.036
  ) {
    playerChoice = "Dress";
    gameState = "puttingOnDress";
    // Clear selections from other categories if switching to dress
    selectedTopImage = null;
    selectedBottomImage = null;
    selectedShoesImage = null;
    selectedHairImage = null;

    fill(247, 215, 233);
    rect(width / 4, height / 2, width * 0.104, height * 0.072);
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
    // Clear selected dress if switching to top & bottoms
    selectedDressImage = null;

    fill(247, 215, 233);
    rect(width / 4, height / 2, width * 0.104, height * 0.072);
    rect((3 * width) / 4, height / 2, width * 0.104, height * 0.072);
  }

  let defaultItemHeight = height / 6; // Base height for items in the closet
  let spacing = height * 0.145;
  startY = height / 2 - height / 3.5; // Re-define startY for item positioning

  // Logic for selecting dresses when in "puttingOnDress" state
  if (gameState === "puttingOnDress") {
    // Define the dimensions for click detection, matching the display dimensions
    let dressClickWidth = width / 9;
    let dressClickHeight = defaultItemHeight * 1.5;

    // Check for clicks on dresses in the left array (dressArray1)
    for (let i = 0; i < dressArray1.length; i++) {
      let currentDress = dressArray1[i];
      // Note: The Y-coordinate for drawing dresses in `closet` is `(2*startY) + (2*(spacing * i))`
      // So we use the same for click detection
      let currentDressX = width / 9;
      let currentDressY = (2 * startY) + (2 * (spacing * i));

      if (
        mouseX > currentDressX - dressClickWidth / 2 &&
        mouseX < currentDressX + dressClickWidth / 2 &&
        mouseY > currentDressY - dressClickHeight / 2 &&
        mouseY < currentDressY + dressClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedDressImage = currentDress.img;
        selectedDressItemName = currentDress.name;
        selectedClothes = "yay"; // Indicate something has been selected
        return;
      }
    }

    // Check for clicks on dresses in the right array (dressArray2)
    for (let i = 0; i < dressArray2.length; i++) {
      let currentDress = dressArray2[i];
      let currentDressX = width - width / 9;
      let currentDressY = (2 * startY) + (2 * (spacing * i)); // Matches drawing Y

      if (
        mouseX > currentDressX - dressClickWidth / 2 &&
        mouseX < currentDressX + dressClickWidth / 2 &&
        mouseY > currentDressY - dressClickHeight / 2 &&
        mouseY < currentDressY + dressClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedDressImage = currentDress.img;
        selectedDressItemName = currentDress.name;
        selectedClothes = "yay"; // Indicate something has been selected
        return;
      }
    }
  }


  // Logic for selecting tops when in "puttingOnTop" state
  if (gameState === "puttingOnTop") {
    // Dimensions for click detection for tops (default)
    let topClickWidth = width / 9;
    let topClickHeight = defaultItemHeight;

    // Check for clicks on tops in the left array (topsArray1)
    for (let i = 0; i < topsArray1.length; i++) {
      let currentTop = topsArray1[i];
      let currentTopX = width / 9;
      let currentTopY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentTopX - topClickWidth / 2 &&
        mouseX < currentTopX + topClickWidth / 2 &&
        mouseY > currentTopY - topClickHeight / 2 &&
        mouseY < currentTopY + topClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = currentTop.img;
        selectedTopItemName = currentTop.name;
        selectedClothes = "yay";
        return;
      }
    }

    // Check for clicks on tops in the right array (topsArray2)
    for (let i = 0; i < topsArray2.length; i++) {
      let currentTop = topsArray2[i];
      let currentTopX = width - width / 9;
      let currentTopY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentTopX - topClickWidth / 2 &&
        mouseX < currentTopX + topClickWidth / 2 &&
        mouseY > currentTopY - topClickHeight / 2 &&
        mouseY < currentTopY + topClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedTopImage = currentTop.img;
        selectedTopItemName = currentTop.name;
        selectedClothes = "yay";
        return;
      }
    }
  }

  // Logic for selecting bottoms when in "puttingOnBottoms" state
  if (gameState === "puttingOnBottoms") {
    // Dimensions for click detection for bottoms (default)
    let bottomClickWidth = width / 9;
    let bottomClickHeight = defaultItemHeight;

    // Check for clicks on bottoms in the left array (bottomsArray1)
    for (let i = 0; i < bottomsArray1.length; i++) {
      let currentBottom = bottomsArray1[i];
      let currentBottomX = width / 9;
      let currentBottomY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentBottomX - bottomClickWidth / 2 &&
        mouseX < currentBottomX + bottomClickWidth / 2 &&
        mouseY > currentBottomY - bottomClickHeight / 2 &&
        mouseY < currentBottomY + bottomClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedBottomImage = currentBottom.img;
        selectedBottomItemName = currentBottom.name;
        selectedClothes = "yay";
        return;
      }
    }

    // Check for clicks on bottoms in the right array (bottomsArray2)
    for (let i = 0; i < bottomsArray2.length; i++) {
      let currentBottom = bottomsArray2[i];
      let currentBottomX = width - width / 9;
      let currentBottomY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentBottomX - bottomClickWidth / 2 &&
        mouseX < currentBottomX + bottomClickWidth / 2 &&
        mouseY > currentBottomY - bottomClickHeight / 2 &&
        mouseY < currentBottomY + bottomClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedBottomImage = currentBottom.img;
        selectedBottomItemName = currentBottom.name;
        selectedClothes = "yay";
        return;
      }
    }
  }

  // Logic for selecting shoes when in "puttingOnShoes" state
  if (gameState === "puttingOnShoes") {
  let shoeClickWidth = width / 22; // Matches display width
  let shoeClickHeight = height / 5; // Matches display height

  // Check for clicks on shoes in the left array (shoesArray1)
  for (let i = 0; i < shoesArray1.length; i++) {
    let currentShoe = shoesArray1[i];
    // These are the coordinates for displaying the image in closet() for shoes
    let currentShoeX = width / 9;
    let currentShoeY = startY + (1.8 * (spacing * i)); 

    if (
      mouseX > currentShoeX - shoeClickWidth / 2 &&
      mouseX < currentShoeX + shoeClickWidth / 2 &&
      mouseY > currentShoeY - shoeClickHeight / 2 &&
      mouseY < currentShoeY + shoeClickHeight / 2
    ) {
      noStroke();
      fill(247, 215, 233);
      rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
      selectedShoesImage = currentShoe.img;
      selectedShoesItemName = currentShoe.name;
      selectedClothes = "yay";
      return;
    }
  }

  // Check for clicks on shoes in the right array (shoesArray2)
  for (let i = 0; i < shoesArray2.length; i++) {
    let currentShoe = shoesArray2[i];
    // These are the coordinates for displaying the image in closet() for shoes
    let currentShoeX = width - width / 9;
    let currentShoeY = startY + (1.8 * (spacing * i)); 

    if (
      mouseX > currentShoeX - shoeClickWidth / 2 &&
      mouseX < currentShoeX + shoeClickWidth / 2 &&
      mouseY > currentShoeY - shoeClickHeight / 2 &&
      mouseY < currentShoeY + shoeClickHeight / 2
    ) {
      noStroke();
      fill(247, 215, 233);
      rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
      selectedShoesImage = currentShoe.img;
      selectedShoesItemName = currentShoe.name;
      selectedClothes = "yay";
      return;
    }
  }
}

  // Logic for selecting hair when in "puttingOnHair" state
  if (gameState === "puttingOnHair") {
    // Dimensions for click detection for hair (default)
    let hairClickWidth = width / 9;
    let hairClickHeight = defaultItemHeight;

    for (let i = 0; i < hairArray1.length; i++) {
      let currentHair = hairArray1[i];
      let currentHairX = width / 9;
      let currentHairY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentHairX - hairClickWidth / 2 &&
        mouseX < currentHairX + hairClickWidth / 2 &&
        mouseY > currentHairY - hairClickHeight / 2 &&
        mouseY < currentHairY + hairClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedHairImage = currentHair.img;
        selectedHairItemName = currentHair.name;
        selectedClothes = "yay";
        return;
      }
    }

    for (let i = 0; i < hairArray2.length; i++) {
      let currentHair = hairArray2[i];
      let currentHairX = width - width / 9;
      let currentHairY = startY + spacing * i; // Matches drawing Y

      if (
        mouseX > currentHairX - hairClickWidth / 2 &&
        mouseX < currentHairX + hairClickWidth / 2 &&
        mouseY > currentHairY - hairClickHeight / 2 &&
        mouseY < currentHairY + hairClickHeight / 2
      ) {
        noStroke();
        fill(247, 215, 233);
        rect(width / 2, height / 2 + height * 0.0965, width * 0.364, height * 0.967);
        selectedHairImage = currentHair.img;
        selectedHairItemName = currentHair.name;
        selectedClothes = "yay";
        return;
      }
    }
  }
}


function inside(px, py, rectX, rectY, rectWidth, rectHeight) {
  return px > rectX - rectWidth / 2 &&
    px < rectX + rectWidth / 2 &&
    py > rectY - rectHeight / 2 &&
    py < rectY + rectHeight / 2;
}