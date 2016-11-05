/*
  The world class is used to interact with the data structure representation of the game.
*/
class World {

  constructor() {
    this.envGraph = null;
    this.nodes = {};
    this.currentNode = null;
    this.player = null;
  }

  generateWorld(metadata) {
    // Clear on new generation.
    if (this.envGraph !== null) {
      this.envGraph.clear();
    }
    let parsedMeta = JSON.parse(metadata);
    console.log(parsedMeta.commits);
    // Iterate over commit strings to build nodes.
    for (var commit in parsedMeta.commits) {
      let node = this.nodes[commit];

      // If node wasn't previously defined, by being a parent of a previous node, then create a new one.
      if (this.nodes[commit] === null || this.nodes[commit] === undefined) {
        node = new EnvNode();
        node.hash = commit;
      }

      // If there is one parent then we want to have the relationship be bidirectional.
      // This is because of difficulty scaling by graph depth using BFS.
      if (parsedMeta.commits[commit].parents.length === 1) {
        let parent = parsedMeta.commits[commit].parents[0];
        // If the parent doesn't already exist create it preemptively.
        if (this.nodes[parent] === null || this.nodes[parent] === undefined) {
          this.nodes[parent] = new EnvNode();
          this.nodes[parent].hash = parent;
        }

        // Ensure bidirection and specify parent.
        node.neighbors.push(parent);
        node.parents.push(parent);
        this.nodes[parent].neighbors.push(commit);

      // This is a merge point and we want it to be directional.
      } else if (parsedMeta.commits[commit].parents.length > 1) {
        // This has reference to parents but parent doesnt have a reference to this.
        for (var parent of parsedMeta.commits[commit].parents) {
          node.neighbors.push(parent);
          node.parents.push(parent);
        }
      }

      // Add the new node to nodes.
      this.nodes[commit] = node;
    }

    // Create the graph and generate it.
    this.envGraph = new EnvironmentGraph(this.nodes);
    this.envGraph.generateGraph();

    // Find the initial node. This should be the one with no parents :(
    let init = null;
    for (var node in this.nodes) {
      if (this.nodes[node].parents.length === 0) {
        init = this.nodes[node];
      }
    }

    // Run BFS to get depth from init to any other node. This will give us depth, which we'll
    // use later to scale difficulty.
    this.envGraph.bfs(init);

    // Now that we've used BFS we want to ensure all nodes are bidirectional.
    for (var node in this.nodes) {
      for (var neighbor in this.nodes[node].neighbors) {
        // Get the hash of the neighbor.
        let neighborHash = this.nodes[node].neighbors[neighbor];
        // If the neighbor doesn't contain this node, then add this node as a neighbor.
        if (this.nodes[neighborHash].neighbors.indexOf(this.nodes[node].hash) < 0) {
          this.nodes[neighborHash].neighbors.push(this.nodes[node].hash);
        }
      }
    }

    // Update the graph.
    this.envGraph.generateGraph();

    // After building the data structure generate the node data.
    for (var commit in parsedMeta.commits) {
      this.nodes[commit].generateNode(parsedMeta.commits[commit]);
    }

    this.currentNode = init;
  }

  update(inputBundle) {
    if (this.currentNode !== null) {
      this.currentNode.update(inputBundle);
    }
  }

  init() {
    if (this.currentNode !== null) {
      this.player = new Player(100, (this.currentNode.height/3)*100, unitFrames.player, 100);
      this.currentNode.player = this.player;
      this.currentNode.init();
      this.currentNode.player.init();
    }
  }

  getCurrentNode() {
    return this.currentNode;
  }
}

/*
  The EnvironmentGraph is the data structure representation of the game.
*/
class EnvironmentGraph {

  constructor(nodes) {
    this.nodes = nodes;
    this.graph = {};
  }

  getNode(nodeHash) {
    for (var node in this.nodes) {
      if (this.nodes[node].hash === nodeHash) {
        return this.nodes[node];
      }
    }
    return null;
  }

  /*
    Adds all nodes to the graph and runs a bfs to set depth aka difficulty for each node from the root.
  */
  generateGraph() {
    for (var node in this.nodes) {
      this.addNode(this.nodes[node]);
    }
  }

