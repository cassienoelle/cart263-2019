"use strict";

/*****************

Question titles

******************/

function setTitles(type, keyword) {

  // Use correct grammar
  let $article = 'a';
  let $vowels = 'aeiou';
  let $str = keyword;
  for (let i = 0; i < $vowels.length; i++) {
    if ($str.charAt(0) === $vowels.charAt(i)) {
      $article = 'an';
    }
  }



  switch(type) {
    case 'IMAGE':
      $titles = [
        'If you were ' + $article + ' ' + keyword + ', which ' + keyword + ' would you be?',
        'Which ' + keyword + ' is your ideal partner?',
      ];
      break;

    case 'SLIDER':
      $titles = [
        'How does this make you feel?',
        'React to this image:'
      ];
      break;

    case 'MESSAGE':
      $titles = [
        'Remember, ' +  keyword.toLowerCase(),

      ]

    default:
      break;
  }

  let $result = $titles[randomIndex(0,$titles.length - 1)];
  return $result;

}
