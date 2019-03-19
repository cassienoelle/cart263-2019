'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// Class references
const {Application, Graphics, Sprite, Container, lights, display} = PIXI;

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
  .on('progress', loadProgressHandler)
  .load(setup);

  function loadProgressHandler() {
    console.log('loading');
  }

// Declare global variables
let state; // game state

// Circle base for gameboard
let circle = new Graphics();
let radius;
// Variables to hold circle bounding box and
// coordinates for vertices of Quadrant base triangles
let board;
let vertex;
// Black overlay to complete board
let outlines = new Graphics();

// Quarter-circle quadrants
let topLeft;
let topRight;
let bottomLeft;
let bottomRight;
// Array to hold quadrants for random selection
let quadrants = [];
// Currently lit quadrant
let currentLight;
// Most recent light pattern
let currentPattern = [];
// Interval for light flash
const INTERVAL = 500;

// Quadrant relative position
let position = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};
// Quadrant colours
let colors = {
  green: 0x007E2D,
  brightGreen: 0x2AFC16,
  red: 0X8A0900,
  brightRed: 0xFF3D00,
  blue: 0x0859A5,
  brightBlue: 0x0084FF,
  yellow: 0xB89B07,
  brightYellow: 0xFFF500,
  white: 0xFFFFFF,
  black: 0x000000
};

let colorKeys = {
  green: 'green',
  red: 'red',
  blue: 'blue',
  yellow: 'yellow'
};

let currentChoice;
let choices = [];
let input = false;
let correct = 0;
let incorrect = 0;
let result;

// Sprites
let ear;

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

  ear = new PIXI.Sprite(
    PIXI.loader.resources['assets/images/ear.png'].texture
  );
  app.stage.addChild(ear);
  ear.anchor.set(0.5);
  ear.x = width/2;
  ear.y = height/2;
  let s = (radius/2.5) / ear.height;
  ear.scale.set(s,s);
  ear.visible = false;

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
        if (input = true) {
          console.log('yellow!');
          currentChoice = colorKeys.yellow;
          choices.push(currentChoice);
          checkInput();
        }
      },
      'blue': () => {
        if (input = true) {
          console.log('blue!');
          currentChoice = colorKeys.blue;
          choices.push(currentChoice);
          checkInput();
        }
      },
      'green': () => {
        if (input = true) {
          console.log('green!');
          currentChoice = colorKeys.green;
          choices.push(currentChoice);
          checkInput();
        }
      },
      'red': () => {
        if (input = true) {
          console.log('red!');
          currentChoice = colorKeys.red;
          choices.push(currentChoice);
          checkInput();
        }
      },
    };

    // Add our commands to annyang
    annyang.addCommands(colorChoices);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
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
  lightPattern(2);
}

function lightPattern(length) {
  // Inialize counter to control pattern length
  let counter = 0;
  // Randomly generate quadrant to light up
  let currentLight;
  // Interval until next light flashes
  let i = INTERVAL * 2;

  // Every interval, light up the current quadrant, then randomly select a new quadrant
  // Loop through until full pattern completed, saving each keyword in array
  let pattern = setInterval(() => {
    currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
    currentLight.lightUp();
    currentPattern.push(currentLight.keyword);
    counter ++;
    if (counter >= length) {
      clearInterval(pattern);
      acceptInput();
    }
  }, i);

  console.log(currentPattern);
}

// repeatPattern()
//
// Receives speech input from user (speaking back light pattern)
// Checks user input against pattern
function acceptInput() {
  // Make ear sprite visible
  ear.visible = true;
  // Voice prompt for user input
  responsiveVoice.speak('Repeat after me');
  // Start accepting input
  input = true;
}

function checkInput() {
  // console.log('checking');
  // console.log('choices length: ' + choices.length);
  // console.log('pattern length: ' + currentPattern.length);

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
      // If patterns match, user wins
      if (incorrect === 0 && correct === currentPattern.length) {
        console.log('winner!');
      }
      // If patterns don't match, user loses
      else if (incorrect > 0) {
        console.log('loser!');
      }
    }
  }
  // If not accepting input when function is called, log message to console
  else {
    console.log('not accepting input');
  }

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
