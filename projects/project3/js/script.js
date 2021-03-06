"use strict";

/*****************

Face The Music
Cassie Smith
CART 263 -2019

A movement-based audio interface using your webcam,
AudioSynth, Pizzicato and PoseNet

******************/
// Canvas and camera variables
let canvas;
let video;
let videoWidth, videoHeight;
let r = 86;
let g = 200;
let b = 253;

// State and instructions
let state = {
  intro: 'INTRO',
  play: 'PLAY'
}
let currentState = state.intro;

let instructions = [
  'Face The Music.',
  'When your webcam feed appears:\n'
  +'\nSlide your chair back a bit,'
  +' so your arms are in the frame. Put your hands up and ' +
  'move them around to generate music.',
  'Click the mouse at any time to hear a beat.' +
  '\nMove your face closer to the camera to slow it down, ' +
  'or back away to speed it up.',
  'Finally, What\'s your mood today?'
];
let next = 'CLICK TO CONTINUE ▶'
let index = 0;
let introSize, introX, introY;
let nextX, nextY;
// Images to select mood
let comedy, tragedy;
let comedyX, comedyY, tragedyX, tragedyY;
let imgSize;
// Control for mousepressed
let selectMood = false;

// Pose tracking variables
let poseNet;
let poses = [];
let faceParts = ["leftEar", "leftEye", "nose", "rightEye", "rightEar"];
let facePositions = [];
let positionIndex = 0;

// Music
let leftSynth;
let rightSynth;
let drumTempo;
let space, sniff, pop, click, breath, clap;
let drumSounds = [];
let drumPattern = [];
let currentSound;
let stereoPanner;

// Major pentatonic scales
const C_MAJOR = ['C','D','E','G','A'];
const D_MAJOR = ['D','E','F#','A','B'];
const E_MAJOR = ['E','F#','G#','B','C#'];
const F_MAJOR = ['F','G','A','C','D'];
const G_MAJOR = ['G','A','B','D','E'];
const A_MAJOR = ['A','B','C#','E','F#'];
const B_MAJOR = ['B','C#','D#','F#','G#'];
// Minor pentatonic scales
const C_MINOR = ['C','D#','F','G','A#'];
const D_MINOR = ['D','F','G','A','C'];
const E_MINOR = ['E','G','A','B','D'];
const F_MINOR = ['F','G#','A#','C','D#'];
const G_MINOR = ['G','A#','C','D','F'];
const A_MINOR = ['A','C','D','E','G'];
const B_MINOR = ['B','D','E','F#','A'];
// Arrays of scales
const majorScales = [C_MAJOR, D_MAJOR, E_MAJOR, F_MAJOR, G_MAJOR, A_MAJOR, B_MAJOR];
const minorScales = [C_MINOR, D_MINOR, E_MINOR, F_MINOR, G_MINOR, A_MINOR, B_MINOR];
// Variable to hold current scale
let currentScale;
// Possible octave range
let octaves = [5,4,3,2];
// Current octave
let octave;
// current note
let note;

// Prevent multiple mousePressed calls
let pressed = false;

// preload()
//
// Preload images
function preload() {
  comedy = loadImage('assets/images/comedy.png');
  tragedy = loadImage('assets/images/tragedy.png');
}

// setup()
//
// Setup canvas, PoseNet, sounds
function setup() {
  // Set width and height to maintain webcam aspect ratio
  // for either screen orientation
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

  /*--Start code copied from PoseNet documentation--*/

  // Initialize PoseNet
  // Fill poses array with results every time a new pose is detected
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', results => {
    poses = results;
  });

  /*--End code copied from PoseNet documentation--*/

  // Setup drum sounds and synth instruments
  setupSounds();

}



