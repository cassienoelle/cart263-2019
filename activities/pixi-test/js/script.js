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

  setupSprites();


  // Set game state
  state = play;

  // Start game loop
  app.ticker.add(delta => gameLoop(delta));

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

function setupQuadrants() {
  getVertices();

  // Create quadrant objects and populate array
  quadrants[0] = topLeft = new Quadrant(position.LEFT,position.TOP,radius,colors.green,colors.brightGreen,1,INTERVAL,undefined);
  quadrants[1] = topRight = new Quadrant(position.RIGHT,position.TOP,radius,colors.red,colors.brightRed,1,INTERVAL,undefined);
  quadrants[2] = bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,colors.blue,colors.brightBlue,1,INTERVAL,undefined);
  quadrants[3] = bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,colors.yellow,colors.brightYellow,1,INTERVAL,undefined);

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
  let s = (radius/2.5) / (eyeball.height * 0.7)
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

  app.ticker.add((delta) => {
    console.log('eyeball left: ' + eyeballBounds.left);
    console.log('EYE left: ' + eyeBounds.left);

    if (eyeBounds.left > eyeballBounds.left) {
      console.log('hit edge');
      eye.x -= eye.vx;
      eye.y -= eye.vy;
    }

  })
  // eyeball.visible = false;
  // eye.visible = false;
}
