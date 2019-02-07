"use strict";

/*****************

Title of Project
Cassie Smith

A neverending quiz to find yourself!

******************/

// Basic layout DOM elements
let $sidebar;
let $introImage;


$(document).ready(function() {
  $sidebar = $('#wrapper');
  $progressbar = $('#progressbar');
  $introImage = $('#inspiration');

  test();

  // Replace with setupInterface() later
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
