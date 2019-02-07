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
  $zodiac = $('#zodiac');

  // Replace with setupInterface() later
  $progressbar.progressbar({
    value: $progress
  });

  $sidebar.hide();
  //$introImage.hide();

  //createSlider();
  //selectImage();
  createDatePicker();
  nextButton();

  $imgSelect.hide();
  $sliderQuestion.hide();

  personalInfo();

});

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

//------- PERSONAL INFO ---------//

function personalInfo() {
  // Set question text
  $questionHeader.html($titles.introTitle);
  // Initialize birthday date picker
  createDatePicker();

  $userName.change(function() {
    $welcomeText.html('Hello ' + $userName.val());
    console.log($welcomeText.html());
  });

  $datePicker.change(function() {
    // Retrieve selected date
    let $date = $datePicker.datepicker('getDate');

    // Set birthday according to date retrieved
    $userBirthday = {
      day: $date.getDate(),
      month: $date.getMonth(),
      year: $date.getYear()
    }

    // Set zodiac sign according to birthday
    let $src = $zodiac.attr('src');
    $zodiac.attr('src', $src + setZodiac());
    console.log($zodiac.attr('src'));

    // Reveal greeting and zodiac image
    revealWelcome();
  });


}


  //------- DATE PICKER ---------//

function createDatePicker() {
  $datePicker = $('#datepicker');
  $datePicker.datepicker({
    changeMonth: true,
    changeYear: true
  });
}

  //-------- REVEAL WELCOME -------//
function revealWelcome() {
  // Hide inspirational image and show sidebar
  $introImage.fadeOut(function() {
    $welcomeText.hide();
    $appearSFX.play();
    $sidebar.fadeIn(function() {
      $welcomeText.fadeIn(1000);
    });
  });
  // Keep progress bar hidden
  $progressbar.hide();
}

function setZodiac() {
  switch($userBirthday.month) {
    case 0:
      if ($userBirthday.day < 20) {
        return 'capricorn.jpg';
      } else {
        return 'aquarius.jpg';
      }
      break;
    case 1:
      if ($userBirthday.day < 19) {
        return 'aquarius.jpg';
      } else {
        return 'pisces.jpg';
      }
      break;
    default:
      break;
  }
}


//--------- NEXT BUTTON ---------//
function nextButton() {

    $('#nextbutton').button({
      icon: 'ui-icon-triangle-1-e',
      iconPosition: 'end',
      label: 'Next'
    });

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
