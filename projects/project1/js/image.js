"use strict";

/*****************

Create image selection questions

******************/

function createImages() {
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
  $imgSelect.show();
}

/*

function displayImages() {
  // Get random keyword
  $keywordNext = $animals[randomIndex(0,$animals.length - 1)];

  $imageOption.each(function(i) {
    if ($(this).hasClass('hide')) {
      $(this).attr('src', 'https://loremflickr.com/400/400/' + $keywordNext + '?random=' + i);
    }
  });

  $imageOption.toggleClass('hide');


}
*/
