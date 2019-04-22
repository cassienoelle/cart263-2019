# Project 3: Face The Music

This is an interactive music generation project using p5.js, Pizzicato.js, AudioSynth.js and PoseNet, a pre-trained machine learning model for human pose-estimation. PoseNet is accessible as part of ml5.js, a high level interface to TensorFlow.js.

My original idea was to use analyze a live webcam feed in order to 'turn your face into a piece of music', hence the title *Face The Music*. While I began by looking mainly at facial recognition models, technical challenges and a desire for increased interactivity led me to PoseNet.

I maintained the concept of turning a face into music by generating a beat according to the distance between facial keypoints (ears, eyes, mouth).  The beat updates in real-time as the user's face gets closer or further from the camera.  Beyond that I added interactivity by tracking the location of both wrists. Using AudioSynth, I created an organ instrument for each hand/wrist.  Music is generated according to a pentatonic scale depending on the location of your hands/wrists on the canvas. The scale is selected randomly in either a Minor or Major key depending on the user's indicated mood.

By moving around in an almost-dance, it's possible to generate a relatively lush ambient soundscape. I wanted to create a synesthetic experience grounded in an intuitive and embodied interaction. To some extent I was inspired by classic works like David Rokeby's *Very Nervous System*.

I would love to expand on this project and add generative visuals and more complex options for the sound interactivity.  Since PoseNet can detect multiple poses (multiple people), it would be interesting to create an algorithm for the sound analysis that allows two people to harmonize or 'jam' together on different instruments.
