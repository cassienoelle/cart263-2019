'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
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

/*** -------------------------------------- ***/

// Load sprite texture
PIXI.loader
  .add('assets/images/ear.png')
  .add('assets/images/eye.png')
  .add('assets/images/eyeball.png')
  .load(setup);

// Load sounds
let sound = PIXI.sound.add({
  beep: 'assets/sounds/beep.wav'
});

// Declare global variables
let state; // game state

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
let count = 0;

/*------ BASIC INTERACTION ------*/

// Interval for light flash
const INTERVAL = 500;
// Paramaters for length of flash
const short = 'short';
const long = 'long';
// Currently lit quadrant
let currentLight;
// Most recent light pattern
let currentPattern = [];
// Pattern length (number of flashes)
let patternLength = 1;

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

  setupVoiceCommands();

  drawBoard();
  setupQuadrants();
  drawQuadrants();
  displayQuadrants();
  drawOutlines();
  displayOutlines();
  setupSprites();


  topLeft.interactive = true;
  topLeft.on('click', onClick);

  // Set game state
  state = play;

  // Start game loop
  app.ticker.add(delta => gameLoop(delta));
}

function setupVoiceCommands() {
  if (annyang) {

    let colorChoices = {
      'yellow': () => {
          console.log('yellow!');
          currentChoice = colors.keys.yellow;
          choices.push(currentChoice);
          checkInput();
      },
      'blue': () => {
          console.log('blue!');
          currentChoice = colors.keys.blue;
          choices.push(currentChoice);
          checkInput();
      },
      'green': () => {
          console.log('green!');
          currentChoice = colors.keys.green;
          choices.push(currentChoice);
          checkInput();
      },
      'red': () => {
          console.log('red!');
          currentChoice = colors.keys.red;
          choices.push(currentChoice);
          checkInput();
      },
    };

    // Add our commands to annyang
    annyang.addCommands(colorChoices);

    annyang.addCallback('soundstart', () =>{
        console.log('sound detected');
    });

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
    annyang.pause();
  }
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
  // console.log('delta: ' + app.ticker.deltaTime);
}

function onClick () {
  console.log('clicked');
  lightPattern(length);
}

function lightPattern(length) {
  console.log('fresh pattern');
  // Clear current pattern array
  currentPattern = [];
  // Inialize counter to control pattern length
  let counter = 0;
  // Randomly generate quadrant to light up
  let currentLight;
  // Interval until next light flashes
  let interval = INTERVAL * 2;

  // Every interval, light up the current quadrant, then randomly select a new quadrant
  // Loop through until full pattern completed, saving each keyword in array
  let pattern = setInterval(() => {
    currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
    currentLight.lightUp(short);
    PIXI.sound.play('beep');
    currentPattern.push(currentLight.keyword);
    counter ++;
    if (counter >= length) {
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
;}

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
      }
      // If patterns don't match, user loses
      else if (incorrect > 0) {
        patternLength = 1;
        console.log('loser!');
      }
      // Clear arrays and reset match counters
      correct = 0;
      incorrect = 0;
      choices = [];
      // Call a fresh pattern
      lightPattern(patternLength);
      console.log('pattern length: ' + patternLength);
    }
  }
  // If not accepting input when function is called, log message to console
  else {
    console.log('not accepting input');
  }

}

function shuffleKeywords(type) {

}

function showKeywords() {
  console.log('showing keywords, input = ' + input);
  let interval = INTERVAL * 4;
  let i = 0;

  let speakKeys = setInterval(() => {
    currentLight = quadrants[i];
    currentLight.lightUp(long);
    i ++;
    console.log('i: ' + i);
    if (i >= quadrants.length) {
      clearInterval(speakKeys);
      console.log('interval cleared');
      setTimeout(() => {
        console.log('timeout init');
        lightPattern(patternLength);
      }, 2000);
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
  quadrants[0] = topLeft = new Quadrant(position.LEFT,position.TOP,radius,colors.green,colors.brightGreen,1,INTERVAL,'green');
  quadrants[1] = topRight = new Quadrant(position.RIGHT,position.TOP,radius,colors.red,colors.brightRed,1,INTERVAL,'red');
  quadrants[2] = bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,colors.blue,colors.brightBlue,1,INTERVAL,'blue');
  quadrants[3] = bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,colors.yellow,colors.brightYellow,1,INTERVAL,'yellow');

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
  let s = (radius/2.5) / (ear.height * 0.7);
  ear.scale.set(s,s);

  app.ticker.add((delta) =>{
      ear.scale.x = s + Math.sin(count) * 0.01;
      ear.scale.y = s + Math.cos(count) * 0.01;
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
  eyeball.scale.set(s,s);
  eyeballBounds = eyeball.getBounds();
  eyeBounds = eye.getBounds();

  eye.vx = 2;
  eye.vy = 2;

  eyeball.visible = false;
  eye.visible = false;
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
