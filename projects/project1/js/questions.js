"use strict";

/*****************

Word choice questions

******************/

function createWordChoice() {
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


function displayWordQuestion() {
  $questionHeader.html($nextWordTitle);
  $wordChoice.show();
}