  /*
    Runs a breadth first search on the graph.
  */
  bfs(startNode) {
    var q = new Queue();
    // First pair has not inner edge.
    q.push([null, startNode.hash]);
    while (!q.isEmpty()) {
      let edge = q.pop();
      let u = this.getNode(edge[0]);
      let v = this.getNode(edge[1]);
      if (!v.visited) {
        v.visited = true;
        v.parentHash = edge[0];
        if (u === null) {
          v.depth = 0;
        } else {
          v.depth = u.depth + 1;
        }
        for (var neighborHash in v.neighbors) {
          q.push([v.hash, v.neighbors[neighborHash]]);
        }
      }
    }
  }

  /*
    Adds a node to the graph.
  */
  addNode(envNode) {
    let nodeHash = envNode.hash;
    this.graph[nodeHash] = [];
    for (var adjacentHash in envNode.neighbors) {
      this.graph[nodeHash].push(envNode.neighbors[adjacentHash]);
    }
  }

  /*
    Will render the graph overtop of the current scene.
  */
  render() {

  }

  /*
    Clear ths graph.
  */
  clear() {
    this.graph = {};
  }
}

/*
  A EnvNode is a single component of the game, in this case it represents a single room.
  A node has a list of tiles and entities that live inside of the node.
  The contents of a node is what will be rendered.
*/
class EnvNode {

  constructor() {
      this.hash = '';
      // Default room dimensions
      this.width = 10;
      this.height = 8;
      this.tileSet = [];
      this.verticalTileCount = 0;
      this.horizontalTileCount = 0;
      this.player = {};
      this.depth = 0;
      this.neighbors = [];
      this.parents = [];
      this.visited = false;
      this.entities = {};
  }

  /*
    Parses data for a commit into a node.
  */
  generateNode(commitData) {
    // Resize if needed.
    if (this.parents.length > this.height - 2) {
      // Set height to the number of nodes needed plus the top and bottom walls.
      this.height = this.parents.length + 2;
    }

    // If there are more outgoing then top and bottom walls.
    if (this.neighbors.length - this.parents.length > 2*(this.width - 2)) {
      this.width = this.neighbors.length - this.parents.length + 2;
    }

    this.tileSet = new Array(this.width);
    for (var i = 0; i < this.tileSet.length; i++) {
      this.tileSet[i] = new Array(this.height);
    }


    //The four corners are produced:
    this.tileSet[0][0] = new Wall(0, 0, 1, -1, 100, 100, tileFrames.corner);
    this.tileSet[0][this.height - 1] = new Wall(0, 100*(this.height - 3), 1, 1, 100, 100, tileFrames.corner);
    this.tileSet[this.width - 1][0] = new Wall(100*(this.width - 3), 0, -1, -1, 100, 100, tileFrames.corner);
    this.tileSet[this.width - 1][this.height - 1] = new Wall(100*(this.width - 3), 100*(this.height - 3), -1, 1, 100, 100, tileFrames.corner);

		//The floor is produced
    for (var i = 1; i < this.width - 3; i++) {
      for (var j = 1; j < this.height - 3; j++) {
        this.tileSet[i][j] = new Floor(100*i, 100*j, 1, 1, 100, 100, tileFrames['floor' + (Math.floor(Math.random()*6) + 1)]);
      }
    }

  	//The Left Handed (Parent) doors are produced
  	var Pindex = Math.round((this.height-2)/2); //A cute little indexing variable <3
  	var direction = true; //True = up, false = down
  	var jump = 1;

  	for(var parent of this.parents){
  		this.tileSet[0][Pindex] = new Door(0, 100*Pindex, 1, 1, 100, 100, tileFrames.door2, parent);
  		if(direction){
  			Pindex = Pindex + jump;
  			direction = false;
  			jump++;
  		}else{
  			Pindex = Pindex - jump;
  			direction = true;
  			jump++;
  		}
  	}

  	//And the remaining doors, the children, are produced.
  	Pindex = Math.round((this.height-2)/2);
  	direction = true;
  	jump = 1;

    for(var neighbor of this.neighbors){
      if(this.parents.includes(neighbor) == false){ //Only do them doors that are not part of parents already :)))))
        this.tileSet[this.width-1][Pindex] = new Door(100*(this.width-3), 100*Pindex, -1, 1, 100, 100, tileFrames.door1, neighbor);
        if(direction){
          Pindex = Pindex + jump;
          direction = false;
          jump++;
        } else {
          Pindex = Pindex - jump;
          direction = true;
          jump++;
        }
	    }
    }

  	//The remaining walls are produced
  	for(var i = 1; i<this.height - 3; i++){

  		if(this.tileSet[0][i] == null){
  			this.tileSet[0][i] = new Wall(0, (100*i), 1, 1, 100, 100, tileFrames.wall1); //Left Walls
  		}
  		if(this.tileSet[this.width-1][i] == null){
  			this.tileSet[this.width - 1][i] = new Wall(100*(this.width-3), (100*i), -1, 1, 100, 100, tileFrames.wall1); //Right walls
  		}
  	}
  	for(var i = 1; i<this.width - 3; i++){
  			this.tileSet[i][0] = new Wall( (100*i), 0, 1, 1, 100, 100, tileFrames.wall2); //Top Walls
  			this.tileSet[i][this.height-1] = new Wall((100*i), 100*(this.height-3), 1, -1, 100, 100, tileFrames.wall2); //Bottom Walls
  	}
  }

