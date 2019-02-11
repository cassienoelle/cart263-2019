"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

let $state;
let $i = 0;

// Basic layout DOM elements
let $sidebar;
let $questionHeader;
let $introImage;
let $slider;
let $sliderQuestion;
let $imgSelect;
let $datePicker;
let $userName;
let $userBirthday;
let $userAura;
let $welcomeText;
let $zodiac;
let $imageOption
let $nextButton;
let $userProfile;
let $titles = [];
let $userProgress;
let $imagePreload;
let $keyword;
let $keywordNext;
let $imageKeyword;
let $messageKeyword;
let $currentTitle;
let $nextImageTitle;
let $nextSliderTitle;
let $message;
let $toggleFirst = false;

let $questionType = 'IMAGE';

let $sliderTitle = {
  left: undefined,
  right: undefined
}
let $sliderImage;

let $appearSFX = new Audio("assets/sounds/magic.flac");


$(document).ready(function() {
  $sidebar = $('#wrapper');
  $progressbar = $('#progressbar');
  $introImage = $('#inspiration');

  $slider = $('#slider');
  $sliderQuestion = $('#sliderquestion');
  $imgSelect = $('#imgselect');
  $questionHeader = $('#questiontext');
  $welcomeText = $('#welcome');
  $userName = $('#username');
  $userAura = $('#aura');
  $zodiac = $('#zodiac');
  $nextButton = $('#nextbutton');
  $userProfile = $('.userprofile');
  $sliderTitle.left = $('#label-left');
  $sliderTitle.right = $('#label-right');
  $sliderImage = $('#sliderimage');
  $userProgress = $('.userprogress');
  $slider = $('#slider');
  $imageOption = $('.imgOption');
  $imagePreload = $('.imgPreload');
  $message = $('#message');

  console.log('left: ' + $sliderTitle.left);
  console.log('right: ' + $sliderTitle.right);

  selectImage();
  setupInterface()
  //createUserProfile();
  autoset();

  continueQuiz();
  encourageUser();
});

//-------- START REAL QUESTIONS -------//

function continueQuiz() {
  $nextButton.on('click', function() {
      $userProfile.hide();
      $userProgress.show();
      // Run each time to preload images

      if ($questionType === 'IMAGE') {
        $questionType = 'SLIDER';
      }
      else if ($questionType === 'SLIDER') {
        $questionType = 'IMAGE';
      }
      ///////////
      if ($questionType === 'IMAGE') {
          displayImageQuestion();
          $sliderQuestion.hide();
          createSlider('feeling');
      }
      else if ($questionType === 'SLIDER') {
          displaySliderQuestion();
          $imgSelect.hide();
          createImages();
          resetSelectImage();
      }

    // Advance progress bar
    $progress += 5;
    $progressbar.progressbar('option', 'value', $progress);
    console.log('progress: ' + $progress);

    encourageUser();
  });
}

//--------- IMAGE --------//

function selectImage() {

  $imgSelect.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

}

function resetSelectImage() {

  $imgSelect.children().removeClass('overlay');
  $imgSelect.selectable('enable');

}

//--------- ENCOURAGEMENT --------//
function encourageUser() {
  $messageKeyword = $wisdom[randomIndex(0,$wisdom.length - 1)]
  let $nextMessage = setTitles('MESSAGE', $messageKeyword);
  $message.html($nextMessage);

  // let $src = ('assets/images/' + $inspiration[randomIndex(0,$inspiration.length - 1)])
  // $zodiac.attr('src', $src);
}


//--------- PROGRESS BAR ---------//

// endlessProgress()
//
// If progress approaches complete, set progress to indeterminate
function endlessProgress() {
  if ($progress > 90) {
    $progressbar.progressbar( 'option', {value: false} );
  }
}

//--------- TOOLS --------//

// randomIndex
//
// return an integer between two values inclusive
function randomIndex(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
