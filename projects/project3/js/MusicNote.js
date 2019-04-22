'use strict';
/*****************

MusicNote Class
Draws music notes flowing outwards
from a specific point

******************/

class MusicNote {
  constructor(img,x,y,vx,vy,w,h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.5;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.img,this.x,this.y,this.w,this.h);
    pop();
  }

}
