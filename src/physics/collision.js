class Collidable {
  collision(entity) {
    console.log(this + ' sending impulse to ' + entity);
    entity.impulse(this);
  }

  impulse(entity) {
    console.log(this + ' has been impulsed by ' + entity);
  }
}

/* Returns a vector giving the direction at which e1 collided with e2 */
function getCollision(e1, e2) {
  var retVec = new Vec2(0,0);

  // Bounding box collision.
  if (e1.x < e2.x + e2.width &&
      e1.x + e1.width > e2.x &&
      e1.y < e2.y + e2.height &&
      e1.y + e1.height > e2.y) {
    if (e1.x > e2.x) {
      retVec.x = 1;
    } else {
      retVec.x = -1;
    }
    if (e1.y > e2.y) {
      retVec.y = 1;
    } else {
      retVec.y = -1;
    }
  }
  return retVec;
}

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
