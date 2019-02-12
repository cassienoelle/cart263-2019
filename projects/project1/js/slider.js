"use strict";

/*****************

Create slider questions

******************/

// createSlider()
//
// Initialize slider widget and set initial value to half-way
function createSlider() {

  $slider.slider({
    value: 50
  });

  let $sliderType = $sliders[randomIndex(0, $sliders.length - 1)];

  if ($sliderType === 'feeling') {
    $nextSliderTitle = setTitles('SLIDER', 'slider');
    // Set slider image source, prevent caching
    $sliderImage.attr('src','https://loremflickr.com/800/400/silly/?random=' + $i);
    $i++;
    // Apply a random css filter to the slider image
    let $f = ['grayscale(100%)', 'contrast(200%)', 'hue-rotate(90deg)', 'hue-rotate(180deg)'];
    $sliderImage.css('filter', $f[randomIndex(0, $f.length - 1)]);
    // Set slider titles randomly to emoji or kaomoji
    let $t = ['emoji', 'kaomoji'];
    setSliderLabels($t[randomIndex(0, $t.length - 1)]);
  }
  else if ($sliderType === 'agree') {
    // Get random keyword
    let $sliderKeyword = $art[randomIndex(0,$art.length - 1)];
    // Set title according to keyword
    $nextSliderTitle = setTitles('AGREESLIDER', $sliderKeyword);
    // Set slider image source, prevent caching
    $sliderImage.attr('src','https://loremflickr.com/800/400/art/?random=' + $i);
    $i++;
    setSliderLabels('agree');

  }

  console.log('next slider: ' + $nextSliderTitle);

}

// setSliderTitles()
//
// Randomly generate labels for minimum and maximum slider positions
// Possible labels pulled from data files of kaomoji and emoji
function setSliderLabels(type) {
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

    case 'agree':
      $left = 'Agree';
      $right = 'Disagree';

      $('#sliderlabels').css('font-size', '2em');
    default:
      break;

  }

  $sliderTitle.left.html($left);
  $sliderTitle.right.html($right);

}

// displaySliderQuestion()
//
// Set slider title as question text and show relevant div
function displaySliderQuestion() {
  $questionHeader.html($nextSliderTitle);
  $sliderQuestion.show();
}
