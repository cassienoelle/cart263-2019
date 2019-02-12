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

  // Get random keyword
  let $sliderKeyword = $animals[randomIndex(0,$animals.length - 1)];
  // Set title according to keyword
  $nextSliderTitle = setTitles('SLIDER', $sliderKeyword);
  console.log('next slider: ' + $nextSliderTitle);

  // Set slider image source, prevent caching
  $sliderImage.attr('src','https://loremflickr.com/800/400/silly/?random=' + $i);
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

function displaySliderQuestion() {
  $questionHeader.html($nextSliderTitle);
  $sliderQuestion.show();
}
