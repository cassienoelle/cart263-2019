"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(function() {

  $.getJSON('assets/data.json', dataLoaded);

});

function dataLoaded(data) {

  let condiment = getRandomElement(data.condiments);
  console.log(condiment);

  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }
  console.log(verb)

  let cat = getRandomElement(data.cats);
  let room = getRandomElement(data.rooms);
  console.log(cat + " + " + room);

  let description;
  $('body').append(description);

}

function getRandomElement(array) {
  let element = array[Math.floor]
}
