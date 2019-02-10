"use strict";

/*****************

Create image selection questions

******************/

function createImages() {
  // Get random keyword
  $keyword = $animals[randomIndex(0,$animals.length - 1)];
  $keywordNext = $animals[randomIndex(0,$animals.length - 1)];

  setTitles($keyword);
  $questionHeader.html($titles.imageSelectAction);

  // Set image sources, prevent caching
  // Preload using hidden image elements
  $imageOption.each(function(i) {
    if ($(this).hasClass('hide')) {
        $(this).attr('src', 'https://loremflickr.com/400/400/' + $keywordNext + '?random=' + i);
    }
    else {
      $(this).attr('src', 'https://loremflickr.com/400/400/' + $keyword + '?random=' + i);
    }
  });

  $imgSelect.show();

  $toggleFirst = true;
  console.log('toggle: ' + $toggleFirst);

}

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
