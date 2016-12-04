// Alias used modules.
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    Movie = PIXI.extras.MovieClip;


var stage = new Container(),
    gameScene = new Container(),
    gameOverScene = new Container(),
    startScene = new Container(),
    renderer = autoDetectRenderer(1000, 800);

document.body.appendChild(renderer.view);

loader
  .add('assets/tilesanim1.png')
  .add('assets/tilesanim2.png')
  .add('assets/tilesanim3.png')
  .add('assets/tilesanim4.png')
  .add('assets/tilesanim5.png')
  .add('assets/tilesanim6.png')
  .add('assets/GitGamePlayerSpriteSheet.png')
  .add('assets/RAMsheet.png')
  .add('assets/ERG.png')
  .add('assets/RNG_Explosion00.png')
  .add('assets/RNG_Explosion01.png')
  .add('assets/RNG_Explosion02.png')
  .add('assets/RNG_Explosion03.png')
  .add('assets/RNG_Explosion04.png')
  .add('assets/RNG_Explosion05.png')
  .add('assets/RNG_Explosion06.png')
  .add('assets/RNG_Explosion07.png')
  .add('assets/RNG_Explosion08.png')
  .add('assets/RNG_Explosion09.png')
  .add('assets/RNG_Explosion10.png')
  .add('assets/RNG_Explosion11.png')
  .add('assets/RNG_Explosion12.png')
  .add('assets/RNG_Explosion13.png')
  .add('assets/RNG_Explosion14.png')
  .add('assets/RNG_Explosion15.png')
  .add('assets/RNG_Marker.png')
  .add('assets/RecursionRifle.png')
  .add('assets/KeyValueDuals.png')
  .add('assets/MaxHeapBlunderbuss.png')
  .add('assets/RecursionProjectile.png')
  .add('assets/DualsProjectile.png')
  .add('assets/pickups.png')
  .load(setup);

tileFrames = {
  wall1: [],
  wall2: [],
  floor1: [],
  floor2: [],
  floor3: [],
  floor4: [],
  floor5: [],
  floor6: [],
  door1: [],
  door2: [],
  corner: [],
  warp: []
};

unitFrames = {
  player: [],
  erg: [],
  ram: [],
  ramCharge: [],
  rng: [],
  rngMarker: []
}

weaponTextures = {
  recursionRifle: null,
  keyValueDuals: null,
  maxHeapBlunderbuss: null
};

projectileTextures = {
  recursion: [],
  bullet: []
};

pickupTextures = {
	hitShieldTexture: null,
	doubleFireRateTexture: null,
	healthIncreaseTexture: null,
	enemySlowdownTexture: null,
	healthPickupTexture: null
};

