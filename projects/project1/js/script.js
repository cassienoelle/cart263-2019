"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

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

  //createSlider();
  selectImage();
  setupInterface()
  createUserProfile();
  startQuiz();

});

//-------- START REAL QUESTIONS -------//
function startQuiz() {
  $nextButton.on('click', function() {
    $userProfile.hide();
    $imgSelect.show();
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

function createSlider() {
  $slider = $('#slider');
  $slider.slider();
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
