var gameWorld = new World();

function gameLoop() {
  requestAnimationFrame(gameLoop);

  gameState();

  renderer.render(stage);
}

var readyToPlay = false;

// This is temporary workaround for waiting on resource loading.
function playListener() {
  readyToPlay = true;
}

// Input mappings. To be filled
inputBundle = {
  // Player movement - WASD
  87: false,
  83: false,
  65: false,
  68: false,
  // Projectile vector parameters - Arrows
  37: false,
  38: false,
  39: false,
  40: false
}

gameStates = {
  play: function() {
          gameWorld.update(inputBundle);
        },
  win: function() {},
  lose: function() {},
  start: function() {
           if (readyToPlay) {
             gameWorld.generateWorld('{"repo_name": "acm-website-revamp","commits_num": 19,"head_commit": "644a40687d8741014277ce021cfd415a0ee0f681","commits": {"644a40687d8741014277ce021cfd415a0ee0f681": {"parents": ["99979eebcedc15c100db17cfae521c17cb428b86"],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7},"99979eebcedc15c100db17cfae521c17cb428b86": {"parents": [],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7}}}');
             gameWorld.init();
             gameState = gameStates.play;
           }
         }
};

function extractFrame(x, y, width, height, texture) {
  let rectangle = new Rectangle(x*width, y*height, width, height);
  let retTex = texture.clone();
  retTex.frame = rectangle;
  return retTex;
}

function keyDown(event) {
  var key = event.keyCode;
  if (key === 38 || key === 39 || key === 40 || key === 37 ||
      key === 87 || key === 83 || key === 65 || key === 68)
    inputBundle[key] = true;
}

function keyUp(event) {
  var key = event.keyCode;
  if (key === 38 || key === 39 || key === 40 || key === 37 ||
      key === 87 || key === 83 || key === 65 || key === 68)
      inputBundle[key] = false;
}

gameState = gameStates.start;
gameLoop();
