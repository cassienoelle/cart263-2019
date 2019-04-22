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

// Pose tracking variables
let poseNet;
let poses = [];
let faceParts = ["leftEar", "leftEye", "nose", "rightEye", "rightEar", "leftWrist", "rightWrist"];
let leftX, leftY, rightX, rightY, noseX, noseY, size;
let facePositions = [];
let positionIndex = 0;
let r = 255;
let g = 255;
let b = 255;
let confidence;

// Overlay images
let wowEmoji;

// Music
let leftSynth;
let rightSynth;
let drumTempo;
let kick, snare, clap, acid, grime;
let drumSounds = [];
let drumPattern = [];
let currentSound;
let stereoPanner;


const C_MAJOR = ['C','D','E','G','A'];
const D_MAJOR = ['D','E','F#','A','B'];
const E_MAJOR = ['E','F#','G#','B','C#'];
const F_MAJOR = ['F','G','A','C','D'];
const G_MAJOR = ['G','A','B','D','E'];
const A_MAJOR = ['A','B','C#','E','F#'];
const B_MAJOR = ['B','C#','D#','F#','G#'];

const C_MINOR = ['C','D#','F','G','A#'];
const D_MINOR = ['D','F','G','A','C'];
const E_MINOR = ['E','G','A','B','D'];
const F_MINOR = ['F','G#','A#','C','D#'];
const G_MINOR = ['G','A#','C','D','F'];
const A_MINOR = ['A','C','D','E','G'];
const B_MINOR = ['B','D','E','F#','A'];

const majorScales = [C_MAJOR, D_MAJOR, E_MAJOR, F_MAJOR, G_MAJOR, A_MAJOR, B_MAJOR];
const minorScales = [C_MINOR, D_MINOR, E_MINOR, F_MINOR, G_MINOR, A_MINOR, B_MINOR];

let scalesOptions = ['C','D','E','F','G','A','B'];
let currentScale;

let note;
// Prevent multiple mousePressed calls
let pressed = false;

// preload()
//
//

function preload() {
  wowEmoji = loadImage('assets/images/wow-emoji.png');
}


// setup()
//
//

function setup() {
  // Set width and height to maintain webcam aspect ratio
  // for any screen orientation
  if (windowWidth >= windowHeight) {
    videoHeight = windowHeight;
    videoWidth = windowHeight / 0.75;
  }
  else if (windowHeight > windowWidth) {
    videoWidth = windowWidth;
    videoHeight = windowWidth * 0.75;
  }

  // Setup canvas and webcam feed
  canvas = createCanvas(videoWidth, videoHeight);

  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();

  // Initialize poseNet
  // Fill poses array with results every time a new pose is detected
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', results => {
    poses = results;
  });

  setupSounds();

  currentScale = random(minorScales);
  console.log(currentScale);

}

function setupSounds() {
  Synth instanceof AudioSynth;
  leftSynth = Synth.createInstrument('acoustic');
  rightSynth = Synth.createInstrument('acoustic');

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

  acid = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/acid-one.wav'
    }
  });

  grime = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/grime-one.wav'
    }
  });

  // Setup effects
  stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: 0
  });

  // Enter sounds into array
  drumSounds = [kick, snare, clap, acid, grime];
  // Add effects to drum sounds
  for (let i = 0; i < drumSounds.length; i++) {
    drumSounds[i].addEffect(stereoPanner);
  }
}

function selectDrums() {
  for (let i = 0; i < 3; i++) {
    drumPattern[i] = random(drumSounds);
  }
  console.log('drumPattern: ' + drumPattern);
}

function modelReady() {
  console.log('Model Loaded');
}

function mousePressed() {
  console.log(JSON.stringify(poses[0]));
//   if (!pressed) {
//     setTimeout(drumBeat, 35);
//   } else {
//     console.log('already pressed!');
//   }
//   selectDrums();
//   pressed = true;
}



// draw()
//
//

function draw() {
  background(0);
  tint(255);

  // Flip video horizontally so
  // left-right motions are more intuitive
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);

  // Draw ellipses at on keypoints of face
  drawKeypoints();
  playTone();
  // emojiFace();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // console.log('Pose ' + i + poses[i]);
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

function playTone() {


  if (poses.length > 0) {
    let leftWrist = poses[0].pose.keypoints[9].position.y;
    let rightWrist = poses[0].pose.keypoints[10].position.y;

    console.log('left: ' + checkNote(leftWrist));
    console.log('right: ' + checkNote(rightWrist));

    if (checkNote(leftWrist) != undefined) {
      leftSynth.play(checkNote(leftWrist), 4, 1);
    }
    if (checkNote(rightWrist) != undefined) {
      rightSynth.play(checkNote(rightWrist), 2, 2);
    }


  }
}


function checkNote(keypoint) {
  let h = height/11;
  for (let i = 0; i < currentScale.length; i++) {
    if (keypoint > i * h && keypoint < h * (i + 1)) {
      note = currentScale[i];
      return note;
    }
  }
}

function emojiFace() {
  // Diameter of image is width between ears
  if (poses.length > 0) {
    leftX = poses[0].pose.keypoints[4].position.x;
    leftY = poses[0].pose.keypoints[4].position.y;
    rightX = poses[0].pose.keypoints[5].position.x;
    rightY = poses[0].pose.keypoints[5].position.y;
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    size = dist(leftX, leftY, rightX, rightY) * 0.75;
    push()
    imageMode(CENTER);
    image(wowEmoji, noseX, noseY, size, size);
    pop();
  }

}

// Play drum sounds corresponding to face parts
// Tempo controlled by real-time x-distance between face parts
function drumBeat(continueInterval = true) {
  console.log('called');
  setTempo();
  console.log('drum tempo: ' + drumTempo);
  console.log('index: ' + positionIndex);
  // Play sound according to face part, panning left-right
  switch (faceParts[positionIndex]) {
    case 'leftEar':
      stereoPanner.pan = -1;
      currentSound = drumPattern[0];
      console.log(faceParts[positionIndex] + 'snare');
      break;

    case 'leftEye':
      stereoPanner.pan = -0.5;
      currentSound = drumPattern[1];
      console.log(faceParts[positionIndex] + 'kick');
      break;

    case 'nose':
      stereoPanner.pan = 0;
      currentSound = drumPattern[2];
      console.log(faceParts[positionIndex] + 'clap');
      break;

    case 'rightEye':
      stereoPanner.pan = 0.5;
      currentSound = drumPattern[1];
      console.log(faceParts[positionIndex] + 'kick');
      break;

    case 'rightEar':
      stereoPanner.pan = 1;
      currentSound = drumPattern[0];
      console.log(faceParts[positionIndex] + 'snare');
      break;

    default:
      break;
  }

  currentSound.play();

  if (continueInterval) {
    console.log('timeout set!');
    setTimeout(drumBeat, drumTempo);
  }

  positionIndex++;
  if (positionIndex >= facePositions.length) {
    positionIndex = 0;
  }

}

function setTempo() {
  let averageDistance = 0;
  let distance = 0;
  for (let i = facePositions.length - 1; i > 0; i--) {
    distance = facePositions[i] - facePositions[i - 1];
    averageDistance += distance;
  }

  averageDistance = (averageDistance / facePositions.length) * 3;
  if (averageDistance < 0) {
    averageDistance = averageDistance * -1;
  }
  console.log('average:' + averageDistance);
  averageDistance = constrain(averageDistance, 75, 1500);
  drumTempo = averageDistance;
}
