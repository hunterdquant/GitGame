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
    this.animation.rotation = 0;
    this.animation.animationSpeed = .25;
  }

  //Will be defined for Each Entity
  collision() {
    console.log("An Entity hit something");
  }

  init() {
    this.animation.play();
    gameScene.addChild(this.animation);
    this.animation.calculateVertices();
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
  constructor(x, y, width, height, frames, health, weapon, subWeapon){
    super(x, y, width, height, frames, health);
    this.weapon = new KeyValueDuals(x, y+25, weaponTextures.recursionRifle, this.x, this.y);
    this.subWeapon = subWeapon;
    this.moveStep = 4;
    this.invincible = false;
    this.maxhealth = health;
    this.iFrames = 60;
    this.curIFrames = 0;
    this.remainingHitShield = 0;//for firewall
    this.countDoubleFireRate=0;//
    console.log("Player Created");
	}
	gotHealthPickup(){
    if (this.health >= this.maxhealth - 25) {
      this.health = this.maxhealth;
    } else {
		    this.health=this.health + 25;
    }
	}
	gotHitShield(){
		this.remainingHitShield = this.remainingHitShield + 3;
	}
	hasRemainingHitShield(){
		if(this.remainingHitShield == 0){
			return false;
		}
		else{
			this.remainingHitShield --;
			return true;
		}
	}
	gotDoubleFireRate(){
		this.weapon.doubleFireRate();
	}
	gotHealthIncrease(){
	   this.maxhealth += 20;
	}

	gotEnemySlowdown(){
		gameWorld.enemySlowDown();
	}
  //Moves the Player
  //Takes in an x and y which represent change in x and y coordinates
  movement(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    this.animation.x = this.x;
    this.animation.y = this.y;
    this.weapon.sendPos(this.x, this.y);
  }

  attack(vector) {
    return this.weapon.fire(vector);
  }

  collision(entity) {
    // Get the direction of collision
    return getBoxCollision(this, entity);
  }

  die() {
    gameState = gameStates.lose;
  }
}

class Pickup extends Unit{
	constructor(x, y, width, height, texture){
    super(x, y, width, height, texture, 1);
    this.dead = false;
    this.damage = 0;
    this.animation.anchor.x = 0.5;
	this.health=1;
    console.log("Enemy Created");
}}
class HealthPickup extends Pickup{
	impulse(player){
		player.gotHealthPickup();
		this.dead = true;
	}
}
class HitShield extends Pickup{
	impulse(player){
		player.gotHitShield();
		this.dead = true;
	}
}
class DoubleFireRate extends Pickup{
	impulse(player){
		player.gotDoubleFireRate();
		this.dead = true;
	}
}
class HealthIncrease extends Pickup{
	impulse(player){
		player.gotHealthIncrease();
		this.dead = true;
	}
}
class EnemySlowdown extends Pickup{
	impulse(player){
		player.gotEnemySlowdown();
		this.dead = true;
	}
}

//Enemy Class
//Extension of Unit
class Enemy extends Unit{
  constructor(x, y, width, height, texture, health, speed, xmin, xmax, ymin, ymax){
    super(x, y, width, height, texture, health);
    this.speed = speed;
    this.baseSpeed = speed;
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.dead = false;
    this.damage = 5;
    this.animation.anchor.x = 0.5;
    console.log("Enemy Created");
  }

  movement() {
  //To Be Implemented
  }

	slowDown(slowMult){
    if (slowMult > 9) {
		    slowMult = 9;
    }
    this.speed = (this.baseSpeed*(1 - 0.1*slowMult));
	}

  collision() {
  //To Be Implemented
  }

  impulse(entity) {
    if (entity instanceof Player) {
      if (!entity.hasRemainingHitShield() ) {
        entity.health -= this.damage;
      }
    }
  }
}

//ERG Class
//Extension of Enemy
class ERG extends Enemy{
  constructor(x, y, width, height, texture, health, speed, xmin, xmax, ymin, ymax){
    super(x, y, width, height, texture, health, speed, xmin, xmax, ymin, ymax);
    console.log("ERG Created");
	//console.log(callback.toString());
  }

