'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// Get class references
const {Application, Graphics, Sprite, Container, lights, display} = PIXI;
const {diffuseGroup, normalGroup, lightGroup} = lights;
const {Layer, Stage} = display;

// Setup Pixi application
// combo renderer, ticker, root container
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

// Use Pixi-Layers stage instead of default container
app.stage = new Stage();

// Alias variables for window width and height
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
  //circle.x = window.innerWidth/2;
  //circle.y = window.innerHeight/2;
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
let board;
let vertex;


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
let green = 0x6CD362;
let red = 0xE23D31;
let blue = 0x2A88E0;
let yellow = 0xF4EC2F;

// setup()
//
//
function setup() {
  console.log('setup');

  drawCircle();
  drawQuadrants();

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

}

function drawCircle() {
  // Set radius so circle fits to window with slight margin
  // adapt for portrait or landscape orientation
  if (width >= height) {
    radius = (height * 0.9) / 2;
  } else if (height > width) {
    radius = (height * 0.9) / 2;
  }
  // Draw circle at center of canvas
  circle.beginFill(0xFFFFFF);
  circle.drawCircle(0, 0, radius);
  circle.x = width/2;
  circle.y = height/2;
  circle.endFill();
  app.stage.addChild(circle);
}


function drawQuadrants() {
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

  topLeft = new Quadrant(position.LEFT,position.TOP,radius,green,undefined);
  topRight = new Quadrant(position.RIGHT,position.TOP,radius,red,undefined);
  bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,blue,undefined);
  bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,yellow,undefined);

  topLeft.display();
  topRight.display();
  bottomRight.display();
  bottomLeft.display();


/*
  Removed this code after replacing arc() with arcTo()

  // Slice the circle in four using radians
  let radians = 1.570796326797 // equals one quarter circle
  let rads = {
    top: radians * 3, // 12 o'clock position
    right: 0, // 3 o'clock position
    bottom: radians, // 6 o'clock position
    left: radians * 2 // 9 o'clock position
  }
*/

/*

  // Draw four triangles with an arc over their hypoteneuse
  // aka, four quarter-circles or pie pieces

  // TOP LEFT
  topLeft.beginFill(green, 1);
  topLeft.moveTo(vertex.tx, vertex.ty);
  topLeft.lineTo(vertex.cx, vertex.cy);
  topLeft.lineTo(vertex.lx, vertex.ly);
  topLeft.arcTo(vertex.lx, vertex.ty, vertex.tx, vertex.ty, radius);
  topLeft.endFill();
  app.stage.addChild(topLeft);

  // TOP RIGHT
  topRight.beginFill(red, 1);
  topRight.moveTo(vertex.tx, vertex.ty);
  topRight.lineTo(vertex.cx, vertex.cy);
  topRight.lineTo(vertex.rx, vertex.ry);
  topRight.arcTo(vertex.rx, vertex.ty, vertex.tx, vertex.ty, radius);
  topRight.endFill();
  app.stage.addChild(topRight);

  // BOTTOM RIGHT
  bottomRight.beginFill(blue, 1);
  bottomRight.moveTo(vertex.bx, vertex.by);
  bottomRight.lineTo(vertex.cx, vertex.cy);
  bottomRight.lineTo(vertex.rx, vertex.ry);
  bottomRight.arcTo(vertex.rx, vertex.by, vertex.bx, vertex.by, radius);
  bottomRight.endFill();
  app.stage.addChild(bottomRight);

  // BOTTOM LEFT
  bottomLeft.beginFill(yellow, 1);
  bottomLeft.moveTo(vertex.bx, vertex.by);
  bottomLeft.lineTo(vertex.cx, vertex.cy);
  bottomLeft.lineTo(vertex.lx, vertex.ly);
  bottomLeft.arcTo(vertex.lx, vertex.by, vertex.bx, vertex.by, radius);
  bottomLeft.endFill();
  app.stage.addChild(bottomLeft);

*/

}
