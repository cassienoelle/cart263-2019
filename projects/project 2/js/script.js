'use strict';
/*****************

Simon Says
Cassie Smith
CART 263 -2019

Simon Says green is blue and 2 + 2 = 5. Well, not that last one. He's too good at math.
Play the classic 80s Simon Says game with a twist.

Match Simon by speaking his colour patterns aloud.
Careful, he might switch things up on you by remixing the colours and keywords.

******************/
// PIXI APP
// Class references
const {Application, Graphics, Sprite, Container,Text, TextStyle, lights, display} = PIXI;

// Setup Pixi application
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
// Aliases for window width and height
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
}

/*** -----------LOADER, SOUNDS, STATE---------------- ***/

// Load sprite texture
PIXI.loader
  .add('assets/images/ear.png')
  .add('assets/images/eye.png')
  .add('assets/images/eyeball.png')
  .add('assets/images/soundImg.png')
  .load(setup);

// Load sounds
let sound = PIXI.sound.add({
  beep: 'assets/sounds/beep.wav'
});

// Game state
let state;

// Object to hold JSON data
let dataObject;

/*------- GAME BOARD ------*/

// Base circle shape
let circle = new Graphics();
let radius;
// Variables to hold circle bounding box and
// coordinates for vertices of Quadrant base triangles
let board;
let vertex;

// Quarter-circle quadrants and
// Array to hold quadrants for random selection
let quadrants = [];
let topLeft;
let topRight;
let bottomLeft;
let bottomRight;

// Quadrant relative position
let position = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};
// Quadrant colours and colour keywords
let colors = {
  green: 0x007E2D,
  brightGreen: 0x2AFC16,
  red: 0X8A0900,
  brightRed: 0xFF3D00,
  blue: 0x0859A5,
  brightBlue: 0x00ADFF,
  yellow: 0xB89B07,
  brightYellow: 0xFFF500,
  white: 0xFFFFFF,
  black: 0x000000,

  keys: {
    green: 'green',
    red: 'red',
    blue: 'blue',
    yellow: 'yellow'
  }
};

// Black overlay (center circle and stroke) to complete board
let outlines = new Graphics();

// Sprites
let ear, eye, eyeball, eyeBounds, eyeballBounds;
let soundAnimation;
let soundTicker;
let scaleEar, scaleSound;
let revertEar;
let count = 0;
let rcount = 0;
let scount = 0;
let animation = {
  hover: 'hover',
  shrink: 'shrink'
}

// Text
let phrase = ' ';
let text, style;

// Counts how many times intro() is called
let introCounter = 0;
// Counts how many rounds have been played
let roundsPlayed = 0;

// Current voice for responsive voice
let currentVoice;

/*------ MAIN INTERACTION ------*/

// Array of current keywords
// Also corresponds to annyang commands object properties
let currentKeywords = [
  colors.keys.green,
  colors.keys.red,
  colors.keys.blue,
  colors.keys.yellow
]

// Interval for light flash
const INTERVAL = 500;
// Length of flash
const rapid = 'rapid';
const short = 'short';
const long = 'long';
// Currently lit quadrant
let currentLight;
// Most recent light pattern
let currentPattern = [];
// Pattern length (number of flashes)
let patternLength = 1;
// Counter to control pattern length
let flashed = 0;

// User input
let input = false;
let choices = [];
let currentChoice;
let correct = 0;
let incorrect = 0;
let result;

// Sound filters
sound.beep.filters = [
  new PIXI.sound.filters.TelephoneFilter(),
  new PIXI.sound.filters.DistortionFilter(1),
  new PIXI.sound.filters.ReverbFilter(3, 15)
];

/*------ MAIN METHODS ------*/

// setup()
//
//
function setup() {
  console.log('setup');

  // Get data from json file and store in variable
  $.getJSON('data/data.json', function(data) {
    console.log('json');
    dataObject = data;
  });

  // Draw the interface
  drawBoard();
  setupQuadrants();
  drawQuadrants();
  displayQuadrants();
  drawOutlines();
  displayOutlines();
  setupSprites();
  setupText();

  // Pass initial keywords to quadrants (keyword property)
  // and voice commands object
  passKeywords();

  // Initialize annyang, add commands
  setupVoiceCommands();

  // Initialize click event to start game
  outlines.interactive = true;
  outlines.on('click', startGame);

  ear.interactive = true;
  ear.on('click', changeBoard)

  // Set game state
  state = play;

  // Start game loop
  app.ticker.add(delta => gameLoop(delta));

}


