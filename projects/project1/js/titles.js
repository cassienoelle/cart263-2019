"use strict";

/*****************

Question titles

******************/

// setTitles()
//
// Using keyword generate semi-random question text
// depending on question type
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
          'Choose a midnight snack:',
          'Which ' + keyword + ' would you eat for dinner?',
          'If you were ' + $article + ' ' + keyword + ', which ' + keyword + ' would you be?',

        ];
      }
      else if (array === $bodyParts) {
        $titles = [
          'Which ' + keyword + ' belongs to a celebrity?',
          'Pick the sexiest ' + keyword + ".",
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

    case 'AGREESLIDER':
      $titles = [
        'The aesthetic of this piece feels distinctly reminiscent of early ' + keyword + '.',
        'The aesthetic of this piece feels distinctly reminiscent of later ' + keyword + '.',
        'This exemplary work of ' + keyword + ' belongs in a museum.',
      ]
      break;

    case 'WORD':
      $titles = [
        'How would you describe yourself?',
        'In the future, I hope to be more...',
        'On an average day, I\'m pretty...',
        'My friends would describe me as...'
      ];
      break;

    case 'MESSAGE':
      $titles = [
        keyword
      ];
      break;

    default:
      break;s
  }

  let $result = $titles[randomIndex(0,$titles.length - 1)];
  return $result;

}
