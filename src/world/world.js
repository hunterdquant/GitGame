/*
  The world class is used to interact with the data structure representation of the game.
*/
class World {

  constructor() {
    this.envGraph = null;
    this.nodes = {};
    this.currentNode = null;
  }

  generateWorld(metadata) {
    // Clear on new generation.
    this.envGraph.clear();
    let parsedMeta = JSON.parse(metadata);

    // Iterate over commit strings to build nodes.
    for (commit in parsedMeta.commits) {
      let node = nodes[commit];

      // If node wasn't previously defined, by being a parent of a previous node, then create a new one.
      if (nodes[commit] === null || nodes[commit] === undefined) {
        node = new EnvNode();
        node.hash = commit;
      }

      // If there is one parent then we want to have the relationship be bidirectional.
      // This is because of difficulty scaling by graph depth using BFS.
      if (parsedMeta.commits[commit].parents.length === 1) {
        let parent = parsedMeta.commits[commit].parents[0];
        // If the parent doesn't already exist create it preemptively.
        if (nodes[parent] === null || nodes[parent] === undefined) {
          nodes[parent] = new EnvNode();
          nodes[parent].hash = parent;
        }

        // Ensure bidirection and specify parent.
        node.neighbors.push(parent);
        node.parents.push(parent);
        this.nodes[parent].neighbors.push(commit);

      // This is a merge point and we want it to be directional.
      } else if (parsedMeta.commits[commit].parents.length > 1) {
        // This has reference to parents but parent doesnt have a reference to this.
        for (parent of parsedMeta.commits[commit].parents) {
          node.neighbors.push(parent);
          node.parents.push(parent);
        }
      }

      // Add the new node to nodes.
      nodes[commit] = node;
    }

    // Create the graph and generate it.
    this.envGraph = new EnvironmentGraph(nodes);
    this.envGraph.generateGraph();

    // Find the initial node. This should be the one with no parents :(
    let init = null;
    for (node in nodes) {
      if (node.parents.length === 0) {
        init = node;
      }
    }

    // Run BFS to get depth from init to any other node. This will give us depth, which we'll
    // use later to scale difficulty.
    bfs(init);

    // Now that we've used BFS we want to ensure all nodes are bidirectional.
    for (node in nodes) {
      for (neighbor of node.neighbors) {
        if (!nodes[neighbor].neighbors.contains[node.hash]) {
          nodes[neighbor].neighbors.push(node.hash);
        }
      }
    }

    // Update the graph.
    this.envGraph.generateGraph();

    // After building the data structure generate the node data.
    for (commit in parsedMeta.commits) {
      nodes[commit].generateNode(parsedMeta.commits[commit]);
    }

    this.currentNode = init;
  }

  update(inputBundle) {
    if (currentNode !== null) {
      currentNode.update(inputBundle);
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
    for (node of this.nodes) {
      if (node.hash === nodeHash) {
        return node;
      }
    }
    return null;
  }

  /*
    Adds all nodes to the graph and runs a bfs to set depth aka difficulty for each node from the root.
  */
  createGraph() {
    for (node of this.nodes) {
      this.addNode(node);
    }
  }

  /*
    Runs a breadth first search on the graph.
  */
  bfs(startNode) {
    var q = new Queue();
    // First pair has not inner edge.
    q.push([null, node.hash]);
    while (!q.isEmpty()) {
      let edge = q.pop();
      let u = getNode(edge[0]);
      let v = getNode(edge[1]);
      if (!v.visited) {
        v.visited = true;
        v.parentHash = edge[0];
        if (u === null) {
          v.depth = 0;
        } else {
          v.depth = u.depth + 1;
        }
        for (neighborHash of v.neighbors) {
          q.push([v.hash, neighborHash]);
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
    for (adjacentHash of envNode.neighbors) {
      this.graph[nodeHash].push(adjacentHash);
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

  }

  /*
    Updates the state of the node, this includes all entities.
    inputBundle - an object containing information about user input.
  */
  update(inputBundle) {
    console.log('Updating current node');
    updateTiles();
    updatePlayer(inputBundle);
    updateEntities();
    console.log();
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
    console.log('Player ' + this.player);
  }

  /*
    This function will render all non player entities and update their state.
  */
  updateEntities() {
    console.log('Entities ' + this.entities);
  }

  init() {
    for (tile of tileSet) {
      tile.init();
    }


  }

  render() {

  }

  detach() {

  }
}

class Tile extends Collidable {
  constructor(x, y, width, height, frames) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.animation = PIXI.extras.MovieClip(frames);
    this.animation.animationSpeed = 1.5;
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
  constructor(x, y, width, height, texture, nodeHash) {
    super(x, y, width, height, texture, tile);
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
