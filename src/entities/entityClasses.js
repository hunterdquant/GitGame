//Entity Class
//Base of all Entities, not directly used
class Entity /*extends Collidable*/ {
  constructor(x, y, frames) {
    this.x = x;
    this.y = y;
    this.animation = new Movie(frames);
    this.animation.x = this.x;
    this.animation.y = this.y;
    this.animation.animationSpeed = .25;

    console.log("Entity Created");
  }

  //Will be defined for Each Entity
  collision() {
    console.log("An Entity hit something");
  }

  init() {
    this.animation.play();
    gameScene.addChild(this.animation);
  }

  detach() {
    this.animation.stop();
    gameScene.removeChild(this.animation);
  }
}

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Units/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Unit Class
//Base of Different Units, not directly used
//Extension of Entity
class Unit extends Entity{
    constructor(x, y, frames, health) {
      super(x, y, frames);
      this.health = health;
      console.log("Unit Created");
    }

    //Will Be Defined for Each Unit
    movement() {
      console.log("A Unit Moved!");
    }
    attack() {
      console.log("A Unit Attacked!");
    }

    //Damage
    //causes damage to a Unit
    //Takes in a positive integer
    damage(dam) {
      this.health = this.health - dam;
      console.log(this.health);
    }

    //getHealth
    //returns the current health
    getHealth() {
      console.log(this.health);
      return this.health;
    }

    //getPosition
    //returns the positon [x,y]
    getPosition() {
      var pos = new vector(this.x,this.y);
      console.log(pos);
      return pos;
    }


}

//Player Class
//Extension on Unit
class Player extends Unit{
  constructor(x, y, frames, health, weapon, subWeapon){
    super(x, y, frames, health);

    this.weapon = weapon;
    this.subWeapon = subWeapon;
    this.moveStep = 4;
    console.log("Player Created");
  }

  //Moves the Player
  //Takes in an x and y which represent change in x and y coordinates
  movement(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    this.animation.x = this.x;
    this.animation.y = this.y;
  }

  attack() {
  //To Be Implemented
  console.log("You attacked!");
  }

  collision() {
  //To Be Implemented
  console.log("You ran into something....");
  }

}

//Enemy Class
//Extension of Unit
class Enemy extends Unit{
  constructor(health, texture, x, y){
    super(x, y, texture, health);
    console.log("Enemy Created");
  }

  movement() {
  //To Be Implemented
  console.log("An enemy is trying to get you! :O");
  }

  collision() {
  //To Be Implemented
  console.log("You really let an enemy walk into you...?");
  }
}

//ERG Class
//Extension of Enemy
class ERG extends Enemy{
  constructor(health, texture, x, y){
    super(health, texture, x, y);
    console.log("ERG Created");
  }

  //Moves an ERG Unit
  //Attempts to take shortest path to a given point, usually the player position
  //Takes in an x and y which are the position it is moving towards
  movement(x, y) {
  console.log("An ERG is trying to get you! :O");

  var xsign = (x - this.x)?(x - this.x)<0?-1:1:0;
  var ysign = (y - this.y)?(y - this.y)<0?-1:1:0;

  this.x += xsign;
  this.y += ysign;
  this.animation.x = this.x;
  this.animation.y = this.y;
  }



  collision() {
  //To Be Implemented
  console.log("You really let an ERG walk into you...?");
  }
}

//RAM Class
//Extension of Enemy
class RAM extends Enemy{
  constructor(health, texture, x, y){
    super(health, texture, x, y);
    console.log("RAM Created");

    this.charging = false;
    this.chargeDirectionX = 0;
    this.chargeDirectionY = 0;
  }

  //Moves a RAM Unit
  //Attempts to charge ar a player in only an x or y direction
  //moves x or y, until within acceptable range to charge
  movement(x, y) {
    console.log("A RAM is trying to get you! :O");
    var xdiff = x - this.x;
    var ydiff = y - this.y;
    if(this.charging == true){
      console.log("Charging");
      this.x += this.chargeDirectionX*5;
      this.y += this.chargeDirectionY*5;
      this.animation.x = this.x;
      this.animation.y = this.y;
    }

    else if(Math.abs(xdiff) < 5){
      console.log("Starting to charge Y");
      this.chargeDirectionY = (ydiff)?(ydiff)<0?-1:1:0;
      this.chargeDirectionX = 0;
      this.charging = true;
      this.y += this.chargeDirectionY*5;
      this.animation.y = this.y;
    }

    else if(Math.abs(ydiff) < 5){
      console.log("Starting to charge X");
      this.chargeDirectionX = (xdiff)?(xdiff)<0?-1:1:0;
      this.chargeDirectionY = 0;
      this.charging = true;
      this.x += this.chargeDirectionX*5;
      this.animation.x = this.x;
    }

    else{
      if(xdiff > ydiff){
        console.log("Positioning y");
        var sign = (ydiff)?(ydiff)<0?-1:1:0;
        this.y += sign;
        this.animation.y = this.y;
      }

      else{
        console.log("Positioning X");
        var sign = (xdiff)?(xdiff)<0?-1:1:0;
        this.x += sign;
        this.animation.x = this.x;
      }
    }
  }

