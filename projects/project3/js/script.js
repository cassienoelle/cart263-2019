"use strict";

/*****************

Art has a double face, of expression and illusion,
just like science has a double face:
the reality of error and the phantom of truth.

Cassie Smith

******************/


let colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

 colors.on('track', function(event) {
   if (event.data.length === 0) {
     // No colors were detected in this frame.
   } else {
     event.data.forEach(function(rect) {
       console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
     });
   }
 });

tracking.track('#myVideo', colors);


// let canvas, capture;
//
//
// // preload()
// //
// //
//
// function preload() {
//
// }
//
//
// // setup()
// //
// //
//
// function setup() {
//
//   canvas = createCanvas(640,480);
//   background(0);
//   capture = createCapture(VIDEO);
//   capture.size(640, 480);
//   capture.hide();
//
// }
//
//
// // draw()
// //
// //
//
// function draw() {
//
//   background(0);
//   tint(255, 0, 250);
//   image(capture, 0, 0);
//
// }
