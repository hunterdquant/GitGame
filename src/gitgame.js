
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
    renderer = autoDetectRenderer(800, 600);

var gameWorld = new World();

document.body.appendChild(renderer.view);

loader
  .add("assets/tilesanim1.png")
  .add("assets/tilesanim2.png")
  .add("assets/tilesanim3.png")
  .add("assets/tilesanim4.png")
  .add("assets/tilesanim5.png")
  .add("assets/tilesanim6.png")
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

// Manipulates loaded resources
function setup() {
  // Sprite sheet loading
  let numTileFrames = 6;
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
  tileFrames.wall1 = tileFrames.wall1.concat(tileFrames.wall1.slice(1, tileFrames.wall1.length - 1).reverse());
  tileFrames.wall2 = tileFrames.wall2.concat(tileFrames.wall2.slice(1, tileFrames.wall2.length - 1).reverse());
  tileFrames.floor1 = tileFrames.floor1.concat(tileFrames.floor1.slice(1, tileFrames.floor1length - 1).reverse());
  tileFrames.floor2 = tileFrames.floor2.concat(tileFrames.floor2.slice(1, tileFrames.floor2length - 1).reverse());
  tileFrames.floor3 = tileFrames.floor3.concat(tileFrames.floor3.slice(1, tileFrames.floor3length - 1).reverse());
  tileFrames.floor4 = tileFrames.floor4.concat(tileFrames.floor4.slice(1, tileFrames.floor4length - 1).reverse());
  tileFrames.floor5 = tileFrames.floor5.concat(tileFrames.floor5.slice(1, tileFrames.floor5length - 1).reverse());
  tileFrames.floor6 = tileFrames.floor6.concat(tileFrames.floor6.slice(1, tileFrames.floor6length - 1).reverse());
  tileFrames.door1 = tileFrames.door1.concat(tileFrames.door1.slice(1, tileFrames.door1.length - 1).reverse());
  tileFrames.door2 = tileFrames.door2.concat(tileFrames.door2.slice(1, tileFrames.door2.length - 1).reverse());
  tileFrames.corner = tileFrames.corner.concat(tileFrames.corner.slice(1, tileFrames.corner.length - 1).reverse());
  tileFrames.warp = tileFrames.warp.concat(tileFrames.warp.slice(1, tileFrames.warp.length - 1).reverse());
  // End sprite sheet loading
  stage.addChild(gameScene);
  gameState = gameStates.play;

  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  gameState();

  renderer.render(stage);
}

gameStates = {
  play: function() {
          let currentNode = gameWorld.getCurrentNode();
          //currentNode.update();
          //currentNode.render();
        },
  win: function() {},
  lose: function() {},
  start: function() {}
};

function extractFrame(x, y, width, height, texture) {
  let rectangle = new Rectangle(x*width, y*height, width, height);
  let retTex = texture.clone();
  retTex.frame = rectangle;
  return retTex;
}
