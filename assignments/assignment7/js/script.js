"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
let noteTempo = 500;
let options = [500,1000,2000];
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

// Prevent duplicate mouse-clicks
let clicked = false;
// Frequency to trigger pause / rest (never played by synth)
let silence = 16.35;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220,246.94,277.18,293.66,329.63,369.99,415.30,silence
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;
// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let pattern = ['x','*','xo*',' ','x','x','xo','*'];
// Which beat of the pattern we're at right now
let patternIndex = 0;
// Effects
let pingPongDelay, reverb, stereoPanner;
let pan = 1;

// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });

  // Load the three drum sounds as wav files
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

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });

  // Add effects
  pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5
  });
  kick.addEffect(pingPongDelay);

  reverb = new Pizzicato.Effects.Reverb({
    time: 1,
    decay: 2,
    mix: 0.89
  });
  synth.addEffect(reverb);

  stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: pan
  });
  snare.addEffect(stereoPanner);
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  if (!clicked) {
    // Start an interval for the notes
    setTimeout(playNote,noteTempo);
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);
  } else {
    console.log('Nope!');
  }

  clicked = true;
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote(continueInterval = true) {
  console.log('called');
  console.log('continue: ' + continueInterval)
  console.log('note tempo: ' + noteTempo);
  // Pick a random frequency from the array
  let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
  // Set the synth's frequency
  synth.frequency = frequency;
  // If it's not 'silence' play it, otherwise stop
  if (frequency != silence) {
    synth.play();
    console.log('playing: ' + frequency);
  }
  else if (frequency === silence) {
    synth.stop();
    console.log('rest');
  }

  noteTempo = random(options);

  if (continueInterval) {
      setTimeout(playNote,noteTempo);
    }


}

// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Set pan
  stereoPanner.pan = random(-1,1);
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
