'use strict';
/*****************

Quadrant Class

Draws pie pieces / individual circle quadrants
Extends PIXI.Graphics()

******************/

class Quadrant extends Graphics {
  constructor(xPlacement,yPlacement,radius,color,keyword) {
    super();
    this.xPlacement = xPlacement,
    this.yPlacement = yPlacement,
    this.radius = radius,
    this.color = color,
    this.keyword = keyword,
    this.a = 1,
    this.vx = undefined,
    this.vy = undefined,
    this.hx = undefined,
    this.hy = undefined,
    this.cx = vertex.cx,
    this.cy = vertex.cy
  }

  display() {
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

    // Draw shape
    this.beginFill(this.color, this.a);
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();
    app.stage.addChild(this);
  }
}