  /*
    Updates the state of the node, this includes all entities.
    inputBundle - an object containing information about user input.
  */
  update(inputBundle) {
    // this.updateTiles();
    this.updatePlayer(inputBundle);
    // this.updateEntities();
  }

  /*
    This will render all backgroud game tiles.
  */
  updateTiles() {
    console.log('Tiles ' + this.tileSet);
  }

  /*
    This function will update player state and render the player entity.
  */
  updatePlayer(inputBundle) {
    let x = 0;
    let y = 0;
    // W
    if (inputBundle[87]) {
      y -= this.player.moveStep;
    }
    // S
    if (inputBundle[83]) {
      y += this.player.moveStep;
    }
    // A
    if (inputBundle[65]) {
      x -= this.player.moveStep;
    }
    // D
    if (inputBundle[68]) {
      x += this.player.moveStep;
    }
    this.player.movement(x, y);
    // UP/DOWN
    if (inputBundle[38]) {
      y = 1
    } else if (inputBundle[40]) {
      y = -1;
    } else {
      y = 0;
    }
    // LEFT/RIGHT
    if (inputBundle[37]) {
      x = -1
    } else if (inputBundle[39]) {
      x = 1;
    } else {
      x = 0;
    }
    if (x !== 0 || y !== 0) {
      this.player.attack({x:x,y:y});
    }
  }

  /*
    This function will render all non player entities and update their state.
  */
  updateEntities() {
    console.log('Entities ' + this.entities);
  }

  init() {
    for (var col in this.tileSet) {
      for (var row in this.tileSet[col]) {
        if (this.tileSet[col][row] !== undefined) {
          this.tileSet[col][row].init();
        }
      }
    }
  }

  render() {

  }

  detach() {

  }
}

class Tile {
  constructor(x, y, xScale, yScale, width, height, frames) {
    this.x = x;
    this.y = y;
    this.xScale = xScale;
    this.yScale = yScale;
    this.width = width;
    this.height = height;
    this.animation = new Movie(frames);
    if (xScale === -1) {
      this.x += width;
    }
    this.animation.scale.x = this.xScale;
    if (yScale === -1) {
      this.y += height;
    }
    this.animation.scale.y = this.yScale;
    this.animation.x = this.x;
    this.animation.y = this.y;
    this.animation.animationSpeed = .15;
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

class Door extends Tile {
  constructor(x, y, xScale, yScale, width, height, frames, nodeHash) {
    super(x, y, xScale, yScale, width, height, frames);
    this.nodeHash = nodeHash;
  }
}

class Floor extends Tile {
}

class Wall extends Tile {
  // Should probably be moved to player collision function when entities is merged in.
  impulse(entity) {
    if (entity instanceof Player) {
      if (this.x + this.width > entity.x) {
        entity.x = this.x + this.width;
      } else if (this.x > entity.x + entity.width) {
        entity.x = this.x - entity.x;
      } else if (this.y + this.height > entity.y) {
        entity.y = this.y + this.height;
      } else if (this.y > entity.y + entity.width) {
        entity.y = this.y - entity.y;
      }
    }
  }
}

class Warp extends Tile {
  collision(entity) {
    if (entity instanceof Player) {
      gameState = gameStates.win;
    }
  }
}

/*
  A simple queue.
*/
class Queue {
  constructor() {
    this.elements = [];
  }

  push(elem) {
    this.elements.push(elem);
  }

  pop() {
    return this.elements.shift();
  }

  peek() {
    return this.elements[0];
  }

  size() {
    return this.elements.length;
  }

  isEmpty() {
    return this.elements.length == 0;
  }
}
console.log('loaded');
