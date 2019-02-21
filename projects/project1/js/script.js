"use strict";

/*****************

Quizyphus
Cassie Smith
CART263b, Winter 2019

A neverending quiz to find yourself!
Create your profile, then answer the questions
and track your progress in the sidebar.

If you get discouraged, play one of the positive
affirmations generated just for you!

******************/

let i = 0;
let p = 1;
let $productsShown = false;
let $questionType = 'IMAGE';

/*----Basic layout DOM elements ---*/

/*--- Sidebar ---*/
let $sidebar, $questionHeader, $introImage, $welcomeText;
let $userProfile, $userName;
let $datePicker, $userBirthday, $zodiac, $userAura;
let $affirmation, $message, $nextMessage, $playButton;
let $products;
let $userProgress, $progressbar;
let $progress = 0;

/*--- Main Quiz Area ---*/

// Slider questions
let $sliderQuestion, $sliderImage, $slider;
let $nextSliderTitle;
let $sliderLabels = {
  left: undefined,
  right: undefined
}
// Image questions
let $imageChoiceQuestion;
let $imageOption;
let $nextImageTitle;
// Word choice questions
let $wordChoiceQuestion;
let $wordOption;
let $nextWordTitle;

// Keywords for generating next question text
let $keyword;
let $messageKeyword;
let $imageKeyword;
let $sliderKeyword;
// Array of possible titles to generate
let $titles = [];
// Next button
let $nextButton
// Dialog box to reset progress bar
let $dialog;

// Sound effects
let $appearSFX = new Audio("assets/sounds/magic.flac");
let $appearSFX2 = new Audio("assets/sounds/magic2.wav");
let $errorSFX = new Audio("assets/sounds/error.wav");
let $disappearSFX = new Audio("assets/sounds/disappear.wav");




$(document).ready(function() {

  setDOMselectors();
  encourageUser();
  setupInterface();
  createUserProfile();
  // autoset();
  continueQuiz();


});

// setDOMselectors()
//
//
function setDOMselectors() {
  // Sidebar
  $introImage = $('#inspiration');
  $sidebar = $('#wrapper');
  // User Profile
  $userProfile = $('.userprofile');
  $userName = $('#username');
  $userAura = $('#aura');
  $zodiac = $('#zodiac');
  $welcomeText = $('#welcome');
  // Affirmation
  $message = $('#message');
  $affirmation = $('#affirmation');
  $playButton = $('#playAffirmation');
  $products = $('.products');
  // Progress
  $progressbar = $('#progressbar');
  $userProgress = $('.userprogress');

  // Main Quiz
  $questionHeader = $('#questiontext');
  $nextButton = $('#nextbutton');
  // Slider Questions
  $sliderQuestion = $('#sliderquestion');
  $slider = $('#slider');
  $sliderImage = $('#sliderimage');
  $sliderLabels.left = $('#label-left');
  $sliderLabels.right = $('#label-right');
  // Image Choice Questions
  $imageChoiceQuestion = $('#imgselect');
  $imageOption = $('.imgOption');
  // Word Choice Questions
  $wordChoiceQuestion = $('#word-choice');
  $wordOption = $('.wordOption');
  // Dialog box to reset progress
  $dialog = $('#dialog');

}

// setupInterface()
//
//
function setupInterface() {
  // Create Next button and Play button
  $nextButton.button({
    label: 'Next'
  });
  $playButton.button();
  // Initialize sidebar progress bar
  $progressbar.progressbar({
    value: $progress
  });
  $playButton.on('click', function() {
    console.log('SPEECH HERE');
    console.log('speak: ' + $nextMessage);
    responsiveVoice.speak($message.text(), "US English Female", {
      onend: function() {
        //responsiveVoice.cancel();
        if (!$productsShown) {
          showProducts();
        }
      }
    })
  });

  $('.ui-progressbar-value').css('background', '#ffeb00');

  // Hide user profile and main quiz
  $sidebar.hide();
  $nextButton.hide();
  $imageChoiceQuestion.hide();
  $sliderQuestion.hide();
  $wordChoiceQuestion.hide();
  // Hide dialog box (progress reset) text
  $dialog.children('p').hide();

  // Create initial questions of all types
  createImageQuestion();
  createSliderQuestion();
  createWordQuestion();

  // Initialize selectable for Image and Word choice questions
  selectOption();

}

// continueQuiz()
//
// Main quiz interactivity and question generation
function continueQuiz() {
  $nextButton.on('click', function() {
      $userProfile.hide();
      $userProgress.show();
      encourageUser();
      // Run each time to preload images

      if ($questionType === 'IMAGE') {
        $questionType = 'SLIDER';
      }
      else if ($questionType === 'SLIDER') {
        $questionType = 'WORD';
      }
      else if ($questionType === 'WORD') {
        $questionType = 'IMAGE';
      }
      ///////////
      if ($questionType === 'IMAGE') {
          resetSelect();
          displayImageQuestion();
          $sliderQuestion.hide();
          $wordChoiceQuestion.hide();
          createSliderQuestion();
          createWordQuestion();
      }
      else if ($questionType === 'SLIDER') {
          displaySliderQuestion();
          $imageChoiceQuestion.hide();
          $wordChoiceQuestion.hide();
          createImageQuestion();
          createWordQuestion();
      }
      else if ($questionType === 'WORD') {
          resetSelect();
          displayWordQuestion();
          $imageChoiceQuestion.hide();
          $sliderQuestion.hide();
          createSliderQuestion();
          createImageQuestion();
      }

  // Update progress
  $progress += 5;
  endlessProgress();
  });
}


// encourageUser()
//
// Display a new affirmation in the sidebar with each question
function encourageUser() {
  console.log('encourage User called');
  $messageKeyword = $affirmations[randomIndex(0,$affirmations.length - 1)]
  $nextMessage = setTitles('MESSAGE', $messageKeyword);
  $message.hide();
  $message.text($nextMessage);

  $message.fadeIn({
    duration: 500,
  });
}



// endlessProgress()
//
// If progress approaches complete, display dialog box, reset progress
function endlessProgress() {

  if ($progress > 90) {
    console.log('endless');
    $dialog.dialog({
      draggable: true,
      buttons: [
         {
           text: 'Ok',
           icon: 'ui-icon-person',
           click: function() {
             $disappearSFX.play();
             $(this).dialog( "close" );
             $progressbar.animate({
                 opacity: 'toggle'
             },700, function() {
               console.log('complete');
               $progress = 0;
               $progressbar.progressbar('option', 'value', $progress);
               $progressbar.show();
             });
           }
         }]
    });
    $dialog.children('p').show();
    $errorSFX.play();
  }

  $progressbar.progressbar('option', 'value', $progress);
  console.log($progress);
}


// selectOption()
//
// Make Word and Image questions selectable
// Change styling and disable upon selection
function selectOption() {

  $imageChoiceQuestion.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

  $wordChoiceQuestion.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

}

// resetSelect()
//
// Revert styling on Word and Image questions and
// re-enable selectable responses
function resetSelect() {

  $imageChoiceQuestion.children().removeClass('overlay');
  $imageChoiceQuestion.selectable('enable');

  $wordChoiceQuestion.children().removeClass('overlay');
  $wordChoiceQuestion.selectable('enable');

}

// randomIndex(min,max)
//
// Return an integer between two values inclusive
// Use to generate a random index of an aray
function randomIndex(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
