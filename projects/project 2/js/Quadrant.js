'use strict';
/*****************

Quadrant Class

Draws individual quadrants of a circle
Extends PIXI.Graphics()

******************/

class Quadrant extends Graphics {
  constructor(xPlacement,yPlacement,radius,color,lightColor,alpha,keyword) {
    super();
    this.xPlacement = xPlacement;
    this.yPlacement = yPlacement;
    this.radius = radius;
    this.color = color;
    this.lightColor = lightColor;
    this.keyword = keyword;
    this.a = alpha;
    this.vx = undefined;
    this.vy = undefined;
    this.hx = undefined;
    this.hy = undefined;
    this.cx = vertex.cx;
    this.cy = vertex.cy;
    this.interval = 500;
  }

  setPosition() {
    // Determine vertices based on x-axis placement
    if (this.yPlacement === 'top') {
      this.vx = vertex.tx;
      this.vy = vertex.ty;
    } else if (this.yPlacement === 'bottom') {
      this.vx = vertex.bx;
      this.vy = vertex.by;
    }
    // Determine additional vertices based on y-axis placement
    if (this.xPlacement === 'left') {
      this.hx = vertex.lx;
      this.hy = vertex.ly;
    } else if (this.xPlacement === 'right') {
      this.hx = vertex.rx;
      this.hy = vertex.ry;
    }
  }

  draw() {
    // Determine relative placement of this quadrant
    this.setPosition();

    // Draw a bright quadrant (to display when quadrant is lit up)
    this.beginFill(this.lightColor, 1);
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();
    // Draw a darker coloured quadrant overtop (this is unlit)
    this.beginFill(this.color, this.a);
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();
    // Add to stage
    app.stage.addChild(this);
  }

  lightUp() {
    console.log('light');
      topLeft.a = 0;
    setTimeout(function() {
      console.log('darken');
      topLeft.a = 1;
    }, this.interval);

  }


}
