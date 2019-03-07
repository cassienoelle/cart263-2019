'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let one;
let two;
let three;
let four;

function preload() {

}

function setup() {
  createCanvas(1000,1000, WEBGL);

  one = new Button(-width/4,-height/4, 0, 255, 0, 0, 'red');
  two = new Button(width/4, -height/4, 0, 0, 255, 0, 'green');
  three = new Button(width/4, height/4, 0, 0, 0, 255, 'blue');
  four = new Button(-width/4, height/4, 0, 255, 255, 50, 'yellow');
}

function draw() {
  background(0);

  one.display();
  two.display();
  three.display();
  four.display();
}



/*
function keyPressed() {
  if (keyCode === TAB) {
    let options = [one, two, three, four];
    let r = random(options);
    r.flash();
  }
}
*/
