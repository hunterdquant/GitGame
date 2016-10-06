var gameWorld = new World();

function gameLoop() {
  requestAnimationFrame(gameLoop);

  gameState();

  renderer.render(stage);
}
eh = 0;

function okay() {
  gameWorld.generateWorld('{"repo_name": "acm-website-revamp","commits_num": 19,"head_commit": "644a40687d8741014277ce021cfd415a0ee0f681","commits": {"644a40687d8741014277ce021cfd415a0ee0f681": {"parents": ["99979eebcedc15c100db17cfae521c17cb428b86"],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7},"99979eebcedc15c100db17cfae521c17cb428b86": {"parents": [],"message": "Adding footer links","author": "Benjamin Lannon <lannonbr@clarkson.edu>","insertions": 7,"deletions": 7}}}');
  gameLoop();
}

gameStates = {
  play: function() {
          let currentNode = gameWorld.getCurrentNode();
          if (eh < 1) {
            eh++;
            currentNode.init();
          }
          currentNode.update();
          currentNode.render();
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

gameState = gameStates.play;
