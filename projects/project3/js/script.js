"use strict";

/*****************

Art has a double face, of expression and illusion,
just like science has a double face:
the reality of error and the phantom of truth.

Cassie Smith

******************/
let canvas, capture;


// preload()
//
//

function preload() {

}


// setup()
//
//

function setup() {

  canvas = createCanvas(640,480);
  background(0);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

}


// draw()
//
//

function draw() {
  
  tint(255, 0, 250);
  image(capture, 0, 0);

}
