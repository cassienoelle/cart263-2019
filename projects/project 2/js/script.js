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
  .add('nudibranchImage','assets/images/purple-nudibranch.png')
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
}
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
}

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

  topLeft.interactive = true;
  topLeft.on('click', onClick);

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
  drawQuadrants();
  drawOutlines();
  // console.log('delta: ' + app.ticker.deltaTime);
}

function onClick () {
  console.log('clicked');
  lightPattern(5);
}

function lightPattern(length) {
  // Inialize counter to control pattern length
  let counter = 0;
  // Randomly generate quadrant to light up
  let currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
  // Save that quadrant's keyword in an array
  currentPattern.push(currentLight.keyword);
  // Interval until next light flashes
  let i = INTERVAL * 2;

  // Every interval, light up the current quadrant, then randomly select a new quadrant
  // Loop through until full pattern length completed, saving each keyword in array
  let pattern = setInterval(function() {
    currentLight.lightUp();
    currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
    currentPattern.push(currentLight.keyword);
    counter ++;
    if (counter >= length) {
      clearInterval(pattern);
    }
  }, i);
  
  console.log(currentPattern);
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
