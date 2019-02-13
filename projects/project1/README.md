# Project 1

This project was inspired by Camus' The Myth of Sisyphus, an essential treatise on his philosophy of the Absurd. The Absurd represents the central paradox of human existence: we are compelled to continuously search for meaning in an indifferent, meaningless universe.

This state of perpetual existential discord is likened to the Greek tale of Sisyphus, who was condemned for all eternity to push a boulder up a hill, only to have it roll back down when he neared the top. 

In order to engage with these ideas I created an endless online quiz / personality test, the goal of which is to 'find yourself' (#wanderlust).  This is, of course, an inherently absurd goal that relies on an objectified conception of the self as separate, determinant and therefore discoverable through some precise set of means.

I'm particularly interested in the way this trope of finding one's self iterates throughout our current late-capitalist techno-culture, where alienation is systemic, the 'self' is considered a quantifiable commodity, and corporations optimize their workforce according to Myers-Briggs type indicator.

In this context, clickbait quizzes operate as thinly veiled marketing schemes and the self-help/mindfulness industrial complex churns out recipes for relief, packaged for instant delivery by the source of your anxieties.

But basically, I built a personality quiz and styled the interface like Buzzfeed.

The questions are randomly generated and designed to be as ridiculous as the end goal. As soon as you get close to completing the quiz, your answers become invalid and the progress bar reverts to zero, forcing you to continue answering questions indefinitely.  Encouragement is given via positive affirmations in the sidebar, which you can opt to have spoken out loud (via **ResponsiveVoice**). The first time you play an affirmation, a simple carousel of suggested self-help books will appear below, to aid you in your endless journey towards self-actualization.

### Technical Notes

Questions are generated using keywords pulled from **corpora** (mostly) and related images from **loremflickr**. Ideally, I would have added more keyword and title options in order to generate a wider variety of questions. I had some trouble with load-times for the images so I tried to generate the questions at least a step before they were displayed so the images could preload. It worked, but if the user clicks through too quickly there is still some lag. Other broken dreams and failed aspirations: a fake captcha for the user to declare they are not, in fact, a robot and some code to force the user to answer each question before moving on to the next.
