/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

RiTA
http://rednoise.org/rita/index.html

*/

let vowels = "aeiou";
let description, phrase, cat, color, room, firstArticle, secondArticle;

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json', gotData);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  description = $('<div></div>');
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.
  setDescription(data);

  $('body').append(description);

  $(document).click(() => {
    setDescription(data);
  });
}

function setDescription(data) {
    console.log('setting');
    // First the condiment
    // Get a random condiment from the condiments array in the JSON
    condiment = getRandomElement(data.condiments);
    // Assume it's singular
    verb = 'is';
    // Check if the last latter of the condiment is an 's'
    if (condiment.charAt(condiment.length - 1) === 's') {
      // If so, assume it's plural (this is a flawed assumption)
      verb = 'are';
    }

    // Now the cat
    cat = getRandomElement(data.cats);

    // Now the color, and make lower case
    color = getRandomElement(data.colors).color.toLowerCase();

    // Same again for room
    room = getRandomElement(data.rooms);

    // Check if either of the words following indefinite article begin
    // with a vowel, and if so change that article to 'an'
    if (checkVowels(cat)) {
      firstArticle = 'an';
    } else {
      firstArticle = 'a';
    };

    if (checkVowels(color)) {
      secondArticle = 'an';
    } else {
      secondArticle = 'a';
    }

    // Now we can construct our description with a template string
    // We have the basic structure of a sentence and we substitute in the
    // values we've just calculated
    phrase = `${condiment} ${verb} like ${firstArticle} ${cat} in ${secondArticle} ${color} ${room}.`;
    description.html(phrase);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// checkVowels()
//
// Check if first letter of word is a vowel and return true if so
function checkVowels(string) {
  let isVowel = false;;
  for (i = 0; i < vowels.length; i++) {
    console.log(vowels[i] + ': ' + string.indexOf(vowels[i]));
    if (string.indexOf(vowels[i]) === 0) {
      isVowel = true;
    }
 }

 return isVowel;
}
