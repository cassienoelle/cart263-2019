'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// PIXI APP
// Class references
const {Application, Graphics, Sprite, Container,lights, display} = PIXI;

// Setup Pixi application
let app  = new PIXI.Application({
    width: 800,
    height: 600,
    antialias: true,
    backgroundColor: 0x000000
});

// Add to DOM
// * document returns null unless window is loaded *
window.onload = function() {
  document.body.appendChild(app.view);
}

// Aliases for window width and height
let width;
let height;

// Set canvas to full window size
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
resize();
window.onresize = resize;

function resize() {
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Set canvas width and height variables each time window is resized
  width = window.innerWidth;
  height = window.innerHeight;
}

/*** -----------LOADER, SOUNDS, STATE---------------- ***/

// Load sprite texture
PIXI.loader
  .add('assets/images/ear.png')
  .add('assets/images/eye.png')
  .add('assets/images/eyeball.png')
  .add('assets/images/soundImg.png')
  .load(setup);

// Load sounds
let sound = PIXI.sound.add({
  beep: 'assets/sounds/beep.wav'
});

// Game state
let state;

/*------- GAME BOARD ------*/

// Base circle shape
let circle = new Graphics();
let radius;
// Variables to hold circle bounding box and
// coordinates for vertices of Quadrant base triangles
let board;
let vertex;

// Quarter-circle quadrants and
// Array to hold quadrants for random selection
let quadrants = [];
let topLeft;
let topRight;
let bottomLeft;
let bottomRight;

// Quadrant relative position
let position = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};
// Quadrant colours and colour keywords
let colors = {
  green: 0x007E2D,
  brightGreen: 0x2AFC16,
  red: 0X8A0900,
  brightRed: 0xFF3D00,
  blue: 0x0859A5,
  brightBlue: 0x00ADFF,
  yellow: 0xB89B07,
  brightYellow: 0xFFF500,
  white: 0xFFFFFF,
  black: 0x000000,

  keys: {
    green: 'green',
    red: 'red',
    blue: 'blue',
    yellow: 'yellow'
  }
};

// Black overlay (center circle and stroke) to complete board
let outlines = new Graphics();

// Sprites
let ear, eye, eyeball, eyeBounds, eyeballBounds;
let soundAnimation;
let soundTicker;
let scaleEar, scaleSound;
let revertEar;
let count = 0;
let rcount = 0;
let scount = 0;
let animation = {
  hover: 'hover',
  shrink: 'shrink'
}


/*------ MAIN INTERACTION ------*/

// Array of current keywords
// Also corresponds to annyang commands object properties
let currentKeywords = [
  colors.keys.green,
  colors.keys.red,
  colors.keys.blue,
  colors.keys.yellow
]

// Interval for light flash
const INTERVAL = 500;
// Length of flash
const rapid = 'rapid';
const short = 'short';
const long = 'long';
// Currently lit quadrant
let currentLight;
// Most recent light pattern
let currentPattern = [];
// Pattern length (number of flashes)
let patternLength = 1;
// Counter to control pattern length
let flashed = 0;

// User input
let input = false;
let choices = [];
let currentChoice;
let correct = 0;
let incorrect = 0;
let result;

// Sound filters
sound.beep.filters = [
  new PIXI.sound.filters.TelephoneFilter(),
  new PIXI.sound.filters.DistortionFilter(1),
  new PIXI.sound.filters.ReverbFilter(3, 15)
];

/*------ MAIN METHODS ------*/

// setup()
//
//
function setup() {
  console.log('setup');

  drawBoard();
  setupQuadrants();
  drawQuadrants();
  displayQuadrants();
  drawOutlines();
  displayOutlines();
  setupSprites();

  passKeywords();

  setupVoiceCommands();

  topLeft.interactive = true;
  topLeft.on('click', clickOne);
  topRight.interactive = true;
  topRight.on('click', clickTwo);
  bottomRight.interactive = true;
  bottomRight.on('click', clickThree);

  // Set game state
  state = play;

  // Start game loop
  app.ticker.add(delta => gameLoop(delta));

}

function setupVoiceCommands() {
  if (annyang) {

    // Add our commands to annyang
    annyang.addCommands(setVoiceCommands());

    annyang.addCallback('soundstart', () =>{
        console.log('sound detected');
    });

    annyang.addCallback('resultMatch', () =>{
      console.log('result match');
      soundAnimation.visible = true;
      soundTicker.start();
    });

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
    annyang.pause();
  }

  responsiveVoice.setDefaultVoice('UK English Male');
}

