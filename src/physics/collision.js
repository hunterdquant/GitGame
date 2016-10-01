class Collidable {
  collision(entity) {
    console.log(this + ' sending impulse to ' + entity);
    entity.impulse(this);
  }

  impulse(entity) {
    console.log(this + ' has been impulsed by ' + entity);
  }
}
