//Entity Class
//Base of all Entities, not directly used
class Entity {
  constructor(position, asset) {
    this.position = position;
    this.asset = asset;
    console.log("Entity Created");
  }

  //Will be defined for Each Entity
  collision() {
    console.log("An Entity hit something");
  }
}

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Units/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Unit Class
//Base of Different Units, not directly used
//Extension of Entity
class Unit extends Entity{
    constructor(position, asset, health) {
      super(position, asset);
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
  constructor(health, asset, position, weapon, subWeapon){
    super(position, asset, health);

    this.weapon = weapon;
    this.subWeapon = subWeapon;

    console.log("Player Created");
  }

  //Moves the Player
  //Takes in an x and y which represent change in x and y coordinates
  movement(x, y) {
  console.log(this.position[0] + " " + this.position[1]);
  this.position[0]=this.position[0]+x;
  this.position[1]=this.position[1]+x;
  console.log(this.position[0] + " " + this.position[1]);
  console.log("You moved!");
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
  constructor(health, asset, position){
    super(position, asset, health);
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
  constructor(position, asset){
    super(position, asset);
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
  constructor(position, asset){
    super(position, asset);
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
  constructor(position, asset){
    super(position, asset);
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
  constructor(position, asset){
    super(position, asset);
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
  constructor(position, asset, damage){
    super(position, asset);
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
  constructor(position, asset, damage){
    super(position, asset, damage);
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
  constructor(position, asset, damage){
    super(position, asset, damage);
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
  constructor(position, asset, damage){
    super(position, asset, damage);
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
  constructor(position, asset, shoots, ammo){
    super(position, asset);
    this.shoots = shoots;
    this.ammo = ammo;
    console.log("Weapon Created");
  }
}

//Max Heap Blunderbuss Class
//Extension of Weapon
class MaxHeapBlunderbuss extends Weapon{
  constructor(position, asset, ammo){
    super(position, asset, "Spread", ammo);
    console.log("Max Heap Blunderbuss Created");
  }

  collision(){
    console.log("You just hit your Max Heap Blunderbuss on something...");
  }
}

//Key Value Duals Class
//Extension of Weapon
class KeyValueDuals extends Weapon{
  constructor(position, asset, ammo){
    super(position, asset, "Bullets", ammo);
    console.log("Key Value Duals Created");
  }

  collision(){
    console.log("You just hit your Key Value Duals on something...");
  }
}

//Recursion Rifle Class
//Extension of Weapon
class RecursionRifle extends Weapon{
  constructor(position, asset, ammo){
    super(position, asset, "Beam", ammo);
    console.log("Recursion Rifle Created");
  }

  collision(){
    console.log("You just hit your Recursion Rifle on something...");
  }
}
