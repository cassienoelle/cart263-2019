'use strict';
/*****************

Button Class

******************/

class Button {

  constructor(x, y, r, g, b, keyword) {
    this.x = x;
    this.y = y;
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
    fill(this.r,this.g,this.b,this.a);
    rect(this.x,this.y,this.width,this.height);
  }

  flash() {
    this.a = 100;
    setTimeout(function() {
      this.a = 255;
    }, 3000);
  }

}
