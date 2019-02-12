"use strict";

/*****************

Quiz Intro
Set interface according to user profile

******************/


function createUserProfile() {
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
  // Set welcome image - user zodiac sign - according to input from birthday date picker
  setUserZodiac();

  setUserStyle();
}

// createDatePicker()
//
// Initialize and hide date picker widget
function createDatePicker() {
  $datePicker = $('#datepicker');
  $datePicker.datepicker({
    changeMonth: true,
    changeYear: true
  });

  $datePicker.hide();
}


// setUserName()
//
// Update welcome message with input from username field
function setUserName() {

  // Update on input
  $userName.change(function() {
    $welcomeText.html('Hello ' + $userName.val() + '!');
    console.log($welcomeText.html());

    // Reveal next profile question
    setTimeout(function() {
      $userProfile.filter('h3').filter(':nth-child(3)').fadeIn();
      $datePicker.fadeIn();
    },500);

  });

}

// setUserZodiac()
//
// Display a profile picture based on user's zodiac sign
function setUserZodiac() {

  // Process input from birthday date picker
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
    let $srcFolder = 'assets/images/zodiac/';
    // Determine zodiac sign and append corresponding
    // file name and extension to img source
    $zodiac.attr('src', $srcFolder + getZodiac() + '.png');

    // Then fade in zodiac image and play related sound
    // Reveal greeting
    revealWelcome();
  });

}

// getZodiac()
//
// Determine zodiac sign according to user birthday and return result
function getZodiac() {
  switch($userBirthday.month) {
    case 0:
      if ($userBirthday.day < 20) {
        return 'capricorn';
      } else {
        return 'aquarius';
      }
      break;
    case 1:
      if ($userBirthday.day < 19) {
        return 'aquarius';
      } else {
        return 'pisces';
      }
      break;
    case 2:
      if ($userBirthday.day < 21) {
        return 'pisces';
      } else {
        return 'aries';
      }
      break;
    case 3:
      if ($userBirthday.day < 20) {
        return 'aries';
      } else {
        return 'taurus';
      }
      break;
    case 4:
      if ($userBirthday.day < 21) {
        return 'taurus';
      } else {
        return 'gemini';
      }
      break;
    case 5:
      if ($userBirthday.day < 21) {
        return 'gemini';
      } else {
        return 'cancer';
      }
      break;
    case 6:
      if ($userBirthday.day < 23) {
        return 'cancer';
      } else {
        return 'leo';
      }
      break;
    case 7:
      if ($userBirthday.day < 23) {
        return 'leo';
      } else {
        return 'virgo';
      }
      break;
    case 8:
      if ($userBirthday.day < 23) {
        return 'virgo';
      } else {
        return 'libra';
      }
      break;
    case 9:
      if ($userBirthday.day < 23) {
        return 'libra';
      } else {
        return 'scorpio';
      }
      break;
    case 10:
      if ($userBirthday.day < 22) {
        return 'scorpio';
      } else {
        return 'sagittarius';
      }
      break;
    case 11:
      if ($userBirthday.day < 22) {
        return 'sagittarius';
      } else {
        return 'capricorn';
        }
      break;
    default:
      break;
  }
}


// revealWelcome()
//
// Hide inspirational image and show sidebar with welcome message and user profile
function revealWelcome() {
  // Keep progress bar hidden
  $userProgress.hide();
  // Hide welcome message initially
  $welcomeText.hide();
  $affirmation.hide();
  $playButton.hide();

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

  // Set inspirational image to gif for later

}

// setUserStyle()
//
// Set quiz styling according to 'aura' colour picker value
function setUserStyle() {

  // Update on color picker input
  $userAura.change(function() {
    // Save color picker value
    let $theme = $userAura.val();
    $appearSFX2.play();
    // Set styling of question div and 'next' button according to color value
    // (Class selector wasn't overriding default button styling so had to set using IDs)
    $('#textwrapper').css('background-color', $theme).css('filter', 'hue-rotate(-40deg)');
    $('#nextbutton').css('background-color', $theme).css('filter', 'hue-rotate(-40deg)');
    $('#zodiacbackground').css('background-color', $theme);
    $playButton.css('background-color', $theme);
    $wordOption.css('background-color', $theme);

    $affirmation.fadeIn();
    $playButton.fadeIn();

    // Reveal 'next' button
    setTimeout(function() {
      $nextButton.fadeIn();
    }, 2000);
  });

}

// autoset()
//
// Skip intro sequence to test quiz
function autoset() {
  $('form').attr('autocomplete', 'off');
  createDatePicker();
  $datePicker.show();
  $nextButton.show();
  $welcomeText.html('Hello User');
  let $src = $zodiac.attr('src');
  $zodiac.attr('src', $src + 'capricorn.png');
  $('#zodiacbackground').css('background-color', 'orange');
  $introImage.hide();
  $sidebar.show();
}