// gameLoop()
//
//
function gameLoop(delta) {
  // Update current game state
  state(delta);
}

// play()
//
// Loop; Main state while game is in play
function play(delta) {
  drawQuadrants();
  drawOutlines();
}

function clickOne() {
  console.log('clicked');
  intro(false);
}

function clickTwo() {
  console.log('clicked shuffle');
  shuffleKeywords();
}

function clickThree() {
  console.log('clicked info');
  console.log('CURRENT KEYWORDS');
  console.log(currentKeywords[0]);
  console.log(currentKeywords[1]);
  console.log(currentKeywords[2]);
  console.log(currentKeywords[3]);
  console.log('CURRENT QUADRANT KEYWORDS');
  console.log(quadrants[0].keyword);
  console.log(quadrants[1].keyword);
  console.log(quadrants[2].keyword);
  console.log(quadrants[3].keyword);
  console.log('CURRENT COMMAND KEYS');

}

function intro(first) {
  console.log('intro');
  let counter = 0;
  let options = {
    rate: 1.5,
    onstart: ()=>{counter++},
    onend: wait
  }

  if (first) {
    responsiveVoice.speak(simonSays.instructions.hello,'UK English Male');
    responsiveVoice.speak(simonSays.instructions.initial,'UK English Male');
    responsiveVoice.speak(simonSays.instructions.speed,'UK English Male', options);

  } else {
    responsiveVoice.speak(simonSays.instructions.ready);
  }

  function wait() {
    let i = setInterval(() =>{
      if (!responsiveVoice.isPlaying() && counter > 0) {
        clearInterval(i);
        showKeywords(true);
      }
    },250);
  }

  annyang.resume();

}



function lightPattern(length) {
  console.log(length);
  let interval = INTERVAL * 2;
  // Clear arrays and reset match counters
  correct = 0;
  incorrect = 0;
  choices = [];
  // Clear current pattern array
  currentPattern = [];
  // Reset counter
  flashed = 0;
  // Reset currently lit quadrant
  currentLight = undefined;


  // Every interval, light up the current quadrant, then randomly select a new quadrant
  // Loop through until full pattern completed, saving each keyword in array
  let pattern = setInterval(() => {
    currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
    currentLight.lightUp(short);
    PIXI.sound.play('beep');
    currentPattern.push(currentLight.keyword);
    flashed ++;
    if (flashed >= length) {
      clearInterval(pattern);
      setTimeout(() =>{
        acceptInput();
      }, interval * 1.5);

    }
  }, interval);

  console.log(currentPattern);
}

// repeatPattern()
//
// Receives speech input from user (speaking back light pattern)
// Checks user input against pattern
function acceptInput() {
  // Voice prompt for user input
  let options = {
    pitch: Math.random() * 2 ,
    rate: 1.25
  };
  responsiveVoice.speak('Your turn!', 'UK English Male', options);
  // Start accepting input
  input = true;
  ear.visible = true;
  annyang.resume();
}

function checkInput() {
  console.log('checking');
  console.log('input = ' + input);
  console.log('choices length: ' + choices.length);
  console.log('pattern length: ' + currentPattern.length);

  // If accepting input when function is called
  if (input) {
    // When user has attempted full pattern (same number of choices)
    if (choices.length === currentPattern.length) {
      // Compare array of user choices to computer-generated pattern
      for (let i = 0; i < choices.length; i++) {
        if (choices[i] === currentPattern[i]) {
          // Log number of correct matches
          correct++;
          console.log('right:' + correct + ' ' + i);
        } else {
          // Log number of incorrect matches
          incorrect++;
          console.log('wrong:' + incorrect + ' ' + i);
        }
      }
      // Don't accept any more input
      input = false;
      annyang.pause();
      // If patterns match, user wins
      if (incorrect === 0 && correct === currentPattern.length) {

        patternLength++;
        console.log('winner!');

        if (patternLength === 2) {
          remix();
        }
        else {
          // Call a fresh pattern
          lightPattern(patternLength);
          console.log('pattern length: ' + patternLength);
        }

      }
      // If patterns don't match, user loses
      else if (incorrect > 0) {
        patternLength = 1;
        console.log('loser!');
        // Call a fresh pattern
        lightPattern(patternLength);
        console.log('pattern length: ' + patternLength);
      }
    }
  }
  // If not accepting input when function is called, log message to console
  else {
    console.log('not accepting input');
  }

}

