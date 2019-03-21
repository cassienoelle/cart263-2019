"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let frequencies = [
  138.59, // E
  185.00, // F#
  196.00, // G
  220.00, // A
  246.94, // B
  261.63, // C
  293.66  // D
];

let synth;
let kick, snare, hihat;
let frequency;

let pattern = [
  'x',
  'o',
  'x*',
  'x',
  'o',
  'xo',
  'o',
  '*'
];

let patternIndex = 0;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  synth = new Pizzicato.Sound({
    source: 'wave'
  });

  kick = new Pizzicato.Sound('assets/sounds/kick.wav');
  snare = new Pizzicato.Sound('assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('assets/sounds/hihat.wav');
}

// draw()
//
// Description of draw()

function draw() {

}

function playNote() {
  frequency = random(frequencies);
  synth.frequency = frequency;
  synth.play();
}

function playDrum() {
  let symbols = pattern[patternIndex];
  if (symbols.indexOf('x') != -1) {
    kick.play();
  };
  if (symbols.indexOf('o') != -1) {
    snare.play();
  };
  if (symbols.indexOf('*') != -1) {
    hihat.play();
  }

  patternIndex++;
  if (patternIndex === pattern.length) {
    patternIndex = 0;
  }
}

function mousePressed() {
  console.log('pressed');

  setInterval(playNote, 500);
  setInterval(playNote, 125);

  setInterval(playDrum, 125);
}