  collision() {
  //To Be Implemented
  console.log("You really let a RAM hit you...?");
  }
}


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Items/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Item Class
//Base of All Items, not directly used
//Extension of Entity
class Item extends Entity{
  constructor(x, y, texture){
    super(x, y, texture);
    console.log("Item Created");
  }

  //Will Be Defined for Each Item
  modifier(){
    console.log("This item is modifiying things");
  }

}

//Recursion Rifle Pickup Class
//Extension of Item
class RecursionRiflePickup extends Item{
  constructor(x, y, texture){
    super(x, y, texture);
    console.log("Recursion Rifle Pickup Created");
  }

  modifier(){
    //Sets Player Weapon to Recursion Rifle
    console.log("This Recursion Rifle is modifiying things!")
  }

  collision(){
    //If its with a player, call modifier
    console.log("Hit a Recursion Rifle");
}
}

//Key Value Duals Pickup Class
//Extension of Item
class KeyValueDualsPickup extends Item{
  constructor(x, y, texture){
    super(x, y, texture);
    console.log("Key Value Duals Pickup Created");
  }

  modifier(){
    //Sets Player Weapon to Recursion Rifle
    console.log("These Key Value Duals are modifiying things")
  }

  collision(){
    //If its with a player, call modifier
    console.log("Hit some Key Value Duals");
  }
}

//Max Heap Blunderbuss Pickup Class
//Extension of Item
class MaxHeapBlunderbussPickup extends Item{
  constructor(x, y, texture){
    super(x, y, texture);
    console.log("Max Heap Blunderbuss Pickup Created");
  }

  modifier(){
    //Sets Player Weapon to Recursion Rifle
    console.log("This Max Heap Blunderbuss is modifiying things")
  }

  collision(){
    //If its with a player, call modifier
    console.log("Hit a Max Heap Blunderbuss");
  }
}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////Bullets////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Bullet Class
//Base of All Bullets, not directly used
//Extension of Entity
class Bullet extends Entity{
  constructor(x, y, texture, damage){
    super(x, y, texture);
    this.damage = damage;
    console.log("Bullet Created");
  }

  //Will Be Defined for Each Type of Bullet
trajectory(){
    console.log("This Bullet is going places!");
  }
}

//Beam Class
//Extension of Bullet
class Beam extends Bullet{
  constructor(x, y, texture, damage){
    super(x, y, texture, damage);
    console.log("Beam Created");
  }

  trajectory(){
    console.log("This Beam is going places!");
  }

  collision(){
    console.log("This Beam hit something!");
  }

}

//Bullets Class
//Extension of Bullet
class Bullets extends Bullet{
  constructor(x, y, texture, damage){
    super(x, y, texture, damage);
    console.log("Bullets Created");
  }

  trajectory(){
    console.log("These Bullets are going places!");
  }

  collision(){
    console.log("These Bullets hit something!");
  }

}

//Spread Class
//Extension of Bullet
class Spread extends Bullet{
  constructor(x, y, texture, damage){
    super(x, y, texture, damage);
    console.log("Spread Created");
  }

  trajectory(){
    console.log("This Spread is going everywhere!");
  }

  collision(){
    console.log("This Spread hit everything!");
  }

}

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Weapons///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Weapon Class
//Base of All Weapons, not directly used
//Extension of Entity
class Weapon extends Entity{
  constructor(x, y, texture, shoots, ammo){
    super(x, y, texture);
    this.shoots = shoots;
    this.ammo = ammo;
    console.log("Weapon Created");
  }
}

//Max Heap Blunderbuss Class
//Extension of Weapon
class MaxHeapBlunderbuss extends Weapon{
  constructor(x, y, texture, ammo){
    super(x, y, texture, "Spread", ammo);
    console.log("Max Heap Blunderbuss Created");
  }

  collision(){
    console.log("You just hit your Max Heap Blunderbuss on something...");
  }
}

//Key Value Duals Class
//Extension of Weapon
class KeyValueDuals extends Weapon{
  constructor(x, y, texture, ammo){
    super(x, y, texture, "Bullets", ammo);
    console.log("Key Value Duals Created");
  }

  collision(){
    console.log("You just hit your Key Value Duals on something...");
  }
}

//Recursion Rifle Class
//Extension of Weapon
class RecursionRifle extends Weapon{
  constructor(x, y, texture, ammo){
    super(x, y, texture, "Beam", ammo);
    console.log("Recursion Rifle Created");
  }

  collision(){
    console.log("You just hit your Recursion Rifle on something...");
  }
}
