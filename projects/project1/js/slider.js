"use strict";

/*****************

Create slider questions

******************/

// createSlider()
//
// Initialize slider widget and set initial value to half-way
function createSlider(type) {

  $slider = $('#slider');
  $slider.slider({
    value: 50
  });

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
      $.getJSON('assets/words/emoji/cute_kaomoji.json', function(jd) {
        $left = jd.cuteKaomoji[randomIndex(0,jd.cuteKaomoji.length - 1)];
        $right = jd.cuteKaomoji[randomIndex(0,jd.cuteKaomoji.length - 1)];

        $sliderTitle.left.html($left);
        $sliderTitle.right.html($right);
      });
      break;

    case 'emoji':
      $.getJSON('assets/words/emoji/emoji.json', function(jd) {
        $left = jd.emoji[randomIndex(588,664)];
        $right = jd.emoji[randomIndex(588,664)];

        $sliderTitle.left.html($left);
        $sliderTitle.right.html($right);
      });
      // If labels are emojis, increase font size
      $('#sliderlabels').css('font-size', '2em');
      break;

    default:
      break;

  }

}

// randomIndex
//
// return an integer between two values inclusive
function randomIndex(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}


// emoji 588-664


/*
<div class="question" id="sliderquestion">
  <img id="sliderimage" src="assets/images/slider-image.jpeg"></img>
  <div id="slider"></div>
</div>
*/
