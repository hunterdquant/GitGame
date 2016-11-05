//Entity Class
//Base of all Entities, not directly used
class Entity extends Collidable {
  constructor(x, y, width, height, frames) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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

  de:tach() {
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
    constructor(x, y, width, height, frames, health) {
      super(x, y, width, height, frames);
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
}

//Player Class
//Extension on Unit
class Player extends Unit{
  constructor(x, y, width, height, frames, health, weapon, subWeapon){
    super(x, y, width, height, frames, health);
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

  collision(entity) {
    // Get the direction of collision
    return getCollision(this, entity);
  }

  impulse(entity) {
    if (entity instanceof Enemy) {
      this.health -= entity.damage;
    }
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

  attack() {
  //To Be Implemented
  console.log("An enemy shot at you :'(");
  }

  collision() {
  //To Be Implemented
  console.log("You really let an enemy walk into you...?");
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

//Vector Class, which will be moving the sprites
class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}



//Projectile Class
//Base of All Bullets, not directly used
//Extension of Entity
class Projectile extends Entity{ //Base class is pretty simple
  constructor(x, y, texture, damage, VectorIn){
    super(x, y, texture);
    this.damage = damage;
    this.direction = new Vector(VectorIn.x, VectorIn.y);
    console.log("Projectile Created");
  }

  //Will Be Defined for Each Type of Projectile
trajectory(){
    console.log("This Projectile is going places!");
  }
}

//Beam Class
//Extension of Projectile
class Beam extends Projectile{
  constructor(x, y, texture, damage, VectorIn){
    super(x, y, texture, damage, VectorIn);
    console.log("Beam Created");
  }
  trajectory(){
    this.x = Player.x; //Name of player? Reference wrong?
    console.log("This Beam is NOT going places, but instead projecting from player to edge of screen!");
  }
  render(){
    
    //Stretch texture? For now surely we could just draw a long beam picture, optimization be damned.
  }
  collision(entity){
    console.log("This Beam hit something!");
    //No further methods, a beam won't dissapear or anything just because it hit something - instead it will exist across it's 'lifespan'
  }
  impulse(entity){
    if (entity instanceOf Enemy){
      //Call the damage function.
    }
  }
}

//Bullets Class
//Extension of Projectile
class Bullets extends Projectile{
  constructor(x, y, texture, damage, VectorIn){
    super(x, y, texture, damage, VectorIn);
    this.lifespan = 600; //lifespan variable is important for fading away
    console.log("Bullets Created");
  }
  trajectory(){
    console.log("These Bullets are going places!");
    this.x = this.x+VectorIn.x;
    this.y = this.y+VectorIn.y;
  }
  render(){
    //Move sprite by VectorIn
  }
  collision(entity){
    //Delete this Bullet
  }
  impulse(entity){
    if(entity InstanceOf enemy){ //damage the enemy if it is an enemy
     //Call the damage function
    }
  }
}

//Spread Class
//Extension of Projectile
class Spread extends Projectile{
  constructor(x, y, texture, damage, VectorIn){
    super(x, y, texture, damage, VectorIn);
    console.log("Spread Created");
  }

  trajectory(){
    this.lifespan--;
    console.log("This Spread is staying put!"); //I don't believe spread should ever move - it should 'appear' at once and then fade.
  }
  
  render(){
    //Just draw the correct frame based on lifespan - I'll have a 'puff of smoke' animation
  }

  //no collision for this projectile either - spread just exists, it doesn't 'get hit' by anything, it only hits in impulse().
  
  impulse(entity){ //But it does damage things it touches!
    if(entity instanceOf enemy){
      //Call the damage function
    }
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

  render(){
   
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
