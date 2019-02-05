"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

// Array of objects representing quiz questions
let $questions = [];

// Progress bar variables
let $progressbar;
let $progress = 0;

$(document).ready(function() {
  $progressbar = $('#progressbar');

  $progressbar.progressbar({
    value: $progress
  });


});
