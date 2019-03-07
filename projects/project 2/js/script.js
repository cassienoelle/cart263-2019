'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let width = 1000;
let height = 1000;

let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: {
      create: create
    }
};

let game = new Phaser.Game(config);

//----------------------------

let rectOne;
let rectTwo;
let rectThree;
let rectFour;

let green = 0xffeb32;
let red = 0xee3321;
let blue = 0x2152ee;
let yellow = 0x54bf4f;

let rectWidth = width/2;
let rectHeight = height/2;

let light;

//----------------------------

function preload () {

}

function create () {
  rectOne = new Phaser.Geom.Rectangle(0, 0, rectWidth, rectHeight);
  rectTwo = new Phaser.Geom.Rectangle(width/2, 0, rectWidth, rectHeight);
  rectThree = new Phaser.Geom.Rectangle(0, height/2, rectWidth, rectHeight);
  rectFour = new Phaser.Geom.Rectangle(width/2, height/2, rectWidth, rectHeight)

  let graphicsOne = this.add.graphics({ fillStyle: {color: red} });
  let graphicsTwo = this.add.graphics({ fillStyle: {color: blue} });
  let graphicsThree = this.add.graphics({ fillStyle: {color: green} });
  let graphicsFour = this.add.graphics({ fillStyle: {color: yellow} });

  graphicsOne.fillRectShape(rectOne);
  graphicsTwo.fillRectShape(rectTwo);
  graphicsThree.fillRectShape(rectThree);
  graphicsFour.fillRectShape(rectFour);

  rectOne.setPipeline('Light2D');q
  light = this.lights.addLight(0 + rectWidth/2, 0 + rectHeight/2, 200);
  this.lights.enable().setAmbientColor(0x555555);
};
