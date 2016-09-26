  //Entity Class
  //Base of all Entities, not directly used
  var Entity = function (){
    this.position = NULL;
    this.asset = NULL;
  }

  //Will Be Defined for Each Unit
  Entity.prototype.collision = function(){
  }



  //Unit Class
  //Base of Different Units, not directly used
  //Extension of Entity
  function Unit(){
    Entity.call();
    this.health = NULL;
  }

  Unit.prototype = Object.create(Entity.prototype);
  Unit.prototype.contructor = Unit;

  //Will Be Defined for Each Unit
  Unit.prototype.movement = function(){
  }
  Unit.protoype.attack = function(){
  }



  //Player Class
  //Extension on Unit
  function Player(health, asset, position, weapon, subWeapon){
    Unit.call();
    this.health = health;
    this.asset = asset;
    this.position = position;

    this.weapon = weapon;
    this.subWeapon = subWeapon;
  }

  Player.prototype = Object.create(Unit.prototype);
  Player.protype.constructor = Player;

  Player.prototype.movement = function(){
  //To Be Implemented
  }

  Player.protoype.attack = function(){
  //To Be Implemented
  }

  Player.protoype.collision = function(){
  //To Be Implemented
  }




  //Enemy Class
  //Extension of Unit
  function Enemy(health, asset, position){
    Unit.call();
    this.health = health;
    this.asset = asset;
    this.position = position;
  }

  Enemy.prototype = Object.create(Unit.prototype);
  Enemy.protype.constructor = Enemy;

  Enemy.prototype.movement = function(){
  //To Be Implemented
  }

  Enemy.protoype.attack = function(){
  //To Be Implemented
  }

  Enemy.protoype.collision = function(){
  //To Be Implemented
  }



  //Item Class
  //Base of All Items, not directly used
  //Extension of Entity
  funciton Item(){
    Entity.call();
  }

  Item.prototype = Object.create(Entity.prototype);
  Item.prototype.contructor = Item;

  //Will Be Defined for Each Item
  Item.prototype.modifier = function(){
  }



  //Bullet Class
  //Base of All Bullets, not directly used
  //Extension of Entity
  funciton Bullet(){
    Entity.call();
    this.damage = NULL;
  }

  Bullet.prototype = Object.create(Entity.prototype);
  Bullet.prototype.contructor = Bullet;

  //Will Be Defined for Each Type of Bullet
  Bullet.prototype.trajectory = function(){
  }




  //Beam Class
  //Extension of Bullet
  function Beam(damage, asset, position){
    Bullet.call();
    this.damage = damage;
    this.asset = asset;
    this.position = position;
  }

  Beam.prototype = Object.create(Bullet.prototype);
  Beam.prototype.contructor = Beam;

  Beam.prototype.trajectory = function(){
  //To be Implemented
  }

  Beam.prototype.collision = function(){
  //To be Implemented
  }


  //Bullets Class
  //Extension of Bullet
  function Bullets(damage, asset, position){
    Bullet.call();
    this.damage = damage;
    this.asset = asset;
    this.position = position;
  }

  Bullets.prototype = Object.create(Bullet.prototype);
  Bullets.prototype.contructor = Bullets;

  Bullets.prototype.trajectory = function(){
  //To be Implemented
  }

  Bullets.prototype.collision = function(){
  //To be Implemented
  }


  //Spread Class
  //Extension of Bullet
  function Spread(damage, asset, position){
    Bullet.call();
    this.damage = damage;
    this.asset = asset;
    this.position = position;
  }

  Spread.prototype = Object.create(Bullet.prototype);
  Spread.prototype.contructor = Spread;

  Spread.prototype.trajectory = function(){
  //To be Implemented
  }

  Spread.prototype.collision = function(){
  //To be Implemented
  }




  //Weapon Class
  //Base of All Weapons, not directly used
  //Extension of Entity
  function Weapon(){
    Entity.call();
    this.shoots = NULL;
  }

  Weapon.prototype = Object.create(Entity.prototype);
  Weapon.prototype.contructor = Weapon;


  //Recursion Rifle Class
  //Extension of Weapon
  function RecursionRifle(position, asset){
    Weapon.call();
    this.position = position;
    this.asset = asset;
  }

  RecursionRifle.prototype = Object.create(Weapon.prototype);
  RecursionRifle.prototype.contructor = RecursionRifle;

  RecursionRifle.prototype.collision = function(){
    //To Be Implemented
  }


  //Key Value Duals Class
  //Extension of Weapon
  function KeyValueDuals(position, asset){
    Weapon.call();
    this.position = position;
    this.asset = asset;
  }

  KeyValueDuals.prototype = Object.create(Weapon.prototype);
  KeyValueDuals.prototype.contructor = KeyValueDuals;

  KeyValueDuals.prototype.collision = function(){
    //To Be Implemented
  }


  //Max Heap Blunderbuss Class
  //Extension of Weapon
  function MaxHeapBlunderbuss(position, asset){
    Weapon.call();
    this.position = position;
    this.asset = asset;
  }

  MaxHeapBlunderbuss.prototype = Object.create(Weapon.prototype);
  MaxHeapBlunderbuss.prototype.contructor = MaxHeapBlunderbuss;

  MaxHeapBlunderbuss.prototype.collision = function(){
    //To Be Implemented
  }









  //Equiped Weapon Class
  //Base of all Equiped Weapon, not directly used
  var EquipedWeapon = function (){
    this.ammo = NULL;
    this.shoots = NULL;
    this.position = NULL;
    this.asset = NULL;
  }

  //Equiped Max Heap Blunderbuss Class
  //Extension of Equiped Weapon
  function EquipedMaxHeapBlunderbuss(ammo, position, asset){
    EquipedWeapon.call();
    this.ammo = ammo;
    this.shoots = "Spread";
    this.position = position;
    this.asset = asset;
  }

  EquipedMaxHeapBlunderbuss.prototype = Object.create(EquipedWeapon.prototype);
  EquipedMaxHeapBlunderbuss.prototype.contructor = EquipedMaxHeapBlunderbuss;


  //Equiped Key Value Duals Class
  //Extension of Equiped Weapon
  function EquipedKeyValueDuals(ammo, position, asset){
    EquipedWeapon.call();
    this.ammo = ammo;
    this.shoots = "Bullets";
    this.position = position;
    this.asset = asset;
  }

  EquipedKeyValueDuals.prototype = Object.create(EquipedWeapon.prototype);
  EquipedKeyValueDuals.prototype.contructor = EquipedKeyValueDuals;



  //Equiped Recursion Rifle Class
  //Extension of Equiped Weapon
  function EquipedRecursionRifle(ammo, position, asset){
    EquipedWeapon.call();
    this.ammo = ammo;
    this.shoots = "Beam";
    this.position = position;
    this.asset = asset;
  }

  EquipedRecursionRifle.prototype = Object.create(EquipedWeapon.prototype);
  EquipedRecursionRifle.prototype.contructor = RecursionRifle;
