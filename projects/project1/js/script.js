"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

let $state;
let $i = 0;
let $encouragement = 0;

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
let $affirmation;
let $nextWordTitle;
let $wordChoice;
let $wordOption;
let $dialog;
let $playButton;

let $questionType = 'IMAGE';

let $sliderTitle = {
  left: undefined,
  right: undefined
}
let $sliderImage;

let $appearSFX = new Audio("assets/sounds/magic.flac");
let $appearSFX2 = new Audio("assets/sounds/magic2.wav");
let $errorSFX = new Audio("assets/sounds/error.wav");
let $disappearSFX = new Audio("assets/sounds/disappear.wav");


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
  $wordChoice = $('#word-choice');
  $wordOption = $('.wordOption');
  $affirmation = $('#affirmation');
  $dialog = $('#dialog');
  $playButton = $('#playAffirmation');

  console.log('left: ' + $sliderTitle.left);
  console.log('right: ' + $sliderTitle.right);

  selectOption();
  setupInterface()
  createUserProfile();
  //autoset();

  continueQuiz();
  encourageUser();
});

//-------- START REAL QUESTIONS -------//

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
          $wordChoice.hide();
          createSlider();
          createWordChoice();
      }
      else if ($questionType === 'SLIDER') {
          displaySliderQuestion();
          $imgSelect.hide();
          $wordChoice.hide();
          createImages();
          createWordChoice();
      }
      else if ($questionType === 'WORD') {
          resetSelect();
          displayWordQuestion();
          $imgSelect.hide();
          $sliderQuestion.hide();
          createSlider();
          createImages();
      }
  $progress += 5;
  endlessProgress();
  });
}

//--------- IMAGE --------//

function selectOption() {

  $imgSelect.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

  $wordChoice.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

}

function resetSelect() {

  $imgSelect.children().removeClass('overlay');
  $imgSelect.selectable('enable');

  $wordChoice.children().removeClass('overlay');
  $wordChoice.selectable('enable');

}

//--------- ENCOURAGEMENT --------//
// encourageUser()
//
// Display a new affirmation in the sidebar with each question
function encourageUser() {
  $messageKeyword = $affirmations[randomIndex(0,$affirmations.length - 1)]
  let $nextMessage = setTitles('MESSAGE', $messageKeyword);
  $message.hide();
  $message.html($nextMessage);

  $message.fadeIn({
    duration: 500,
  });

  $playButton.button();
  $playButton.on('click', function() {
    console.log('speak: ' + $nextMessage);
    responsiveVoice.speak($message.html(), "US English Female", {
      onend: function() {
        responsiveVoice.cancel();
      }
    });
  });

  $encouragement ++;

  /*
  if ($encouragement % 5 === 0) {
    let $ogsrc = $zodiac.attr('src');
    let $ogbc = $('#zodiacbackground').css('background-color');

    let $src = ('assets/images/' + $inspiration[randomIndex(0,$inspiration.length - 1)])
    $zodiac.attr('src', $src);
    $('#zodiacbackground').css('background-color', '#ffffff');

    setTimeout(function() {
       $zodiac.fadeOut();
       $zodiac.attr('src', $ogsrc);
       $('#zodiacbackground').css('background-color', $ogbc);
       $zodiac.fadeIn();
    }, 10000);
  }
  */
}




//--------- PROGRESS BAR ---------//

// endlessProgress()
//
// If progress approaches complete, set progress to indeterminate
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

//--------- TOOLS --------//

// randomIndex
//
// return an integer between two values inclusive
function randomIndex(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
