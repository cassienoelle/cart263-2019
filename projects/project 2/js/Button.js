'use strict';
/*****************

Button Class

******************/

class Button {

  constructor(x, y, z, r, g, b, keyword) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width/6;
    this.height = height/6;
    this.r = r;
    this.g = g;
    this.b = b;
    this.keyword = keyword;
    this.a = 255;
  }

  display() {
    noStroke();
    push();
    translate(this.x,this.y,this.z);
    sphere(this.width,50,50);
    pop();
  }

  flash() {
    pointLight(250, 250, 250, this.x, this.y, 50);
    specularMaterial(this.r,this.g,this.b);
  }

}
