//Vector Class, which will be moving the sprites
class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

  dot(v) {
    return this.x*v.x + this.y*v.y;
  }

  perp() {
    // A new vector rotated pi/2
    return new Vector(this.y, -this.x);
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}
