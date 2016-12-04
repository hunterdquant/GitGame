var gameWorld = new World();

var metadata = "";

function gameLoop() {
  requestAnimationFrame(gameLoop);

  gameState();

  renderer.render(stage);
}

var readyToPlay = false;

// This is temporary workaround for waiting on resource loading.
function playListener() {
  let form = document.getElementById('repoForm');
  let data = form.elements[0].value;

  let [username, repo_name] = data.split('/');

  fetch(`http://localhost:3000/repo/${username}/${repo_name}`)
    .then(res => {
      res.json().then(data => {
        metadata = data;
        readyToPlay = true;
      });
    }); 
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
  40: false,
  // Start, Pause, Resume, Restart - Space
  32: false
}

var maintext = null;
var subtext = null;
gameStates = {
  play: function() {
          if(inputBundle[32]){
            gameState = gameStates.pause;
            inputBundle[32] = false;
            gameWorld.stopAnimation();
          }
          else{
            gameWorld.update(inputBundle);
            if (gameWorld.currentNode.leaving) {
              gameWorld.changeNode();
            }
          }
        },
  win: function() {
        if (maintext === null && subtext === null) {
          maintext = new PIXI.Text("You Won!!", {fontFamily : "Terminal", fontSize : 50});
          subtext = new PIXI.Text("Press Space to Restart", {fontFamily : "Terminal", fontSize : 30});
        }
        gameScene.addChild(maintext);
        gameScene.addChild(subtext);
        maintext.setTransform(200, 250);
        subtext.setTransform(400, 300);
        if(inputBundle[32]) {
          gameState = gameStates.start;
          inputBundle[32] = false;
          gameWorld.startAnimation();
          gameScene.removeChild(maintext);
          gameScene.removeChild(subtext);
          maintext = null;
          subtext = null;
          }
        },

  lose: function() {
        if (maintext === null && subtext === null) {
          gameWorld.stopAnimation();
          maintext = new PIXI.Text("You lost....", {fontFamily : "Terminal", fontSize : 50});
          subtext = new PIXI.Text("Press Space to Restart", {fontFamily : "Terminal", fontSize : 30});
        }
        gameScene.addChild(maintext);
        gameScene.addChild(subtext);
        maintext.setTransform(425, 250);
        subtext.setTransform(400, 300);
        if(inputBundle[32]) {
          gameState = gameStates.start;
          inputBundle[32] = false;
          gameWorld.startAnimation();
          gameScene.removeChild(maintext);
          gameScene.removeChild(subtext);
          maintext = null;
          subtext = null;
        }
      },

  pause: function() {
        if (maintext === null && subtext === null) {
          maintext = new PIXI.Text("The Game is Currently Paused", {fontFamily : "Terminal", fontSize : 50});
          subtext = new PIXI.Text("Press Space to Resume", {fontFamily : "Terminal", fontSize : 30});
        }
        gameScene.addChild(maintext);
        gameScene.addChild(subtext);
        maintext.setTransform(200, 250);
        subtext.setTransform(400, 300);
        if(inputBundle[32]) {
          gameState = gameStates.play;
          inputBundle[32] = false;
          gameWorld.startAnimation();
          gameScene.removeChild(maintext);
          gameScene.removeChild(subtext);
          maintext = null;
          subtext = null;
          }
        },

  start: function() {
           if (readyToPlay) {
             gameWorld.generateWorld('{"repo_name": "acm-website-revamp","commits_num": 19,"head_commit": "644a40687d8741014277ce021cfd415a0ee0f681","commits": {"644a40687d8741014277ce021cfd415a0ee0f681": {"parents": ["99979eebcedc15c100db17cfae521c17cb428b86"],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7},"99979eebcedc15c100db17cfae521c17cb428b86": {"parents": [],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7}}}');
             gameState = gameStates.startScreen;
             gameWorld.init();
             gameWorld.stopAnimation();
           }
  },

  startScreen: function() {
        if (maintext === null && subtext === null) {
          maintext = new PIXI.Text("The Game is Ready to Start", {fontFamily : "Terminal", fontSize : 50});
          subtext = new PIXI.Text("Press Space to Start", {fontFamily : "Terminal", fontSize : 30});
        }
        gameScene.addChild(maintext);
        gameScene.addChild(subtext);
        maintext.setTransform(250, 250);
        subtext.setTransform(400, 300);
        if(inputBundle[32]) {
          gameState = gameStates.play;
          inputBundle[32] = false;
          gameWorld.startAnimation();
          gameScene.removeChild(maintext);
          gameScene.removeChild(subtext);
          maintext = null;
          subtext = null;
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
  if(key === 32){
    inputBundle[key] = inputBundle[key] ^ true;
  }

}

gameState = gameStates.start;
gameLoop();
