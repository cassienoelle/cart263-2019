"use strict";

/*****************

Art has a double face, of expression and illusion,
just like science has a double face:
the reality of error and the phantom of truth.

Cassie Smith

******************/

// Canvas and camera variables
let canvas;
let video;
let videoWidth, videoHeight;
let centerX, centerY;

// Pose tracking variables
let poseNet;
let poses = [];

// preload()
//
//

function preload() {

}


// setup()
//
//

function setup() {

  // Setup canvas and webcam feed
  canvas = createCanvas(windowWidth, windowHeight);
  background(0);

  videoWidth = 1000;
  videoHeight = 750;
  centerX = (windowWidth - videoWidth)/2;
  centerY = (windowHeight - videoHeight)/2;

  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();

  // Initialize poseNet
  // Fill poses array with results every time a new pose is detected
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', results => {
    poses = results;
  });

}

function modelReady() {
  console.log('Model Loaded');
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

// draw()
//
//

function draw() {

  tint(255, 0, 250);
  image(video, centerX, centerY);

}
