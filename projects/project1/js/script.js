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
  //selectImage();
  setupInterface()

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
  // Set question header text
  $questionHeader.html($titles.introTitle);

  // Disable form input autocomplete
  $('form').attr('autocomplete', 'off');

  // Hide all but first question
  $userProfile.filter('h3').not(':first-child').hide();
  $userAura.hide();

  // Initialize birthday date picker (hidden for now)
  createDatePicker();

  // Add input from username field to welcome message
  setUserName();
  // Set welcome image (zodiac) according to input from date picker
  // Reveal sidebar with welcome upon date picker input
  setUserZodiac();
  // Set quiz styling according to colour picker value
  setUserStyle();
}


  //------- DATE PICKER ---------//

function createDatePicker() {
  $datePicker = $('#datepicker');
  $datePicker.datepicker({
    changeMonth: true,
    changeYear: true
  });

  $datePicker.hide();
}

function setUserStyle() {

  // Update stylesheet according to color picker input
  $userAura.change(function() {
    // Save color picker value
    let $theme = $userAura.val();
    // Set styling of question area according to color value
    // Class selector wasn't overriding default button styling so had to set using IDs
    $('#textwrapper').css('background-color', $theme);
    $('#nextbutton').css('background-color', $theme);

    // Reveal 'next' button
    setTimeout(function() {
      $nextButton.fadeIn();
    }, 2500);
  });

}

function setUserName() {

  // Update welcome text according to username input field
  $userName.change(function() {
    $welcomeText.html('Hello ' + $userName.val());
    console.log($welcomeText.html());

    // Reveal next profile question
    setTimeout(function() {
      $userProfile.filter('h3').filter(':nth-child(3)').fadeIn();
      $datePicker.fadeIn();
    },500);

  });

}

function setUserZodiac() {

  // Process input from date picker
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
    // Get source folder from html element
    let $src = $zodiac.attr('src');
    // Append correct file name and extension
    $zodiac.attr('src', $src + getZodiac());

    // Then fade in zodiac image and play related sound
    // Reveal greeting
    revealWelcome();
  });

}

// revealWelcome()
//
// Hide inspirational image and show sidebar with personal welcome
function revealWelcome() {
  // Keep progress bar hidden
  $progressbar.hide();
  // Hide welcome message initially
  $welcomeText.hide();

  // Fade out inspirational image
  setTimeout(function() {$introImage.fadeOut(function() {
    // Then fade in sidebar displaying zodiac image
    // and play accompanying sound effect
    $appearSFX.play();
    $sidebar.fadeIn(function() {
      // Then fade in welcome message
      $welcomeText.fadeIn('slow', function() {
        // After a pause, reveal final profile question
        setTimeout(function() {
          console.log('last one!');
          $userProfile.filter('h3').filter(':nth-child(5)').fadeIn();
          $userAura.fadeIn();
        }, 500);
      });
    });
  });
},100);

}

function getZodiac() {
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
function createNextButton() {

  $nextButton.button({
    icon: 'ui-icon-triangle-1-e',
    iconPosition: 'end',
    label: 'Next'
  });

  $nextButton.hide();

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
