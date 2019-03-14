'use strict';
/*****************

Button Class

******************/

class Button {

  constructor(x,y,color,keyword) {
    this.x = x,
    this.y = y,
    this.color = color,
    this.arc = new PIXI.Graphics(),
    this.line1 = new PIXI.Graphics(),
    this.line2 = new PIXI.Graphics()
  }

  draw() {
    console.log('run');
    this.arc.lineStyle(5, this.color, 1);
    this.arc.arc(this.x, this.y, 100, Math.PI, 2 * Math.PI);
    app.stage.addChild(this.arc);
  }

}

/*
arc (cx, cy, radius, startAngle, endAngle, anticlockwise)
*/
