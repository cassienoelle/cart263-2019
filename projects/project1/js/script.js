"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

let $state;
let $username = undefined;

// Array of objects representing quiz questions
let $questions = [];

// Basic layout DOM elements
let $sidebar;
let $introImage;

// Progress bar variables
let $progressbar;
let $progress = 0;


$(document).ready(function() {
  $sidebar = $('#wrapper');
  $progressbar = $('#progressbar');
  $introImage = $('#inspiration');
  $state = 'INIT';

  test();

  // Replace with setupInterface() 
  $sidebar.hide();

});

// test()
//
//
function test() {

    $('#imgSelect').selectable({
      stop: function() {
        console.log($(this));
        $(this).children().not('.ui-selected').addClass('overlay');
        $(this).selectable('disable');
      }
    });

    $('#nextButton').button({
      icon: 'ui-icon-triangle-1-e',
      iconPosition: 'end',
      label: 'Next'
    });


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
