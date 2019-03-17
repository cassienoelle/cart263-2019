'use strict';
/*****************

Quadrant Class

Draws individual quadrants of a circle
Extends PIXI.Graphics()

******************/

class Quadrant extends Graphics {
  constructor(xPlacement,yPlacement,radius,color,alpha,keyword) {
    super();
    this.xPlacement = xPlacement,
    this.yPlacement = yPlacement,
    this.radius = radius,
    this.color = color,
    this.keyword = keyword,
    this.a = alpha,
    this.vx = undefined,
    this.vy = undefined,
    this.hx = undefined,
    this.hy = undefined,
    this.cx = vertex.cx,
    this.cy = vertex.cy,
    this.bounds = undefined
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

  draw(mask) {
    this.setPosition();

    // Draw shape
    if (mask) {
      this.beginFill(this.color, 0);
    }
    else if (!mask) {
      this.beginFill(this.color, this.a);
    }
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();
    app.stage.addChild(this);
    this.bounds = this.getBounds();
  }



  // light() {
  //
  //   console.log('light');
  //   console.log(circle.x + ' ' + circle.y);
  //   testLight.beginFill(white);
  //   testLight.drawCircle(circle.x,circle.y,200,200);
  //   testLight.filters = [new PIXI.filters.BlurFilter(100)];
  //   testLight.endFill();
  //   app.stage.addChild(testLight);
  // }
}
