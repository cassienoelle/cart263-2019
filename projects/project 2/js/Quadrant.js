'use strict';
/*****************

Quadrant Class

Draws individual quadrants of a circle
Extends PIXI.Graphics()

******************/

class Quadrant extends Graphics {
  constructor(xPlacement,yPlacement,radius,color,lightColor,alpha,interval,keyword) {
    super();
    this.xPlacement = xPlacement;
    this.yPlacement = yPlacement;
    this.radius = radius;
    this.color = color;
    this.lightColor = lightColor;
    this.keyword = keyword;
    this.a = alpha;
    this.vx;
    this.vy;
    this.hx;
    this.hy;
    this.cx = vertex.cx;
    this.cy = vertex.cy;
    this.interval = interval;
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

    this.clear();
    // Draw a BRIGHT quadrant (show when quadrant is lit up)
    this.beginFill(this.lightColor, 1);
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();
    // Draw a DARK coloured quadrant overlay (unlit)
    this.beginFill(this.color, this.a);
    this.moveTo(this.vx, this.vy);
    this.lineTo(this.cx, this.cy);
    this.lineTo(this.hx, this.hy);
    this.arcTo(this.hx, this.vy, this.vx, this.vy, this.radius);
    this.endFill();

    /*
      Radian calculations for arc()

      // Slice the circle in four using radians
      let radians = 1.570796326797 // equals one quarter circle
      let rads = {
        top: radians * 3, // 12 o'clock position
        right: 0, // 3 o'clock position
        bottom: radians, // 6 o'clock position
        left: radians * 2 // 9 o'clock position
      }
    */
  }

  display() {
    // Add to stage
    app.stage.addChild(this);
  }


  lightUp(length) {
    // Reduce opacity of DARK overlay to
    // reveal BRIGHT quadrant underneath (lit)
    this.a = 0;
    // After interval increase overlay opacity again (unlit)
    if (length === rapid) {
      setTimeout(() => {
        this.a = 1;
      }, this.interval/4);
    }
    else if (length === short) {
      setTimeout(() => {
        this.a = 1;
      }, this.interval);
    }
    else if (length === long) {
      responsiveVoice.speak(this.keyword,'UK English Male');
      setTimeout(() => {
        this.a = 1;
      }, this.interval * 4);
    }

  }


}
