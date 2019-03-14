'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

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
let nudibranch; // nudibranch sprite

// setup()
//
//
function setup() {
  console.log('setup');
  // Create new nudibranch sprite
  nudibranch = new PIXI.Sprite(
    PIXI.loader.resources.nudibranchImage.texture);

  // Scale sprite and position at center canvas
  nudibranch.scale.set(0.15,0.15);
  nudibranch.x = width/2 - nudibranch.width/2;
  nudibranch.y = height/2 - nudibranch.height/2;
  // Append to stage
  app.stage.addChild(nudibranch);

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
  nudibranch.x += 1;
}
