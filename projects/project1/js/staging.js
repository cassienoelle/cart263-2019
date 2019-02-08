"use strict";

/*****************

Hold miscellaneous pieces of code for later use

******************/
// Progress bar variables
let $progressbar;
let $progress = 0;


let $state;


// Array of objects representing quiz questions
let $questions = [];



// setupInterface()
//
//
function setupInterface() {
  // Hide user profile sidebar (display inspirational image)
  $sidebar.hide();

  // Initialize sidebar progress bar
  $progressbar.progressbar({
    value: $progress
  });

  // Hide subsequent questions
  $imgSelect.hide();
  $sliderQuestion.hide();

  // Create next button for question area (hidden for now)
  createNextButton();


}

//--------- NEXT BUTTON ---------//
function createNextButton() {

  $nextButton.button({
    icon: 'ui-icon-triangle-1-e',
    iconPosition: 'end',
    label: 'Next'
  });

  $nextButton.hide();

}

/*
  if ($state === 'INIT') {
    // hide main sidebar content until quiz initiated
    console.log('init');
    $sidebar.hide();
  }
  else if ($state === 'ACTIVE') {
    $introImage.hide();
  }
*/




function setupQuestions() {

  let $quizArea = $('#quizarea');
  let $questionDiv = $('<div id="questiondiv"></div>');
  let $textWrapper = $('<div id="textwrapper"></div>');
  let $questionText = $('<h2 id="questiontext"></h2>');
//  let $imgSelect = $('<div id="imgselect"></div>');
  let $nextDiv = $('<div id="nextdiv"></div>');

  $quizArea.append(
    $questionDiv.append(
      $textWrapper.append(
        $questionText.append(
          $imgSelect.append(
            $nextDiv)
          )
        )
      )
    );

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
