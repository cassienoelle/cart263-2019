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
let faceParts = ["rightEar", "rightEye", "nose", "leftEye", "leftEar"];
let facePositions = [];
let positionIndex = 0;


// Music
let drumTempo;
let kick, snare, clap;
let drumPattern;
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

}

function modelReady() {
  console.log('Model Loaded');
}

function mousePressed() {
  console.log(JSON.stringify(poses));
  console.log(facePositions);

  if (!pressed) {
    setTimeout(drumBeat, 500);
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
          fill(255, 0, 0);
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
  console.log('continue');
  console.log('drum tempo: ' + drumTempo);

  switch (faceParts[positionIndex]) {
    case 'leftEar' || 'rightEar':
      snare.play();
      console.log(faceParts[positionIndex] + 'snare');
      break;

    case 'leftEye' || 'rightEye':
      kick.play();
      console.log(faceParts[positionIndex] + 'kick');
      break;

    case 'nose':
      clap.play();
      console.log(faceParts[positionIndex] + 'clap');
      break;

    default:
      break;
  }

  drumTempo = setTempo();

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

  averageDistance = averageDistance / facePositions.length;
  console.log('average:' + averageDistance);
  return averageDistance;
}
