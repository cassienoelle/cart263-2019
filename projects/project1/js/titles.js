"use strict";

/*****************

Question titles

******************/

function setTitles(type, keyword) {

  let $article = 'a';
  let $vowels = 'aeiou';
  let $str = keyword;
  console.log('$str = ' + $str);
  for (let i = 0; i < $vowels.length; i++) {
    if ($str.charAt(0) === $vowels.charAt(i)) {
      $article = 'an';
    }
    console.log('article: ' + $article);
  }

  let $verb = $

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
        'Keep going! Remember: \n' + keyword
      ]

    default:
      break;
  }

  let $result = $titles[randomIndex(0,$titles.length - 1)];
  return $result;

}