  //Moves an ERG Unit
  //Attempts to take shortest path to a given point, usually the player position
  //Takes in an x and y which are the position it is moving towards
  movement(x, y) {

  var xsign = (x - this.x)?(x - this.x)<0?-1:1:0;
  if (xsign > 0) {
    this.animation.scale.x = -1;
  } else {
    this.animation.scale.x = 1;
  }
  var ysign = (y - this.y)?(y - this.y)<0?-1:1:0;
  if(this.x + xsign*this.speed + this.width > this.xmax){
    this.x = this.xmax - this.width;
  }
  else if(this.x + xsign*this.speed < this.xmin){
    this.x = this.xmin;
  }
  else{
    this.x += xsign*this.speed;
  }
  if(this.y + ysign*this.speed + this.height > this.ymax){
    this.y = this.ymax - this.height;
  }
  else if(this.y + ysign*this.speed < this.ymin){
    this.y = this.ymin;
  }
  else {
    this.y += ysign*this.speed;
  }

  this.animation.x = this.x;
  this.animation.y = this.y;
  }

  collision() {
  //To Be Implemented
  }
}

//RAM Class
//Extension of Enemy
class RAM extends Enemy{
  constructor(x, y, width, height, movingTexture, chargingTexture, health, speed, xmin, xmax, ymin, ymax){
    super(x, y, width, height, movingTexture, health, speed, xmin, xmax, ymin, ymax);
    console.log("RAM Created");
    this.movingTexture = movingTexture;
    this.chargingTexture = chargingTexture;
    this.charging = false;
    this.chargeDirectionX = 0;
    this.chargeDirectionY = 0;
  }

  //Moves a RAM Unit
  //Attempts to charge ar a player in only an x or y direction
  //moves x or y, until within acceptable range to charge
  movement(x, y) {
    var xdiff = x - this.x;
    if (xdiff >= 0 && !this.charging) {
      this.animation.scale.x = -1;
    } else if (!this.charging){
      this.animation.scale.x = 1;
    }
    var ydiff = y - this.y;
    if(this.charging == true){
      if(this.x + this.width + this.chargeDirectionX*5*this.speed >= this.xmax){
        this.x = this.xmax - this.width;
        this.charging = false;
        //this.animation.texture = this.movingTexture;
      }
      else if(this.x + this.chargeDirectionX*5*this.speed <= this.xmin){
        this.x = this.xmin;
        this.charging = false;
        //this.animation.texture = this.movingTexture;
      }
      else if(this.y + this.height + this.chargeDirectionY*5*this.speed >= this.ymax){
        this.y = this.ymax - this.height;
        this.charging = false;
        //this.animation.texture = this.movingTexture;
      }
      else if(this.y + this.chargeDirectionY*5*this.speed <= this.ymin){
        this.y = this.ymin;
        this.charging = false;
        //this.animation.texture = this.movingTexture;
      }
      else{
        this.x += this.chargeDirectionX*this.speed*5;
        this.y += this.chargeDirectionY*this.speed*5;
      }
    }

    else if(Math.abs(xdiff) < 5){
      this.chargeDirectionY = (ydiff)?(ydiff)<0?-1:1:0;
      this.chargeDirectionX = 0;
      this.charging = true;
      //this.animation.texture = this.chargingTexture;
    }

    else if(Math.abs(ydiff) < 5){
      this.chargeDirectionX = (xdiff)?(xdiff)<0?-1:1:0;
      this.chargeDirectionY = 0;
      this.charging = true;
      //this.animation.texture = this.chargingTexture;
    }

    else{
      if(xdiff > ydiff){
        var sign = (ydiff)?(ydiff)<0?-1:1:0;
        if(this.y  + sign*this.speed + this.height > this.ymax){
          this.y = this.ymax - this.height;
        }
        else if(this.y + sign*this.speed < this.ymin){
          this.y = this.ymin
        }
        else{
          this.y += sign*this.speed;
        }
      }

      else{
        var sign = (xdiff)?(xdiff)<0?-1:1:0;
        if(this.x + sign*this.speed + this.width > this.xmax){
          this.x = this.xmax - this.width;
        }
        else if(this.x + sign*this.speed < this.xmin){
          this.x = this.xmin
        }
        else{
          this.x += sign*this.speed;
        }
      }
    }
    this.animation.x = this.x;
    this.animation.y = this.y;
  }

  collision() {
  //To Be Implemented
  }
}

