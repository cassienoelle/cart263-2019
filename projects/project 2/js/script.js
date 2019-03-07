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
  createCanvas(1000,1000);

  one = new Button(0, 0, 255, 0, 0, 'red');
  two = new Button(width/2, 0, 0, 255, 0, 'green');
  three = new Button(width/2, height/2, 0, 0, 255, 'blue');
  four = new Button(0, height/2, 255, 255, 50, 'yellow');
}

function draw() {
  background(255);

  one.display();
  two.display();
  three.display();
  four.display();
}
