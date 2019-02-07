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
  revealSidebar();

  $userName.change(function() {
    $welcomeText.html('Hello ' + $userName.val());
    console.log($welcomeText.html());
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

  //-------- REVEAL SIDEBAR -------//
function revealSidebar() {
  // Hide inspirational image and show sidebar
  $introImage.hide();
  $sidebar.show();
  // Keep progress bar hidden
  $progressbar.hide();
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