// Manipulates loaded resources
function setup() {
  // Sprite sheet loading
  let numTileFrames = 1;
  for (var frame = 1; frame <= numTileFrames; frame++) {
    let texture = TextureCache['assets/tilesanim' + frame + '.png'];
    tileFrames.wall1.push(extractFrame(0, 0, 100, 100, texture));
    tileFrames.wall2.push(extractFrame(0, 1, 100, 100, texture));
    tileFrames.floor1.push(extractFrame(1, 0, 100, 100, texture));
    tileFrames.floor2.push(extractFrame(2, 0, 100, 100, texture));
    tileFrames.floor3.push(extractFrame(3, 0, 100, 100, texture));
    tileFrames.floor4.push(extractFrame(1, 1, 100, 100, texture));
    tileFrames.floor5.push(extractFrame(2, 1, 100, 100, texture));
    tileFrames.floor6.push(extractFrame(3, 1, 100, 100, texture));
    tileFrames.door1.push(extractFrame(1, 2, 100, 100, texture));
    tileFrames.door2.push(extractFrame(2, 2, 100, 100, texture));
    tileFrames.corner.push(extractFrame(0, 2, 100, 100, texture));
    tileFrames.warp.push(extractFrame(3, 2, 100, 100, texture));
  }
  // Reverses the a portion of the frames and concatenates to have animation pulse.
  // tileFrames.wall1 = tileFrames.wall1.concat(tileFrames.wall1.slice(1, tileFrames.wall1.length - 1).reverse());
  // tileFrames.wall2 = tileFrames.wall2.concat(tileFrames.wall2.slice(1, tileFrames.wall2.length - 1).reverse());
  // tileFrames.floor1 = tileFrames.floor1.concat(tileFrames.floor1.slice(1, tileFrames.floor1length - 1).reverse());
  // tileFrames.floor2 = tileFrames.floor2.concat(tileFrames.floor2.slice(1, tileFrames.floor2length - 1).reverse());
  // tileFrames.floor3 = tileFrames.floor3.concat(tileFrames.floor3.slice(1, tileFrames.floor3length - 1).reverse());
  // tileFrames.floor4 = tileFrames.floor4.concat(tileFrames.floor4.slice(1, tileFrames.floor4length - 1).reverse());
  // tileFrames.floor5 = tileFrames.floor5.concat(tileFrames.floor5.slice(1, tileFrames.floor5length - 1).reverse());
  // tileFrames.floor6 = tileFrames.floor6.concat(tileFrames.floor6.slice(1, tileFrames.floor6length - 1).reverse());
  // tileFrames.door1 = tileFrames.door1.concat(tileFrames.door1.slice(1, tileFrames.door1.length - 1).reverse());
  // tileFrames.door2 = tileFrames.door2.concat(tileFrames.door2.slice(1, tileFrames.door2.length - 1).reverse());
  // tileFrames.corner = tileFrames.corner.concat(tileFrames.corner.slice(1, tileFrames.corner.length - 1).reverse());
  // tileFrames.warp = tileFrames.warp.concat(tileFrames.warp.slice(1, tileFrames.warp.length - 1).reverse());

  let texture = TextureCache['assets/RAMsheet.png'];
  unitFrames.ram.push(extractFrame(0, 0, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 1, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 2, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 3, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 4, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 5, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 6, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 7, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 8, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 9, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 10, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 11, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 12, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 13, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 14, 150, 200, texture));
  unitFrames.ram.push(extractFrame(0, 15, 150, 200, texture));

  texture = TextureCache['assets/ERG.png'];
  unitFrames.erg.push(extractFrame(0, 0, 50, 50, texture));
  unitFrames.erg.push(extractFrame(1, 0, 50, 50, texture));
  unitFrames.erg.push(extractFrame(2, 0, 50, 50, texture));
  unitFrames.erg.push(extractFrame(3, 0, 50, 50, texture));

  for (var i = 0; i < 16; i++) {
    var num = null;
    if (i < 10) {
      num = '0' + i;
    } else {
      num = i;
    }
    texture = TextureCache['assets/RNG_Explosion' + num + '.png'];
    unitFrames.rng.push(texture);
  }
  texture = TextureCache['assets/RNG_Marker.png'];
  unitFrames.rngMarker.push(texture);

  let playerTiles = 16
  let playerTexture = TextureCache['assets/GitGamePlayerSpriteSheet.png'];
  for (var frame = 0; frame < 16; frame++) {
    unitFrames.player.push(extractFrame(frame, 0, 100, 100, playerTexture));
  }

  weaponTextures.recursionRifle = TextureCache['assets/RecursionRifle.png'];
  weaponTextures.keyValueDuals = TextureCache['assets/KeyValueDuals.png'];
  weaponTextures.maxHeapBlunderbuss = TextureCache['assets/MaxHeapBlunderbuss.png'];

  let recursionProjectileTexture = TextureCache['assets/RecursionProjectile.png'];
  projectileTextures.recursion.push(extractFrame(0, 0, 1000, 48, recursionProjectileTexture));
  
//pickups
 let allPickupTextures = TextureCache['assets/pickups.png'];
 
	pickupTextures.healthPickupTexture = extractFrame(0, 1, 40, 40, allPickupTextures);
	pickupTextures.hitShieldTexture = extractFrame(1, 1, 40, 40, allPickupTextures);
	pickupTextures.doubleFireRateTexture = extractFrame(0, 0, 40, 40, allPickupTextures);
	pickupTextures.healthIncreaseTexture = extractFrame(1, 0, 40, 40, allPickupTextures);
	pickupTextures.enemySlowdownTexture = extractFrame(2, 0, 40, 40, allPickupTextures);
  
  // End sprite sheet loading
  stage.addChild(gameScene);
  console.log('Setup complete');
}