// setupSound()
//
// Set up synth instruments and sounds for drum beat
function setupSounds() {
  // Instantiate audiosynth
  Synth instanceof AudioSynth;
  // Lower volume
  Synth.volume = 0.5;
  // Create two organ instruments to be controlled
  // by left and right hands
  leftSynth = Synth.createInstrument('organ');
  rightSynth = Synth.createInstrument('organ');

  // Load drum sounds
  clap = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/clap.wav'
    }
  });

  pop = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/pop.wav'
    }
  });

  click = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/click.wav'
    }
  });

  // Setup stereo pan effect
  stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: 0
  });

  // Enter sounds into drum pattern array
  drumPattern = [pop, click, clap];
  // Add effects to drum sounds
  for (let i = 0; i < drumSounds.length; i++) {
    drumPattern[i].addEffect(stereoPanner);
  }

}

/*--Start code copied from PoseNet documentation--*/

function modelReady() {
  console.log('Model Loaded');
}

/*--End code copied from PoseNet documentation--*/

// mousePressed()
//
// Start drum bean when mouse mouse pressed
function mousePressed() {
  // If during intro
  if (currentState === state.intro) {
    // Increase index to move through instructions
    index++;
    // If end of introduction reached (mood selection)
    if (selectMood) {
      // If the mask of comedy is clicked
      if (mouseX > comedyX - imgSize/2 && mouseX < comedyX + imgSize/2) {
        if (mouseY > comedyY - imgSize/2 && mouseY < comedyY + imgSize/2) {
          // Set random organ scale in Major key
          currentScale = random(majorScales);
          console.log('comedy');
          // Set tint to rose (happy)
          r = 255;
          g = 207;
          b = 196;
          // Wait one second then start play
          setTimeout(() => {
            currentState = state.play;
          }, 1000);
        }
      }
      // If the mask of tragedy is clicked
      else if (mouseX > tragedyX - imgSize/2 && mouseX < tragedyX + imgSize/2) {
        if (mouseY > tragedyY - imgSize/2 && tragedyY < tragedyY + imgSize/2) {
          // Set random organ scale in Minor key
          currentScale = random(minorScales);
          console.log('tragedy');
          // Set tint to blue (sad)
          r = 42;
          g = 136;
          b = 224;
          setTimeout(() => {
            currentState = state.play;
          }, 1000);
        }
      }
      // If another point on the screen is clicked
      else {
        // Maintain instructions index so user can click again
        index = instructions.length - 1;
      }
    }
  }

  // If playing, drum beat starts on first click
  if (currentState === state.play) {
    if (!pressed) {
      setTimeout(drumBeat, 35);
    } else {
      console.log('already pressed!');
    }
    // Prevent from being called more than once
    pressed = true;
  }
}


// draw()
//
// Main loop
function draw() {
  background(0);

  if (currentState === state.intro) {
    intro();
  }
  else if (currentState === state.play) {
    playMusic();
  }

}

// intro()
//
// Main intro loop with instructions
function intro() {
  fill(255);
  introX = width/5;
  introY = height/2.5;
  let s = width * 0.02;
  // Title is larger
  if (index === 0) {
    s = width * 0.04;
  }
  // Text size is responsive
  introSize = constrain(s, 20, 60);
  textFont('Helvetica');
  textSize(introSize);
  text(instructions[index], introX, introY, width/2.5, height);

  if (index < instructions.length - 1) {
    nextX = width/5;
    nextY = height/6 * 4;
    textSize(18);
    text(next, nextX, nextY);
  }
  // Once we arrive at the final instruction
  // Display the masks of comedy and tragedy to select mood
  else if (index === instructions.length - 1) {
    imgSize = 150;
    comedyX = introX;
    comedyY = introY + s * 2;
    tragedyX = comedyX + imgSize;
    tragedyY = comedyY + s;
    image(comedy, comedyX, comedyY, imgSize, imgSize);
    image(tragedy, tragedyX, tragedyY, imgSize, imgSize);
    selectMood = true;
  }

}


// playMusic()
//
// Main play loop
function playMusic() {
  // Display webcam video as image on canvas
  // Flip video horizontally so
  // left-right motions are more intuitive
  tint(r,g,b);
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);

  trackFacePoints();
  playTone();
}

