/*
  The world class is used to interact with the data structure representation of the game.
*/
class World {

  constructor() {
    this.envGraph = new EnvironmentGraph();
    this.nodes = [];
    this.currentNode = null;
  }

  createWorld(metadata) {
    console.log("Creating world");
    this.envGraph.clear();
  }

  update(inputBundle) {
    if (currentNode !== null) {
      currentNode.update(inputBundle);
    }
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
    for (node in this.nodes) {
      this.addNode(node);
    }

    this.bfs(nodes[0]);
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
  renderGraph() {

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
      this.parentHash = null;
      this.visited = false;
      this.entities = {};
  }

  /*
    Parses metadata into a node.
  */
  generateNode(metadata) {
    console.log('Node metadata ' + metadata);
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
