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
let $key = $('.key');

// variables to hold currently selected key
let $selectedKey = undefined;


// call the setup function when document is loaded
$(document).ready(setup);

// setup()
//
//
function setup() {
  $key.on('click', selected);

}

// selected()
//
//
function selected() {
  // set $selectedKey

  // animate key (flash a different color)

}
