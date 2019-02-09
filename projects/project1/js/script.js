"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

let $state;

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
let $nextButton;
let $userProfile;
let $titles = {
  introTitle: 'Personal Info question header',
  feelingSlider: 'How does this make you feel?'
}
let $userProgress;

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

  console.log('left: ' + $sliderTitle.left);
  console.log('right: ' + $sliderTitle.right);


  //createSlider();
  selectImage();
  setupInterface()
  createUserProfile();
  //autoset();

  continueQuiz();

});

//-------- START REAL QUESTIONS -------//
function continueQuiz() {
  $nextButton.on('click', function() {
    $userProfile.hide();
    $imgSelect.hide();
    $userProgress.show();
    createSlider('feeling');
    $sliderQuestion.show();


    $progress += 5;
    $progressbar.progressbar('option', 'value', $progress);
    console.log('progress: ' + $progress);
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

//--------- SLIDER --------//


//--------- PROGRESS BAR ---------//

// endlessProgress()
//
// If progress approaches complete, set progress to indeterminate
function endlessProgress() {
  if ($progress > 90) {
    $progressbar.progressbar( 'option', {value: false} );
  }
}
