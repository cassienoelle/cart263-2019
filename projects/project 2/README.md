# Project 2: Simon Said What!?

### The Idea
There's a lot to unpack in James Bridle's essay *Something is Wrong on the Internet*, and it's honestly right up my discursive alley, but I wanted to keep this project relatively light to avoid reproducing some of the violence he discusses. I decided to focus on this excerpt:

*'And yet, there is something weird about a group of people endlessly acting out the implications of a combination of algorithmically generated keywords…This is content production in the age of algorithmic discovery — even if you’re a human, you have to end up impersonating the machine.'*

There's undeniably a feedback loop in the interaction between humans and machines.  That said, popular ideas of artificial intelligence are often centered on programming machines to act like humans. Speech recognition / natural language processing is a prime example. By contrast, the ways in which machines influence human behaviour is normalized to the point of invisibilization.  With this in mind, I wanted to investigate the idea of humans impersonating machines as a kind of reverse-machine-learning: a computer generating random linguistic associations and 'training' a human to learn and adopt them via pattern recognition.

Thus, I recreated *Simon*, the electronic Simon Says game from the 80s (and a classic from my own childhood). I wanted to pay homage to Bridle's focus on children's content, but imagine what interaction would look like in a pre-Youtube, (mostly) pre-Internet era. The game is also clearly suited to pattern recognition, text-to-speech and the idea of impersonating a machine. Building Simon also happens to be a popular "learning programming" exercise, and I thought it would be fun to play around with.

### The Game

Four quadrants of a circle light up in a random pattern and the user has to repeat it. In this version, instead of pushing buttons to mimic the pattern, you speak the names of the colours aloud in the correct order.  Each time you mimic the pattern correctly, the pattern gets longer. From there, a few things can happen:
1. The keywords or meanings associated with the colours can be 'remixed' or shuffled. So, for example, when the game flashes *blue*, you now have to say *'green'*.  This forces you to overcome a level of cognitive dissonance and retrain your brain to associate colour names with totally different colours.
2. Simon can switch up the colours entirely from the classic green, red, blue, yellow to some of his favourites: web-colors such as *pale goldenrod* and *medium slate blue*. He is a computer program, after all.
3. The color names can get prepended with adjectives, so that *yellow* becomes *herbaceous yellow* or *purple* becomes *intellectually satisfying purple*. There's a random chance these adjectives could be R-rated, forcing the user to shout out expletives to advance in the game.
4. Simon's voice can get set to Welsh, translating words into mostly gibberish.

**Note**: The remix function happens every few rounds by default. To trigger the other changes, click the listening ear in the center of the game. This ear also visibly 'receives' sound to indicate your voice has registered properly.

### The Execution
I used Pixi.js to program Simon. I originally wanted to build something with Phaser, but I found the documentation way too frustrating. Because there's not a lot of physics in this game anyways, I went with Pixi since it's utilized by Phaser and I thought it might be a more accessible starting point.  This was probably a mistake. I wanted to learn something new but considering the time crunch I had, I should have just used P5 or jQuery.

It was still fun and I like that Simon turned out to be a bit of a cheeky bastard. I think the interaction could be built out and iterated further in the future. That said, it's not the most satisfying to play because of how slowly you have to talk for the voice recognition to work and how prone annyang is to mis-register what you say. This makes it hard to achieve longer patterns or get into a rhythm.
