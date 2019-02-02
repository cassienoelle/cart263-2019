/*****************

Placeholder Title
Cassie Smith

An absurdist project inspired by Camus' The Myth of Sisyphus.
Navigate through the phone menu options in order to [insert goal here].

Lose if you press zero (take a leap of faith and defer to belief in God)
or hang up (give up and commit suicide).

******************/
"use strict";

// array representing the keypad
let $keys = [];
// variable to select all divs with key class
let $key;
let $smallKey;
let $largeKey;

// variables to set height of keys
let $smallKeyWidth;
let $smallKeyHeight;
let $largeKeyHeight;

// variables to hold currently selected key
let $selectedKey = undefined;

// variable to track progress
let $progress = 0;


$(document).ready(function() {
  $key = $('.key');
  $smallKey = $('.small');
  $largeKey = $('.large');

  setupInterface();

  $key.on('click', function() {
    let $selectedKey = $(this);
  });

});


// setupInterface()
//
//
function setupInterface() {
  // set key height relative to responsive width

  // set small key width the same as small key height
  $smallKeyWidth = $smallKey.css('width');
  $smallKeyHeight = $smallKeyWidth;
  $smallKey.css('height', $smallKeyHeight);

  // set large key line-height at half of small key height
  $largeKeyHeight = calcString($smallKeyHeight, 'px', 'divide', 2);
  $largeKey.css('line-height', $largeKeyHeight);
  $largeKey.css('height', $largeKeyHeight);

  $(function() {
    $('#progressbar').progressbar({
      value: $progress
    });
  });

}

// calcString()
//
// perform simple calculations on css values represented as strings
function calcString(value, suffix, operation, number) {
  // remove suffix from original string
  let $subStr = value.substring(0, value.length - suffix.length);
  // convert string to number
  let $newValue = Number($subStr);

  // perform specified operation
  switch(operation) {
    case 'divide':
      $newValue = $newValue / number;
      break;
    case 'multiply':
      $newValue = $newValue * number;
      break;
    case 'add':
      $newValue = $newValue + number;
      break;
    case 'subtract':
      $newValue = $newValue - number;
      break;
    default:
      break;
  }

  // convert number back to string and re-add suffix
  $newValue = String($newValue) + suffix;
  console.log($newValue);

  // return new string value
  return $newValue;
}