class RNG extends Enemy{
  constructor(x, y, width, height, texture, shadowTexture, health, speed, xmin, xmax, ymin, ymax, endTime){
    super(x, y, width, height, texture, health, speed, xmin, xmax, ymin, ymax);
    console.log(shadowTexture);
    this.shadowTexture = shadowTexture;
    this.collidable = true;
    this.endTime = endTime;
    this.timer = 0;
    console.log("RNG Created");
  }

  movement(){
      if(this.timer == Math.floor(this.endTime/2)){
        this.throwShadow();
        this.timer++;
      }
      else if(this.timer == this.endTime){
        this.x = this.shadowAnimation.x;
        this.y = this.shadowAnimation.y;
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.collidable = true;
        gameScene.removeChild(this.shadowAnimation);
        this.timer = 0;
      }
      else{
        this.timer++;
      }
  }

  throwShadow(){
    var x = Math.floor((Math.random() * ((this.xmax - this.width) - this.xmin)) + this.xmin);
    var y = Math.floor((Math.random() * ((this.ymax - this.height) - this.ymin)) + this.ymin);
    this.collidable = false;
    this.shadowAnimation = new Movie(this.shadowTexture);
    this.shadowAnimation.x = x;
    this.shadowAnimation.y = y;
    this.shadowAnimation.animationSpeed = .25;
    gameScene.addChild(this.shadowAnimation);
    console.log("Shadow Created");

  }

  detach(){
    if(this.collidable == false){
      this.shadowAnimation.stop();
      gameScene.removeChild(this.shadowAnimation);
    }
    this.animation.stop();
    gameScene.removeChild(this.animation);
  }
}


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Items/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Item Class
//Base of All Items, not directly used
//Extension of Entity
class Item extends Entity{
  constructor(x, y, width, height, texture){
    super(x, y, width, height, texture);
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
  constructor(x, y, width, height, texture){
    super(x, y, width, height, texture);
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
  constructor(x, y, width, height, texture){
    super(x, y, width, height, texture);
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
  constructor(x, y, width, height, texture){
    super(x, y, width, height, texture);
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

//Projectile Class
//Base of All Bullets, not directly used
//Extension of Entity
class Projectile extends Entity{ //Base class is pretty simple
  constructor(x, y, width, height, texture, damage, VectorIn){
    super(x, y, width, height, texture);
    this.damage = damage;
    this.direction = new Vector(VectorIn.x, VectorIn.y);
    this.init();
  }

  //Will Be Defined for Each Type of Projectile
  trajectory(){
    // console.log("This Projectile is going places!");
  }
}

//Beam Class
//Extension of Projectile
class Beam extends Projectile{
  constructor(x, y, width, height, texture, damage, VectorIn){
    super(x, y, width, height, texture, damage, VectorIn);
    console.log("Beam Created");
  }
  trajectory(){
    this.x = Player.x; //Name of player? Reference wrong?
    // console.log("This Beam is NOT going places, but instead projecting from player to edge of screen!");
  }
  render(){

    //Stretch texture? For now surely we could just draw a long beam picture, optimization be damned.
  }
  collision(entity){
    console.log("This Beam hit something!");
    //No further methods, a beam won't dissapear or anything just because it hit something - instead it will exist across it's 'lifespan'
  }
  impulse(entity){
    if(entity instanceof Enemy){
      //Call the damage function
    }
  }
}

//Bullets Class
//Extension of Projectile
class Bullets extends Projectile{
  constructor(x, y, width, height, texture, damage, VectorIn){
    super(x, y, width, height, texture, damage, VectorIn);
    this.lifespan = 600; //lifespan variable is important for fading away
    // console.log("Bullets Created");
  }
  trajectory(){
    // console.log("These Bullets are going places!");
    this.x = this.x+this.direction.x*8;
    this.y = this.y-this.direction.y*8;

    this.animation.x = this.x;
    this.animation.y = this.y;

    this.lifespan -= 10;

    if(this.lifespan < 0) {
      this.detach();
      this.dead = true;
    }
  }
  render(){
    //Move sprite by VectorIn
  }
  collision(entity){
    //Delete this Bullet
  }
  impulse(entity){
    if(entity instanceof Enemy){
      entity.health -= this.damage;

	console.log("got hit by enemy!");
    }
  }
}

//Spread Class
//Extension of Projectile
class Spread extends Projectile{
  constructor(x, y, width, height, texture, damage, VectorIn){
    super(x, y, width, height, texture, damage, VectorIn);
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
    if(entity instanceof Enemy){
      //Call the damage function
    }
  }
}
