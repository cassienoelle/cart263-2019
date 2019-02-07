"use strict";

/*****************

Hold miscellaneous pieces of code for later use

******************/
// Progress bar variables
let $progressbar;
let $progress = 0;


let $state;
let $username = undefined;

// Array of objects representing quiz questions
let $questions = [];



// setupInterface()
//
//
function setupInterface() {
  // setup progress bar
  $progressbar.progressbar({
    value: $progress
  });

  if ($state === 'INIT') {
    // hide main sidebar content until quiz initiated
    console.log('init');
    $sidebar.hide();
  }
  else if ($state === 'ACTIVE') {
    $introImage.hide();
  }

  console.log($('.imgOption').css('width'));

}


/* fix this!

function createButton() {

  let $playButton = $('<button id="play"></button>');
  $playButton.appendTo('#quizarea');
  $playButton.button($buttonOptions);


  let $buttonOptions = {
    disabled: true,
    label: 'Play Now'
  }



}
*/
