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
function getBoxCollision(e1, e2) {
  var retVec = new Vector(0,0);

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

function getSATCollision(e1, e2) {
  var e1Points = [];
  e1Points.push(new Vector(e1.animation.vertexData[0], e1.animation.vertexData[1]));
  e1Points.push(new Vector(e1.animation.vertexData[2], e1.animation.vertexData[3]));
  e1Points.push(new Vector(e1.animation.vertexData[4], e1.animation.vertexData[5]));
  e1Points.push(new Vector(e1.animation.vertexData[6], e1.animation.vertexData[7]));

  var e2Points = [];
  e2Points.push(new Vector(e2.animation.vertexData[0], e2.animation.vertexData[1]));
  e2Points.push(new Vector(e2.animation.vertexData[2], e2.animation.vertexData[3]));
  e2Points.push(new Vector(e2.animation.vertexData[4], e2.animation.vertexData[5]));
  e2Points.push(new Vector(e2.animation.vertexData[6], e2.animation.vertexData[7]));
  var axes = getNormals(e1Points, e2Points);

  for (var axis of axes) {
    var p1 = getProjection(e1Points, axis);
    var p2 = getProjection(e2Points, axis);
    if (!p1.overlaps(p2)) {
      return false;
    }
  }
  return true;
}

function getProjection(vertices, axis) {
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  for (var vertex of vertices) {
    var val = vertex.dot(axis);
    if (val < min) {
      min = val;
    } else if (val > max) {
      max = val;
    }
  }
  return new Projection(min, max);
}

function getNormals(e1Points, e2Points) {
  var normals = [];
  normals.push(e1Points[0].subtract(e1Points[1]).perp());
  normals.push(e1Points[1].subtract(e1Points[2]).perp());
  normals.push(e1Points[2].subtract(e1Points[3]).perp());
  normals.push(e1Points[3].subtract(e1Points[0]).perp());
  normals.push(e2Points[0].subtract(e2Points[1]).perp());
  normals.push(e2Points[1].subtract(e2Points[2]).perp());
  normals.push(e2Points[2].subtract(e2Points[3]).perp());
  normals.push(e2Points[3].subtract(e2Points[0]).perp());
  return normals;
}

class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  overlaps(proj) {
    return (this.min > proj.min && this.min < proj.max) ||
            (proj.min > this.min && proj.min < this.max);
  }
}
