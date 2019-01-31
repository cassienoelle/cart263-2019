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


$(document).ready(function() {
  $key = $('.key');
  $smallKey = $('.small');
  $largeKey = $('.large');

  responsiveInterface();

  $key.on('click', function() {
    let $selectedKey = $(this);
  });

});


// responsiveInterface()
//
//
function responsiveInterface() {
  // set key height relative to responsive width

  // set small key width the same as small key height
  $smallKeyWidth = $smallKey.css('width');
  $smallKeyHeight = $smallKeyWidth;
  $smallKey.css('height', $smallKeyHeight);

  // set large key height at half of small key height
  // (sets height automatically with line-height)
  $largeKeyHeight = calcString($smallKeyHeight, 'px', 'divide', 2);
  $largeKey.css('line-height', $largeKeyHeight);


  console.log('small width: ' + $smallKeyWidth);
  console.log('small height: ' + $smallKeyHeight);
  console.log('large height: ' + $largeKeyHeight);
  console.log('line-height: ' + $largeKey.css('line-height'));

}

// calcString()
//
// perform calculations on css values represented as strings
function calcString(value, suffix, operation, number) {
  // remove suffix from original string
  let $subStr = value.substring(0, value.length - 2);
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
