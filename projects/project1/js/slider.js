"use strict";

/*****************

Create slider questions

******************/

// createSlider()
//
// Initialize slider widget and set initial value to half-way
function createSlider(type) {


  $slider.slider({
    value: 50
  });


  // Set slider image source, prevent caching
  let $i = 0;
  $sliderImage.attr('src','https://picsum.photos/800/400/?random=' + $i);
  $i++;

  if (type === 'feeling') {
    // Apply a random css filter to the slider image
    let $f = ['grayscale(100%)', 'contrast(200%)', 'hue-rotate(90deg)', 'hue-rotate(180deg)'];
    $sliderImage.css('filter', $f[randomIndex(0, $f.length - 1)]);
    // Set the question text
    $questionHeader.html($titles.feelingSlider);
    // Set slider titles randomly to emoji or kaomoji
    let $t = ['emoji', 'kaomoji'];
    setSliderTitles($t[randomIndex(0, $t.length - 1)]);
  }

}

// setSliderTitles()
//
// Randomly generate labels for minimum and maximum slider positions
// Possible labels pulled from data files of kaomoji and emoji
function setSliderTitles(type) {
  let $left;
  let $right;

  switch(type) {

    case 'kaomoji':
      $left = $cuteKaomoji[randomIndex(0,$cuteKaomoji.length - 1)];
      $right = $cuteKaomoji[randomIndex(0,$cuteKaomoji.length - 1)];

      $('#sliderlabels').css('font-size', '1.5em');
      break;

    case 'emoji':
      $left = $emoji[randomIndex(588,664)];
      $right = $emoji[randomIndex(588,664)];

      $('#sliderlabels').css('font-size', '2em');
      break;

    default:
      break;

  }

  $sliderTitle.left.html($left);
  $sliderTitle.right.html($right);

}

// randomIndex
//
// return an integer between two values inclusive
function randomIndex(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
