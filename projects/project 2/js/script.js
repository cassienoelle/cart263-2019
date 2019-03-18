'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// Class references
const {Application, Graphics, Sprite, Container, lights, display} = PIXI;
const {Layer, Stage} = display;

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

// Quadrant relative position
let position = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
}
// Quadrant colours
let green = 0x007E2D;
let brightGreen = 0x2AFC16;
let red = 0X8A0900;
let brightRed = 0xFF3D00;
let blue = 0x0859A5;
let brightBlue = 0x0084FF;
let yellow = 0xB89B07;
let brightYellow = 0xFFF500;
let white = 0xFFFFFF;
let black = 0x000000;

// Quadrant backlights
let testLight;
let testRect;
let alpha = 1;

// setup()
//
//
function setup() {
  console.log('setup');

  drawBoard();
  setupQuadrants();
  //-------------

  // Test display light


  //
  // testLight = new Light(circle.x,circle.y,200,200,white,100);
  // testLight.display();

  //------------
  //drawLights();


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
//
function play(delta) {
  topLeft.lightUp();
  drawQuadrants();
  drawOutlines();

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
  circle.beginFill(black);
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

  topLeft = new Quadrant(position.LEFT,position.TOP,radius,green,brightGreen,1,undefined);
  topRight = new Quadrant(position.RIGHT,position.TOP,radius,red,brightRed,1,undefined);
  bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,blue,brightBlue,1,undefined);
  bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,yellow,brightYellow,1,undefined);
}

function drawQuadrants() {


  topLeft.draw();
  topRight.draw();
  bottomRight.draw();
  bottomLeft.draw();


/*
  Radian calculations for arc()

  // Slice the circle in four using radians
  let radians = 1.570796326797 // equals one quarter circle
  let rads = {
    top: radians * 3, // 12 o'clock position
    right: 0, // 3 o'clock position
    bottom: radians, // 6 o'clock position
    left: radians * 2 // 9 o'clock position
  }
*/

}

/*
function drawLights() {
  getVertices();

  testLight = new Quadrant(position.LEFT,position.TOP,radius,white,1,undefined);

  testLight.draw(true);
  let bounds = testLight.getBounds();
  let w = bounds.right - bounds.left;
  let h = bounds.bottom - bounds.top;
  let x = bounds.left + w * 0.6;
  let y = bounds.top + h * 0.6;

  let anotherLight = new Graphics;
  anotherLight.beginFill(white);
  anotherLight.drawCircle(0,0,w/4,h/4);
  anotherLight.x = x;
  anotherLight.y = y;
  anotherLight.filters = [new PIXI.filters.BlurFilter(40)];
  anotherLight.endFill();
  app.stage.addChild(anotherLight);

  anotherLight.mask = testLight;

}
*/

function drawOutlines() {
  outlines.lineStyle(30, black, 1, 0.5)
  outlines.beginFill(black);
  outlines.drawCircle(circle.x, circle.y, radius/2.5);
  outlines.moveTo(board.left, circle.y);
  outlines.lineTo(board.right, circle.y);
  outlines.moveTo(circle.x, board.top);
  outlines.lineTo(circle.x, board.bottom);
  outlines.endFill();
  app.stage.addChild(outlines);
}