function remix() {
  input = false;
  annyang.pause();

  app.ticker.add((delta) =>{
    console.log('disappearing ear');
    fadeEar();
  });

  let p = 0;

  let options = {
    rate: 0.2,
    pitch: 1.3
  }
  responsiveVoice.speak(simonSays.remix,'UK English Male',options);
  shuffleKeywords();
  console.log('shuffled-remix');
  let index;
  let i = 0;
  let rapidFlash = setInterval(() => {

    index = Math.floor(Math.random() * quadrants.length);
    quadrants[index].lightUp(rapid);
    i++;
    if (i > 20) {
      clearInterval(rapidFlash);
      showKeywords(false);
    }

  }, INTERVAL/4);

}

function shuffleKeywords() {
  // Fisher-Yates function to shuffle arrays
  Array.prototype.shuffle = function() {
    let input = this;

    for (let i = input.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  }

  // Shuffle the current keywords
  currentKeywords.shuffle();
  // Pass keywords to quadrants and voice commands
  passKeywords();
}

function passKeywords() {
  // Associate keywords to quadrants in clockwise order
  for (let i = 0; i < quadrants.length; i++) {
    quadrants[i].keyword = currentKeywords[i];
  }

  // Reset voice commands with new associations
  annyang.removeCommands();
  annyang.addCommands(setVoiceCommands());

}

function showKeywords(start) {
  // Don't accept voice input
  input = false;
  annyang.pause();

  let interval = INTERVAL * 4;
  let i = 0;
  // Flash each quadrant once, moving clockwise
  // and speak each current quadrant keyword
  let speakKeys = setInterval(() => {

    // Check if all the quadrants have flashed and
    // if so clear interval and call the next function
    if (i >= quadrants.length) {

      console.log('showKeywords done');
      clearInterval(speakKeys);

      // Ask if user ready?
      intro();
    }

    // If not all quadrants have flashed
    // continue calling interval and moving clockwise
    else {
      console.log('speaking');
      currentLight = quadrants[i];
      currentLight.lightUp(long);
      i ++;
      console.log('i: ' + i);
    }

  }, interval);

}



function drawBoard() {
  // Set radius so circle fits to window with slight margin
  // adapt for portrait or landscape orientation
  if (width >= height) {
    radius = (height * 0.9) / 2;
  } else if (height > width) {
    radius = (height * 0.9) / 2;
  }
  // Draw circle at center of canvas
  circle.beginFill(colors.black);
  circle.drawCircle(0, 0, radius);
  circle.x = width/2;
  circle.y = height/2;
  circle.endFill();
  app.stage.addChild(circle);

}

function getVertices() {
  // Determine outer edges of circle
  board = circle.getBounds();
  // Set vertices for four ajacent triangles
  // at circle center and edges
  vertex = {
    // center
    cx: circle.x,
    cy: circle.y,
    // top
    tx: circle.x,
    ty: board.top,
    // right
    rx: board.right,
    ry: circle.y,
    // left
    lx: board.left,
    ly: circle.y,
    // bottom
    bx: circle.x,
    by: board.bottom
  }
}

function setupQuadrants() {
  getVertices();

  // Create quadrant objects and populate array
  quadrants[0] = topLeft = new Quadrant(position.LEFT,position.TOP,radius,colors.green,colors.brightGreen,1,INTERVAL,undefined);
  quadrants[1] = topRight = new Quadrant(position.RIGHT,position.TOP,radius,colors.red,colors.brightRed,1,INTERVAL,undefined);
  quadrants[2] = bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,colors.blue,colors.brightBlue,1,INTERVAL,undefined);
  quadrants[3] = bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,colors.yellow,colors.brightYellow,1,INTERVAL,undefined);

}

function drawQuadrants() {
  topLeft.draw();
  topRight.draw();
  bottomRight.draw();
  bottomLeft.draw();
}

function displayQuadrants() {

  topLeft.display();
  topRight.display();
  bottomRight.display();
  bottomLeft.display();
}

function drawOutlines() {

  outlines.clear();
  outlines.lineStyle(30, colors.black, 1, 0.5)
  outlines.beginFill(colors.black);
  outlines.drawCircle(circle.x, circle.y, radius/2.5);
  outlines.moveTo(board.left, circle.y);
  outlines.lineTo(board.right, circle.y);
  outlines.moveTo(circle.x, board.top);
  outlines.lineTo(circle.x, board.bottom);
  outlines.endFill();

}

