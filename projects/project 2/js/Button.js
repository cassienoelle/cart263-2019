'use strict';
/*****************

Button Class

******************/

class Button {

  constructor(x, y, z, r, g, b, keyword) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width/2;
    this.height = height/2;
    this.r = r;
    this.g = g;
    this.b = b;
    this.keyword = keyword;
    this.a = 255;
  }

  display() {
    noStroke();
    push();
    fill(this.r,this.g,this.b,this.a);
    translate(this.x,this.y,this.z);
    box(this.width,this.height,50);
    pop();
  }

  flash() {
    let x = this.x + this.width;
    let y = this.y + this.height;
    pointLight(250, 250, 250, x, y);
  }

}
