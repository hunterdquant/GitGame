///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Weapons///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Weapon Class
//Base of All Weapons, not directly used
//Extension of Entity
class Weapon {
  constructor(x, y, texture, playerX, playerY) {
    this.x = x;
    this.y = y;
    this.playerX = playerX;
    this.playerY = playerY;
    this.rotation = 0;
    this.sprite = new Sprite(texture);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  /* Spawns a projectile and fires in the direction of the input vector */
  fire(vector) {
    // console.log('bang in ' + vector.x + " " + vector.y);
    
  }

  /* Updates the rotation and position of the weapon around the player */
  update(x, y) {
    // console.log('updating weapon');
    this.x += x;
    this.y += y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.rotation = this.rotation;
  }

  /* Updates weapons sprite */
  render(vector) {
    let rotatePos = rotateLookup(vector.x, vector.y);
    // console.log(rotatePos);
    this.x = this.playerX + rotatePos.x;
    this.y = this.playerY + -rotatePos.y;
    this.rotation = rotatePos.rot;
    console.log(this.x, this.y);
    this.update(0,0);
  }

  sendPos(x,y) {
    this.playerX = x;
    this.playerY = y;
  }

  init() {
    gameScene.addChild(this.sprite);
  }
}

function rotateLookup(x,y) {
  let rad = function(deg) {
    return deg * Math.PI / 180;
  }

  let table = [
    [ // X = -1
      {x: 45, y: -50, rot: rad(-225)}, // Y = -1 (bottom-left)
      {x: 35, y: -60, rot: rad(180)}, // Y = 0 (left)
      {x: 0, y: -70, rot: rad(-135)} // Y = 1 (top-left)
    ],
    [ // X = 0
      {x: 105, y: -20, rot: rad(-270)}, // Y = -1 (bottom)
      {x: 0, y: 0, rot: rad(0)}, // Y = 0 (center)
      {x: 50, y: -40, rot: rad(-90)} // Y = 1 (top)
    ],
    [ // X = 1
      {x: 80, y: -10, rot: rad(-315)}, // Y = -1 (bottom-right)
      {x: 55, y: 0, rot: rad(0)}, // Y = 0 (right)
      {x: 45, y: -10, rot: rad(-45)} // Y = 1 (top-right)
    ]
  ];

  return table[x+1][y+1];
}

//Max Heap Blunderbuss Class
//Extension of Weapon
class MaxHeapBlunderbuss extends Weapon {
  constructor(x, y, texture, playerX, playerY) {
    super(x, y, texture, playerX, playerY);
    console.log("Max Heap Blunderbuss Created");
  }
}

//Key Value Duals Class
//Extension of Weapon
class KeyValueDuals extends Weapon {
  constructor(x, y, texture, playerX, playerY) {
    super(x, y, texture, playerX, playerY);
    console.log("Key Value Duals Created");
  }
}

//Recursion Rifle Class
//Extension of Weapon
class RecursionRifle extends Weapon {
  constructor(x, y, texture, playerX, playerY) {
    super(x, y, texture, playerX, playerY);
    console.log("Recursion Rifle Created");
  }
}
