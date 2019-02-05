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

  setupInterface();

});

// setupInterface()
//
//
function setupInterface() {
  // setup progress bar
  $progressbar.progressbar({
    value: $progress
  });

  createButton();

  if ($state === 'INIT') {
    // hide main sidebar content until quiz initiated
    console.log('init');
    $sidebar.hide();
  }
  else if ($state === 'ACTIVE') {
    $introImage.hide();
  }

}

function createButton() {

  let $playButton = $('<button id="play"></button>');
  $playButton.appendTo('#quizarea');
  $playButton.button($buttonOptions);


  //$( ".selector" ).button( "option", { disabled: true } );

  let $buttonOptions = {
    disabled: true,
    label: 'Play Now'
  }



}