function setupVoiceCommands() {
  // Setup annyang
  if (annyang) {

    // Add commands to annyang
    annyang.addCommands(setVoiceCommands());

    // log to the console when input detected
    annyang.addCallback('soundstart', () =>{
        console.log('sound detected');
    });

    // Play animation when a command is spoken
    annyang.addCallback('resultMatch', () =>{
      console.log('result match');
      soundAnimation.visible = true;
      soundTicker.start();
    });

    // Start listening (but pause right away)
    annyang.start();
    annyang.pause();
  }
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
// Loop; Main state while game is in play
function play(delta) {
  drawQuadrants();
  drawOutlines();
}

function startGame() {
  console.log('clicked');
  currentVoice = 'UK English Male';
  text.visible = false;
  intro();
}

function changeBoard() {
  let options = [1,2,3];
  let next = getRandomElement(options);

  // if (next === 1) {
  //   currentVoice = 'UK English Male';
  //   replaceQuadColors();
  // }
  // else if (next === 2) {
  //   currentVoice = 'UK English Male';
    prependAdjective();
  // }
  // else if (next === 3) {
  //   console.log(3);
  //   currentVoice = 'Welsh Male';
  //   rapidFlash();
  // }

}


function clickThree() {
  console.log('adjective');
  prependAdjective();
  // console.log('clicked info');
  // console.log('CURRENT KEYWORDS');
  // console.log(currentKeywords[0]);
  // console.log(currentKeywords[1]);
  // console.log(currentKeywords[2]);
  // console.log(currentKeywords[3]);
  // console.log('CURRENT QUADRANT KEYWORDS');
  // console.log(quadrants[0].keyword);
  // console.log(quadrants[1].keyword);
  // console.log(quadrants[2].keyword);
  // console.log(quadrants[3].keyword);
  // console.log('CURRENT COMMAND KEYS');
}

// intro(first)
//
// Simon introduces himself and gameplay
function intro(first) {
  // Disable click event handler
  outlines.interactive = false;

  console.log('intro');
  let options = {
    rate: 1.5,
    onstart: ()=>{introCounter++},
    onend: wait
  }
  // Initial instructions when game is first started
  // calls wait() while Simon finishes speaking, then demonstrates keywords
  if (first) {
    responsiveVoice.speak(simonSays.instructions.hello,currentVoice);
    responsiveVoice.speak(simonSays.instructions.initial,currentVoice);
    responsiveVoice.speak(simonSays.instructions.speed,currentVoice, options);

  //-----------------
  // showKeywords() calls back this part of the function
  // asks the user if they are ready / prompts main gameplay
  } else {
    responsiveVoice.speak(simonSays.instructions.ready,currentVoice,{onend: okayGo});
    // Make ear visible to show Simon is listening
    ear.visible = true;
    // Set text
    text.text = 'YES? NO?';
    style.fill = colors.brightRed;
  }

  //-----------------

  // Builds in a short delay for Simon to stop speaking
  // before calling next function
  function wait() {
    let i = setInterval(() =>{
      if (!responsiveVoice.isPlaying() && introCounter > 0) {
        clearInterval(i);
        showKeywords();
      }
    },250);
  }


  // Display text showing response options
  function okayGo() {
    setTimeout(() => {
      // annyang is listening
      annyang.resume();
      if (introCounter <= 1) {
        text.visible = true;
        introCounter ++;

      }
    }, 1500);
  }

}

// setupText()
//
// Sets up text prompts for display in center of gameboard
function setupText() {
  console.log('text');
  // Pull phrase from data
  phrase = (simonSays.instructions.clickToStart.toUpperCase());
  // Set text style
  style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: (radius/2.5) / 5,
    fontWeight: 'bold',
    fill: 0xFFFFFF,
    wordWrap: true,
    wordWrapWidth: radius/2.5,
    align: 'center'
  });
  // Declare text object
  text = new Text(phrase, style);
  // Set anchor point to center and position in center of gameboard
  text.anchor.set(0.5);
  text.x = circle.x;
  text.y = circle.y;

  // Append to stage
  app.stage.addChild(text);

  // Add animation
  let counter = 0;
  app.ticker.add((delta) =>{
    text.scale.x = style.wordWrapWidth/200 + Math.sin(count) * 0.01;
    text.scale.y = style.wordWrapWidth/200 + Math.sin(count) * 0.01;
    counter += 0.1;
  });

}


