"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

// Basic layout DOM elements
let $sidebar;
let $introImage;
let $slider;


$(document).ready(function() {
  $sidebar = $('#wrapper');
  $progressbar = $('#progressbar');
  $introImage = $('#inspiration');

  // Replace with setupInterface() later
  $sidebar.hide();

  questionTypes();
  createSlider();
  //selectImage();
  test();

});

// test()
//
//
function test() {

    $('#nextbutton').button({
      icon: 'ui-icon-triangle-1-e',
      iconPosition: 'end',
      label: 'Next'
    });

}