function displayOutlines() {

  app.stage.addChild(outlines);

}

function setupSprites() {
  ear = new Sprite(
    PIXI.loader.resources['assets/images/ear.png'].texture
  );
  app.stage.addChild(ear);
  ear.anchor.set(0.5);
  ear.x = width/2;
  ear.y = height/2;
  revertEar = (radius/2.5) / (ear.height * 0.7);
  scaleEar = revertEar;

  ear.scale.set(scaleEar,scaleEar);

  app.ticker.add((delta) =>{
    ear.scale.x = scaleEar + Math.sin(count) * 0.01;
    ear.scale.y = scaleEar + Math.cos(count) * 0.01;
    count += 0.1;
  });

  ear.visible = false;

  eyeball = new Sprite(
    PIXI.loader.resources['assets/images/eyeball.png'].texture
  );
  app.stage.addChild(eyeball);
  eyeball.anchor.set(0.5);
  eyeball.x = width/2;
  eyeball.y = height/2;

  eye = new Sprite(
    PIXI.loader.resources['assets/images/eye.png'].texture
  );
  app.stage.addChild(eye);
  eye.anchor.set(0.5);
  eye.setParent(eyeball);
  eyeball.scale.set(scaleEar,scaleEar);
  eyeballBounds = eyeball.getBounds();
  eyeBounds = eye.getBounds();

  eye.vx = 2;
  eye.vy = 2;

  eyeball.visible = false;
  eye.visible = false;


  soundAnimation = new Sprite(
    PIXI.loader.resources['assets/images/soundImg.png'].texture
  );
  app.stage.addChild(soundAnimation);
  scaleSound = (radius/2.5) / (soundAnimation.height * 0.5);
  soundAnimation.anchor.set(0.5);
  soundAnimation.x = width/2;
  soundAnimation.y = height/2;
  soundAnimation.scale.set(scaleSound,scaleSound);

  soundTicker = new PIXI.ticker.Ticker();
  soundTicker.autostart = false;
  soundTicker.add((delta) => {
    soundAnimation.scale.x = scaleSound - rcount;
    soundAnimation.scale.y = scaleSound - rcount;
    soundAnimation.alpha = 0.5 - rcount;
    rcount += 0.01;

    if (soundAnimation.width < 5) {
      soundAnimation.visible = false;
      soundAnimation.scale.x = scaleSound;
      soundAnimation.scale.y = scaleSound;
      rcount = 0;
      soundTicker.stop();
    }
  });
  soundTicker.stop();
  soundAnimation.visible = false;
}

function fadeEar() {
  ear.alpha -= scount;
  scount += 0.001;
  if (ear.alpha < 5) {
    ear.visible = false;
    ear.alpha = 1;
    scount = 0;
  }
}

function moveEye() {
  console.log('moving');
  eye.x -= eye.vx;
  eye.y -= eye.vy;

/*
  switch(currentLight) {
    case topLeft:
      eye.x -= eye.vx;
      eye.y -= eye.vy;
      break;
    case topRight:
      eye.x += eye.vx;
      eye.y -= eye.vy;
      break;
    case bottomRight:
      eye.x += eye.vx;
      eye.y += eye.vy;
      break;
    case bottomLeft:
      eye.x -= eye.vx;
      eye.y += eye.vy;
      break;
    default:
      break;
  }
  */
}

function animateSound(delta) {
  soundAnimation.scale.x = s - rcount;
  soundAnimation.scale.y = s - rcount;
  rcount += 5;

  if (soundAnimation.width < 5) {
    soundAnimation.scale.x = s;
    soundAnimation.scale.y = s;
  }
}

function displaySoundAnimation() {

}

function setVoiceCommands() {
  let commands = {
    [quadrants[0].keyword]: () => {
        console.log('you just said: ' + quadrants[0].keyword);
        currentChoice = currentKeywords[0];
        quadrants[0].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[1].keyword]: () => {
        console.log('you just said: ' + quadrants[1].keyword);
        currentChoice = currentKeywords[1];
        quadrants[1].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[2].keyword]: () => {
        console.log('you just said: ' + quadrants[2].keyword);
        currentChoice = currentKeywords[2];
        quadrants[2].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[3].keyword]: () => {
        console.log('you just said: ' + quadrants[3].keyword);
        currentChoice = quadrants[3].keyword;
        quadrants[3].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    'yes': () => {
      lightPattern(patternLength);
      annyang.pause();
    }
  };

  return commands;
}