// lightPattern(length)
//
// Animate a new random light pattern for user to follow
// set the length of the pattern according to passed argument
function lightPattern(length) {
  console.log(length);
  let interval = INTERVAL * 2;
  // Clear arrays and reset counters with each new pattern
  correct = 0;
  incorrect = 0;
  choices = [];
  currentPattern = [];
  flashed = 0;
  currentLight = undefined;


  // Every interval, light up the current quadrant, then randomly select a new quadrant
  // Loop through until full pattern sequence is completed, saving each keyword in array
  let pattern = setInterval(() => {
    // Light up a random quadrant
    currentLight = quadrants[Math.floor(Math.random() * quadrants.length)];
    currentLight.lightUp(short);
    PIXI.sound.play('beep');
    // Save that quadrant's keyword to array holding current pattern sequence
    currentPattern.push(currentLight.keyword);
    flashed ++;
    // Pattern complete when length of sequence matches argument passed
    // Stop adding to sequence and start accepting user voice input
    if (flashed >= length) {
      clearInterval(pattern);
      setTimeout(() =>{
        acceptInput();
      }, interval * 1.5);

    }
  }, interval);

  console.log(currentPattern);
}

// acceptInput()
//
// Receives speech input from user (speaking back light pattern)
// Checks user input against pattern
function acceptInput() {
  // Voice prompt for user input
  let options = {
    pitch: Math.random() * 2 ,
    rate: 1.25
  };
  responsiveVoice.speak('Your turn!', currentVoice, options);
  // Start accepting input, resume annyang
  input = true;
  annyang.resume();
  // Display ear animation to show that Simon is listening
  ear.visible = true;
}

// checkInput()
//
// Check voice input against light pattern to see if it's a match
// Gets called when a voice command is registered by annyang
function checkInput() {
  // Update rounds played counter
  roundsPlayed++;
  // Make sure we are accepting input
  if (input) {
    // When user has attempted full pattern (same number of choices)
    if (choices.length === currentPattern.length) {
      // Compare array of user choices to computer-generated pattern
      for (let i = 0; i < choices.length; i++) {
        if (choices[i] === currentPattern[i]) {
          // Log number of correct matches
          correct++;
          console.log('right:' + correct + ' ' + i);
        } else {
          // Log number of incorrect matches
          incorrect++;
          console.log('wrong:' + incorrect + ' ' + i);
        }
      }
      // Don't accept any more input, pause annyang
      input = false;
      annyang.pause();
      // If patterns match, user wins
      if (incorrect === 0 && correct === currentPattern.length) {
        // Increase pattern length for next round
        patternLength++;
        console.log('winner!');
        // Every 5 rounds, remix the keywords
        if (roundsPlayed % 5 === 0) {
          remix();
        }
        else {
          // Call a fresh pattern
          lightPattern(patternLength);
          console.log('pattern length: ' + patternLength);
        }

      }
      // If patterns don't match, user loses
      else if (incorrect > 0) {
        // Reset pattern length to one flash
        patternLength = 1;
        console.log('loser!');
        // Call a fresh pattern
        lightPattern(patternLength);
        console.log('pattern length: ' + patternLength);
      }
    }
  }
  // If not accepting input when function is called, log message to console
  else {
    console.log('not accepting input');
  }

}

// remix()
//
// Shuffle quadrant keywords (keep display the same)
// so that keywords are now associated with the wrong color
// (note: this doesn't set totally new keywords)
function remix() {
  // Pause annyang
  input = false;
  annyang.pause();

  // Hide ear because Simon isn't listening
  ear.visible = false;

  // Simon calls out 'reeeemiiiix'
  let options = {
    rate: 0.2,
    pitch: 1.3
  }
  responsiveVoice.speak(simonSays.remix,currentVoice,options);

  // Shuffle current keywords and pass to voice commands
  shuffleKeywords();
  console.log('shuffled-remix');
  // Flash quadrants in rapid succession
  rapidFlash();
}

