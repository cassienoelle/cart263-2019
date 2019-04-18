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
let face = ["leftEar", "leftEye", "nose", "rightEye", "rightEar"];

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

  tint(255);
  image(video, centerX, centerY);
  drawKeypoints();


}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Loop through face array and
      // only draw an ellipse if the keypoint is part of the face
      // and keypoint score is high enough
      for (let f = 0; f < face.length; f++) {
        if (keypoint.part === face[f] && keypoint.score > 0.2) {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }
}