// findFacePoints()
//
// Determines position of face keypoints
function trackFacePoints()  {
  // Loop through all the poses detected
  /*---Note: loop structure adapted from PoseNet documentation---*/
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < 4; j++) {
      // pass keypoint object to variable
      let keypoint = poses[i].pose.keypoints[j];
      // If keypoint is part of face and confidence score is high enough
      for (let f = 0; f < faceParts.length; f++) {
         if (keypoint.part === faceParts[f] && keypoint.score > 0.2) {
           // Add to facePosition array
           facePositions[f] = keypoint.position.x;
         }
       }
    }
  }
}

// playTone()
//
// Play left and right synths according to position of wrist keypoints
function playTone() {
  // Loop through poses detected
  for (let i = 0; i < poses.length; i++)  {
    // Select wrist keypoints, pass position to variables
    let leftWrist = poses[i].pose.keypoints[9].position;
    let rightWrist = poses[i].pose.keypoints[10].position;

    // If keypoint position detected, play synth
    // Note determined by y-position and octave determined by x-position
    if (checkNote(leftWrist.y) != undefined) {
      leftSynth.play(checkNote(leftWrist.y), checkOctave(leftWrist.x), 2);
    }
    if (checkNote(rightWrist.y) != undefined) {
      rightSynth.play(checkNote(rightWrist.y), checkOctave(rightWrist.x), 2);
    }
  }
}


// checkNote()
//
// Divide canvas into sections by height, each section corresponds to a note
// Check which section a keypoint is in and return corresponding note
function checkNote(keypoint) {
  let h = height/11;
  for (let i = 0; i < currentScale.length; i++) {
    if (keypoint > i * h && keypoint < h * (i + 1)) {
      note = currentScale[i];
      return note;
    }
  }
}

// checkOctave()
//
// Divide canvas into sections by width, each section corresponds to an octave
// Check which section a keypoint is in and return corresponding octave
function checkOctave(keypoint) {
  let o = width/4;
  for (let i = 0; i < octaves.length; i++) {
    if (keypoint > i * o && keypoint < o * (i + 1)) {
      octave = octaves[i];
      return octave;
    }
  }
}




// drumBeat()
//
// Play drum sounds corresponding to face parts
// Tempo controlled by real-time x-distance between face parts
function drumBeat(continueInterval = true) {
  // Update tempo
  setTempo();

  // Set sound according to part of face, panning left-right
  // Stereo pan effect also moves left to right
  switch (faceParts[positionIndex]) {
    case 'leftEar':
      stereoPanner.pan = -1;
      currentSound = drumPattern[0];
      break;

    case 'leftEye':
      stereoPanner.pan = -0.5;
      currentSound = drumPattern[1];
      break;

    case 'nose':
      stereoPanner.pan = 0;
      currentSound = drumPattern[2];
      break;

    case 'rightEye':
      stereoPanner.pan = 0.5;
      currentSound = drumPattern[1];
      break;

    case 'rightEar':
      stereoPanner.pan = 1;
      currentSound = drumPattern[0];
      break;

    default:
      break;
  }
  // Play sound
  currentSound.play();

  // Recursively call this function, with updated tempo
  if (continueInterval) {
    console.log('timeout set!');
    setTimeout(drumBeat, drumTempo);
  }

  // Update position index
  positionIndex++;
  // If end of the array is reached, reset index to zero
  if (positionIndex >= facePositions.length) {
    positionIndex = 0;
  }

}

// setTempo()
//
// Sets the drum tempo according to average distance between face keypoint
// Tempo gets faster the further away you are from the camera
function setTempo() {
  let averageDistance = 0;
  let distance = 0;
  // Calculate distance between each point (ears, eyes, nose)
  for (let i = facePositions.length - 1; i > 0; i--) {
    distance = facePositions[i] - facePositions[i - 1];
    // Add to total
    averageDistance += distance;
  }

  // Divide by total number of face keypoints to find average distance
  // Multiply by 10 to get a reasonable tempo
  averageDistance = (averageDistance / facePositions.length) * 10;
  if (averageDistance < 0) {
    averageDistance = averageDistance * -1;
  }
  console.log('average:' + averageDistance);
  // Constrain so tempo can't get too slow or too fast
  averageDistance = constrain(averageDistance, 75, 1500);
  // Set drum tempo according to average distance
  drumTempo = averageDistance;
}
