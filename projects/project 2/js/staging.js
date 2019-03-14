'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type);

// Create Pixi app
let app = new PIXI.Application({
    width: 800,
    height: 600,
    antialias: true,
    backgroundColor: 0x000000
});

window.onload = function() {
  document.body.appendChild(app.view);

  // Snap canvas size to window size
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  resize();
  window.onresize = resize;
}



//------------------------------
// Draw the base circle

let circle = new PIXI.Graphics();
let radius;

if (window.innerWidth >= window.innerHeight) {
  radius = (window.innerHeight * 0.9) / 2;
} else if (window.innerHeight > window.innerWidth) {
  radius = (window.innerHeight * 0.9) / 2;
}

circle.beginFill(0xE9EBEE);
circle.drawCircle(0, 0, radius);
circle.x = window.innerWidth;
circle.y = window.innerHeight;
circle.endFill();

app.stage.addChild(circle);

// Draw an arc
let arc = new PIXI.Graphics();
let border = 20;
let quarter = 1.570796326797;



arc.lineStyle(5, 0xAA00BB);
arc.moveTo(window.innerWidth/2, window.innerHeight/2);
arc.arcTo(
  circle.x, circle.y,
  circle.x, circle.y,
  radius
);
app.stage.addChild(arc);

//-------------------------------


// Resize canvas to window size and set width / height variables
function resize() {
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  circle.x = window.innerWidth/2;
  circle.y = window.innerHeight/2;
}


//-------------------------------


let graphics = new PIXI.Graphics();

// set a fill and line style again
graphics.lineStyle(10, 0xFF0000, 0.8);
graphics.beginFill(0xFF700B, 1);

// Draw a shape
graphics.moveTo()


// graphics.moveTo(210,300);
// graphics.lineTo(450,320);
// graphics.lineTo(570,350);
// graphics.quadraticCurveTo(600, 0, 480,100);
// graphics.lineTo(330,120);
// graphics.lineTo(410,200);
// graphics.lineTo(210,300);
graphics.endFill();


app.stage.addChild(graphics);
