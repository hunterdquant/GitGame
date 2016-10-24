///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Weapons///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Weapon Class
//Base of All Weapons, not directly used
//Extension of Entity
class Weapon {
  constructor(x, y, texture, shoots, ammo) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.sprite = new Sprite(texture);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.shoots = shoots;
    this.ammo = ammo;
  }

  /* Spawns a projectile and fires in the direction of the input vector */
  fire(vector) {
    console.log('bang in ' + vector.x + " " + vector.y);
  }

  /* Updates the rotation and position of the weapon around the player */
  update(vector) {
    console.log('updating weapon');
  }

  /* Updates weapons sprite */
  render() {
    console.log('rendering weapon');
  }
}

//Max Heap Blunderbuss Class
//Extension of Weapon
class MaxHeapBlunderbuss extends Weapon {
  constructor(x, y, texture, ammo) {
    super(x, y, texture, "Spread", ammo);
    console.log("Max Heap Blunderbuss Created");
  }
}

//Key Value Duals Class
//Extension of Weapon
class KeyValueDuals extends Weapon {
  constructor(x, y, texture, ammo) {
    super(x, y, texture, "Bullets", ammo);
    console.log("Key Value Duals Created");
  }
}

//Recursion Rifle Class
//Extension of Weapon
class RecursionRifle extends Weapon {
  constructor(x, y, texture, ammo) {
    super(x, y, texture, "Beam", ammo);
    console.log("Recursion Rifle Created");
  }
}
