"use strict";

/*****************

Create and display questions
Types: Slider, Image Choice, Word Choice

******************/

/*-------------  SLIDER  -------------------*/

// createSliderQuestion()
//
// Initialize slider widget and set initial value to half-way
function createSliderQuestion() {

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
    $sliderKeyword = $art[randomIndex(0,$art.length - 1)];
    // Set title according to keyword
    $nextSliderTitle = setTitles('AGREESLIDER', $sliderKeyword);
    // Set slider image source, prevent caching
    $sliderImage.attr('src','https://loremflickr.com/800/400/art/?random=' + $i);
    $i++;
    setSliderLabels('agree');

  }

  console.log('next slider: ' + $nextSliderTitle);

}

// setSliderLabels()
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

    // If slider type is 'agree', set labels to Agree and Disagree 
    case 'agree':
      $left = 'Agree';
      $right = 'Disagree';

      $('#sliderlabels').css('font-size', '2em');
    default:
      break;

  }

  $sliderLabels.left.html($left);
  $sliderLabels.right.html($right);

}

// displaySliderQuestion()
//
// Set slider title as question text and show relevant div
function displaySliderQuestion() {
  $questionHeader.html($nextSliderTitle);
  $sliderQuestion.show();
}



/*-------------  IMAGE CHOICE  -------------------*/

// createImageQuestion()
//
// Generate a new Image Choice question
function createImageQuestion() {
  // Get random image array
  let $a = $imageArrays[randomIndex(0,$imageArrays.length - 1)];
  // Get random keyword
  let $imageKeyword = $a[randomIndex(0,$a.length - 1)];
  // Set title according to keyword
  $nextImageTitle = setTitles('IMAGE', $imageKeyword, $a);
  console.log('next image: ' + $nextImageTitle);

  // Set image sources, prevent caching
  $imageOption.each(function(i) {
    $(this).attr('src', 'https://loremflickr.com/640/480/' + $imageKeyword + '?random=' + i);
  });

}

function displayImageQuestion() {
  $questionHeader.html($nextImageTitle);
  $imageChoiceQuestion.show();
}

/*-------------  WORD CHOICE -------------------*/

// createWordQuestion()
//
// Generate a new Word Choice question
function createWordQuestion() {
  // Get random keyword
  let $wordKeyword = $adjectives[randomIndex(0,$adjectives.length - 1)];
  // Set title according to keyword
  $nextWordTitle = setTitles('WORD', $wordKeyword);
  console.log('next word: ' + $nextWordTitle);

  // Set word options to random adjectives
  $wordOption.each(function(i) {
    $wordKeyword = $adjectives[randomIndex(0,$adjectives.length - 1)];
    $(this).html($wordKeyword);
    console.log('word: ' + $(this).html());
  });

}

// displayWordQuestion()
//
//
function displayWordQuestion() {
  $questionHeader.html($nextWordTitle);
  $wordChoiceQuestion.show();
}
