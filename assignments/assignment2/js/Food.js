// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,maxSpeed) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.maxSpeed = maxSpeed;
    this.vx = random(-this.maxSpeed,this.maxSpeed);
    this.vy = random(-this.maxSpeed,this.maxSpeed);
  }

  // reset()
  //
  // Set position to a random location on the canvas
  // Randomize velocity
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.vx = random(-this.maxSpeed,this.maxSpeed);
    this.vy = random(-this.maxSpeed,this.maxSpeed);
    this.size = random(this.minSize,this.maxSize);
  }

  // update()
  //
  // Updates position based on velocity
  // Constrains position to canvas
  // Changes velocity randomly every second
  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x,0,width);
    this.y = constrain(this.y,0,height);

    if (frameCount % 60 === 0) {
      console.log('yes');
      this.vx = random(-this.maxSpeed,this.maxSpeed);
      this.vy = random(-this.maxSpeed,this.maxSpeed);
    }
  }
}
