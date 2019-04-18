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
let faceParts = ["leftEar", "leftEye", "nose", "rightEye", "rightEar"];
let facePositions = [];
let positionIndex = 0;
let r = 255;
let g = 255;
let b = 255;


// Music
let drumTempo;
let kick, snare, clap;
let drumPattern;
let stereoPanner;
// Prevent multiple mousePressed calls
let pressed = false;

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

  // Load drum sounds
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  clap = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/clap.wav'
    }
  });

  // Setup effects
  stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: 0
  });
  // Add effects to drum sounds
  kick.addEffect(stereoPanner);
  snare.addEffect(stereoPanner);
  clap.addEffect(stereoPanner);
}

function modelReady() {
  console.log('Model Loaded');
}

function mousePressed() {
  console.log(JSON.stringify(poses));
  console.log(facePositions);

  if (!pressed) {
    setTimeout(drumBeat, 35);
  } else {
    console.log('already pressed!');
  }

  pressed = true;
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
      for (let f = 0; f < faceParts.length; f++) {
        if (keypoint.part === faceParts[f] && keypoint.score > 0.2) {
          // Draw ellipse at keypoint
          fill(r, g, b);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
          // Add to facePosition array
          facePositions[f] = keypoint.position.x;
        }
      }
    }
  }
}

// Play drum sounds corresponding to face parts
// Tempo controlled by real-time x-distance between face parts
function drumBeat(continueInterval = true) {
  console.log('called');

  // Play sound according to face part, panning left-right
  // Note: 'right' = 'left' due to mirroring effect of webcam
  switch (faceParts[positionIndex]) {
    case 'rightEar':
      stereoPanner.pan = 1;
      snare.play();
      console.log(faceParts[positionIndex] + 'snare');
      break;

    case 'rightEye':
      stereoPanner.pan = -0.5;
      kick.play();
      console.log(faceParts[positionIndex] + 'kick');
      break;

    case 'nose':
      stereoPanner.pan = 0;
      clap.play();
      console.log(faceParts[positionIndex] + 'clap');
      break;

    case 'leftEye':
      stereoPanner.pan = 0.5;
      kick.play();
      console.log(faceParts[positionIndex] + 'kick');
      break;

    case 'leftEar':
      stereoPanner.pan = -1;
      snare.play();
      console.log(faceParts[positionIndex] + 'snare');
      break;

    default:
      break;
  }

  setTempo();
  console.log('drum tempo: ' + drumTempo);

  positionIndex++;
  if (positionIndex > facePositions.length) {
    positionIndex = 0;
  }

  if (continueInterval) {
    setTimeout(drumBeat, drumTempo);
  }
}

function setTempo() {
  let averageDistance = 0;
  let distance = 0;
  for (let i = facePositions.length - 1; i > 0; i--) {
    distance = facePositions[i] - facePositions[i - 1];
    averageDistance += distance;
  }

  averageDistance = (averageDistance / facePositions.length);
  console.log('average:' + averageDistance);
  drumTempo = averageDistance;
}