// rapidFlash()
//
// Flashes quadrants in rapid succession to show a change
// is occurring in color and/or keyword
function rapidFlash() {

  let index;
  let i = 0;
  let rapidFlash = setInterval(() => {

    index = Math.floor(Math.random() * quadrants.length);
    quadrants[index].lightUp(rapid);
    i++;
    // Flash a random quadrant 20 times then clear
    // and have Simon demonstrate the new setup
    if (i > 20) {
      clearInterval(rapidFlash);
      showKeywords();
    }

  }, INTERVAL/4);

}

// replaceQuadColors()
//
// Totally change the quadrant colors and matching keywords
function replaceQuadColors() {

  let randomColor;
  let hex;
  // Iterate through quadrants clockwise
  for (let i = 0; i < quadrants.length; i++) {
    // Get a random color object from data and standardize hex code format
    randomColor = getRandomElement(dataObject.colors);
    hex = randomColor.hex.replace('#', '0x');
    // Set the 'lit' quadrant color to new color and
    // Make the overlay a semi-transparent black to darken it
    quadrants[i].lightColor = hex;
    quadrants[i].maxAlpha = 0.4;
    quadrants[i].a = quadrants[i].maxAlpha;
    quadrants[i].color = colors.black;
    // Update current keywords based on new color, inserting spaces
    // between words if color name is more than one word
    currentKeywords[i] = insertSpaces(randomColor.color);
  }

  // Pass the new keywords to quadrants and annyang commands
  passKeywords();
  // Flash quadrants to animate change and have Simon demonstrate new keywords
  rapidFlash();
}

// insertSpaces(string)
//
// Insert a space before every capitalized word in a string
function insertSpaces(string){
  console.log(string);
  // Array to save indices of each capital letter
  let spaceHere = [];
  // Run through string and log index of every capital letter to array
  for (let i = 0; i < string.length; i++) {
    // Check each character against upper case variant
    if (string[i] === string[i].toUpperCase()) {
      console.log(i + 'is uppercase');
      // Push to array if upper case
      spaceHere.push(i);
    }
  }
  // Add spaces to string using index numbers saved to spaceHere array
  // Don't add a space in front of the first word (assumes first word is capitalized)
  for (let i = 1; i < spaceHere.length; i++) {
    // Increase index numbers to account for new string length including spaces
    spaceHere[i] += (i - 1)
    // Slice the string at the appropriate index, add a space and reconcatenate
    string = string.slice(0,spaceHere[i]) + ' ' + string.slice(spaceHere[i]);
    console.log('new string: ' + string);
  }

  // Return the new string with spaces!
  return string;
}

// prependAdjective
//
// Prepend an adjective to the front of each quadrant color keyword
// Remove any existing adjectives first
function prependAdjective() {
  let options = [1,2];
  let property = getRandomElement(options);
  let randomAdjective;
  let arrayOfWords;
  // Iterate through quadrants
  for (let i = 0; i < quadrants.length; i++) {
    // If the current keyword is more than one word split words into array
    // the noun will be the last item in the array
    arrayOfWords = currentKeywords[i].split(' ');
    // Get a random ajective from data
    if (property === 1) {
      randomAdjective = getRandomElement(dataObject.adjectives);
    }
    else if (property === 2) {
      randomAdjective = getRandomElement(dataObject.expletives);
    }
    // Insert spaces if needed
    randomAdjective = insertSpaces(randomAdjective);
    // Replace adjectives
    currentKeywords[i] = arrayOfWords[arrayOfWords.length - 1].replace(/^/, randomAdjective + ' ');
  }

  // Pass the new keywords to quadrants and annyang commands
  passKeywords();
  // Flash quadrants to animate change and have Simon demonstrate new keywords
  rapidFlash();
}

