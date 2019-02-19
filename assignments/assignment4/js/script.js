"use strict";

/*****************

Eat Up
Cassie Smith

Start code by Pippin Barr

Using jQuery UI's draggable and droppable methods to
feed a hungry mouth!

Sounds:
Buzzing: https://freesound.org/people/soundmary/sounds/194931/
Chewing: https://freesound.org/people/InspectorJ/sounds/412068/
Gagging: https://freesound.org/people/Turroe22/sounds/135415/

******************/

// Sound effects for the experience
let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");
let hmphSFX = new Audio("assets/sounds/hmph.wav");

// Variable to hold our two key elements
let $mouth;
let $fly;
let $candy;

$(document).ready(setup);

function setup() {
  // Get elements from page
  $mouth = $('#mouth');
  $fly = $('#fly');
  $candy = $('#candy');

  // Make the mouth droppable
  $mouth.droppable({
    // Accept the fly only and call flyDropped on drop
    accept: $fly,
    drop: flyDropped
  })

  // Make fly  draggable
  $fly.draggable();

  // Make candy draggable and revert it's position when dropped
  // Play hmph sound when user moves it and close mouth firmly
  // until candy is released
  $candy.draggable({
    revert: true,
    start: function(event,ui) {
      hmphSFX.play();
      $mouth.attr('src','assets/images/mouth-firmly-closed.png')
    },
    stop: function(event,ui) {
      $mouth.attr('src','assets/images/mouth-open.png')
    }
  });

  // Start up the buzzing of the fly
  buzzSFX.loop = true;
  buzzSFX.play();
}


// flyDropped(event,ui)
//
// Called when a draggable element is dragged over the droppable element (the mouth)
// In this instance it can only be the fly (it's the only draggable element).
// The arguments 'event' and 'ui' are automatically passed by jQuery UI and contain
// helpful information about the event.
function flyDropped (event,ui) {
  // When we drop the fly into the mouth we should remove the fly from the page
  // ui contains a reference to the draggable element that was just dropped in ui.draggable
  // .remove() removes the select element from the page
  ui.draggable.remove(); // $fly.remove() would work here too
  // We should "close the mouth" by changing its image
  // .attr() lets us change specific attributes on HTML element by specifying the attribute
  // and then what we want to set it to - in this case the 'src' attribute to the closed image
  $(this).attr('src','assets/images/mouth-closed.png');
  // Now the fly is gone we should stop its buzzing
  buzzSFX.pause();
  // And start the crunching sound effect of chewing
  crunchSFX.play();
  // Use a setInterval to call the chew() function over and over
  setInterval(chew,250);
}

// chew()
//
// Swaps the mouth image between closed and open and plays the crunching SFX
function chew () {
  // We can use .attr() to check the value of an attribute to
  // In this case we check if the image is the open mouth
  if ($mouth.attr('src') === 'assets/images/mouth-open.png') {
    // If it is, we set the 'src' attribute to the closed mouth
    $mouth.attr('src','assets/images/mouth-closed.png');
    // and play the crunching
    crunchSFX.play();
  }
  else {
    // Otherwise the 'src' attribute must have been the closed mouth
    // so we swap it for the open mouth
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}
