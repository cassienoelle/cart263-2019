'use strict';
/*****************

Light Class

Draws a white circle with a heavy blur filter
to imitate light underneath any semi-opaque layer
Extends PIXI.Graphics()

******************/

class Light extends Graphics {
  constructor(x,y,width,height,color,blur) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.blur = blur;
  }

  create() {
    // Draw light underneath
    console.log('light');
    console.log(this.x + ' ' + this.y);
    this.beginFill(this.color)
    this.drawCircle(this.x,this.y,this.width,this.height);
    this.filters = [new PIXI.filters.BlurFilter(blur)];
    app.stage.addChild(this);
  }
}
