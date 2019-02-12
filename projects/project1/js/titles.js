"use strict";

/*****************

Question titles

******************/

function setTitles(type, keyword, array) {

  // Use correct grammar
  let $article = 'a';
  let $vowels = 'aeiou';
  let $str = keyword;
  for (let i = 0; i < $vowels.length; i++) {
    if ($str.charAt(0) === $vowels.charAt(i)) {
      $article = 'an';
    }
  }

  let $person = $people[randomIndex(0,$people.length - 1)];

  switch(type) {
    case 'IMAGE':
      if (array === $animals || array === $creatures) {
        $titles = [
          'If you were ' + $article + ' ' + keyword + ', which ' + keyword + ' would you be?',
          'Which ' + keyword + ' is your ideal ' + $person + '?',
          'Pick the ' + keyword + ' you are most drawn to.'
        ];
      }
      else if (array === $vegetables) {
        $titles = [
          'Pick the most delicious ' + keyword + '.',
          'Choose a midnight snack!'
        ];
      }
      else if (array === $bodyParts) {
        $titles = [
          'Which ' + keyword + ' is the ' + keyword + ' of your dreams?',
          'Pick the sexiest ' + keyword + ".",
          'Pick your fave ' + keyword + ".",
          'Which ' + keyword + ' reminds you of your ' + $person + '\'s ' + keyword + ".",
          'Which ' + keyword + ' is most like yours?'
        ]
      }
      break;

    case 'SLIDER':
      $titles = [
        'How does this make you feel?',
        'React to this image:'
      ];
      break;

    case 'WORD':
      $titles = [
        'How would you describe yourself?',
        'By my next birthday, I hope to be more...\' ',
        'On an average day, I\'m pretty...',
        'My friends would describe me as...'
      ];
      break;

    case 'MESSAGE':
      $titles = [
        '\'<em>' + keyword + '</em>\''
      ];
      break;

    default:
      break;
  }

  let $result = $titles[randomIndex(0,$titles.length - 1)];
  return $result;

}