// shuffleKeywords()
//
// Shuffle the array of current keywords and
// pass new associations to quadrants and voice commands
function shuffleKeywords() {
  // Fisher-Yates function to shuffle arrays
  Array.prototype.shuffle = function() {
    let input = this;

    for (let i = input.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  }

  // Shuffle the current keywords
  currentKeywords.shuffle();
  // Pass keywords to quadrants and voice commands
  passKeywords();
}

// passKeywords()
//
// Set quadrant keyword properties and voice commands
function passKeywords() {
  // Associate keywords to quadrants in clockwise order
  for (let i = 0; i < quadrants.length; i++) {
    quadrants[i].keyword = currentKeywords[i];
  }

  // Reset voice commands with new associations
  annyang.removeCommands();
  annyang.addCommands(setVoiceCommands());

}

// showKeywords()
//
// Have Simon demonstrate keywords by flashing quadrants
// clockwise and speaking related keyword aloud
function showKeywords() {
  // Don't accept voice input
  input = false;
  annyang.pause();

  let interval = INTERVAL * 4;
  let i = 0;
  // Flash each quadrant once, moving clockwise
  // and speak each current quadrant keyword
  let speakKeys = setInterval(() => {

    // Check if all the quadrants have flashed and
    // if so clear interval and call the next function
    if (i >= quadrants.length) {

      console.log('showKeywords done');
      clearInterval(speakKeys);

      // Ask if user ready?
      intro();
    }

    // If not all quadrants have flashed
    // continue calling interval and moving clockwise
    else {
      console.log('speaking');
      currentLight = quadrants[i];
      currentLight.lightUp(long);
      i ++;
      console.log('i: ' + i);
    }

  }, interval);

}


// drawBoard()
//
// Create classic Simon interface
function drawBoard() {
  // Set radius so circle fits to window with slight margin
  // adapt for portrait or landscape orientation
  if (width >= height) {
    radius = (height * 0.9) / 2;
  } else if (height > width) {
    radius = (height * 0.9) / 2;
  }
  // Draw circle at center of canvas
  circle.beginFill(colors.black);
  circle.drawCircle(0, 0, radius);
  circle.x = width/2;
  circle.y = height/2;
  circle.endFill();
  app.stage.addChild(circle);

}

// getVertices()
//
// Determine vertices for quadrants according to base circle
function getVertices() {
  // Determine outer edges of circle
  board = circle.getBounds();
  // Set vertices for four ajacent triangles
  // at circle center and edges
  vertex = {
    // center
    cx: circle.x,
    cy: circle.y,
    // top
    tx: circle.x,
    ty: board.top,
    // right
    rx: board.right,
    ry: circle.y,
    // left
    lx: board.left,
    ly: circle.y,
    // bottom
    bx: circle.x,
    by: board.bottom
  }
}

// setup Quadrants()
//
// Create quadrant objects
function setupQuadrants() {

  getVertices();

  // Create quadrant objects and populate array
  quadrants[0] = topLeft = new Quadrant(position.LEFT,position.TOP,radius,colors.green,colors.brightGreen,1,INTERVAL,undefined);
  quadrants[1] = topRight = new Quadrant(position.RIGHT,position.TOP,radius,colors.red,colors.brightRed,1,INTERVAL,undefined);
  quadrants[2] = bottomRight = new Quadrant(position.RIGHT,position.BOTTOM,radius,colors.blue,colors.brightBlue,1,INTERVAL,undefined);
  quadrants[3] = bottomLeft = new Quadrant(position.LEFT,position.BOTTOM,radius,colors.yellow,colors.brightYellow,1,INTERVAL,undefined);

}

// drawQuadrants()
//
// Draw the quadrants as primitive shapes using vertices as reference
// (call in setup and game loop)
function drawQuadrants() {
  topLeft.draw();
  topRight.draw();
  bottomRight.draw();
  bottomLeft.draw();
}

// displayQuadrants()
//
// Display quadrants on screen
// Appends quadrants to stage (call once in setup)
function displayQuadrants() {

  topLeft.display();
  topRight.display();
  bottomRight.display();
  bottomLeft.display();
}

// drawOutlines()
//
// Draw the black circle at center of the gameboard and lines between quadrants
// (call in game loop so always rendered on top of quadrants)
function drawOutlines() {

  outlines.clear();
  outlines.lineStyle(30, colors.black, 1, 0.5)
  outlines.beginFill(colors.black);
  outlines.drawCircle(circle.x, circle.y, radius/2.5);
  outlines.moveTo(board.left, circle.y);
  outlines.lineTo(board.right, circle.y);
  outlines.moveTo(circle.x, board.top);
  outlines.lineTo(circle.x, board.bottom);
  outlines.endFill();

}

// displayOutlines()
//
// Display outlines, append to stage (call once in setup)
function displayOutlines() {

  app.stage.addChild(outlines);

}

// setup Sprites()
//
// Create sprites and add animation to tickers
function setupSprites() {
  // This is an ear that hangs out in the center of the gameboard
  // to show that Simon is listening
  ear = new Sprite(
    PIXI.loader.resources['assets/images/ear.png'].texture
  );
  app.stage.addChild(ear);
  // Position and scale
  ear.anchor.set(0.5);
  ear.x = width/2;
  ear.y = height/2;
  scaleEar = (radius/2.5) / (ear.height * 0.7);
  ear.scale.set(scaleEar,scaleEar);

  // Add to the ticker to animate
  // Lightly pulsates in position
  app.ticker.add((delta) =>{
    ear.scale.x = scaleEar + Math.sin(count) * 0.01;
    ear.scale.y = scaleEar + Math.cos(count) * 0.01;
    count += 0.1;
  });
  // Hide until revealed
  ear.visible = false;

  // This is a circle that represents sound entering the ear
  // It appears every time a voice command is registered
  soundAnimation = new Sprite(
    PIXI.loader.resources['assets/images/soundImg.png'].texture
  );
  app.stage.addChild(soundAnimation);
  // Position and scale
  scaleSound = (radius/2.5) / (soundAnimation.height * 0.5);
  soundAnimation.anchor.set(0.5);
  soundAnimation.x = width/2;
  soundAnimation.y = height/2;
  soundAnimation.scale.set(scaleSound,scaleSound);

  // Create a separate ticker for the sound animation
  soundTicker = new PIXI.ticker.Ticker();
  soundTicker.autostart = false;
  // Gets smaller so it appears to go 'into' ear
  soundTicker.add((delta) => {
    soundAnimation.scale.x = scaleSound - rcount;
    soundAnimation.scale.y = scaleSound - rcount;
    soundAnimation.alpha = 0.5 - rcount;
    rcount += 0.01;
    // Reset size
    if (soundAnimation.width < 5) {
      soundAnimation.visible = false;
      soundAnimation.scale.x = scaleSound;
      soundAnimation.scale.y = scaleSound;
      rcount = 0;
      soundTicker.stop();
    }
  });
  // Stop animationi and hide until a new voice command is registered
  soundTicker.stop();
  soundAnimation.visible = false;
}

// setVoiceCommands()
//
// Set commands for annyang voice recognition
function setVoiceCommands() {
  let commands = {
    // These are the four quadrant keywords / current keywords
    // Light up the associated quadrant and log keyword to choices array
    [quadrants[0].keyword]: () => {
        console.log('you just said: ' + quadrants[0].keyword);
        currentChoice = currentKeywords[0];
        quadrants[0].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[1].keyword]: () => {
        console.log('you just said: ' + quadrants[1].keyword);
        currentChoice = currentKeywords[1];
        quadrants[1].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[2].keyword]: () => {
        console.log('you just said: ' + quadrants[2].keyword);
        currentChoice = currentKeywords[2];
        quadrants[2].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    [quadrants[3].keyword]: () => {
        console.log('you just said: ' + quadrants[3].keyword);
        currentChoice = quadrants[3].keyword;
        quadrants[3].lightUp(short);
        choices.push(currentChoice);
        checkInput();
    },
    'yes': () => {
      // Hide text and start game play
      text.visible = false;
      let options = {pitch: 0.5, rate: 0.6}
      setTimeout(() => {
        responsiveVoice.speak('Let\'s play', currentVoice, options);
      }, 1000);
      setTimeout(() => {
        lightPattern(patternLength);
      }, 3000);
      annyang.pause();
    },
    // Hide text and admonish user, then ask 'are you ready?' again
    'no': () => {
      text.visible = false;
      let activity = getRandomElement(dataObject.activities);
      let reaction = getRandomElement(simonSays.reactions);
      let admonishment = getRandomElement(simonSays.admonishment);
      responsiveVoice.speak(reaction + 'too busy ' + activity + '? ' + admonishment);
      setTimeout(() => {
        intro();
      }, 10000);
    }
  };

  return commands;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
