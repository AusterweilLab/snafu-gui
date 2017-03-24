// Grab graph from JSON of opening page
var g = window.opener.network_properties.graph;

// find neighbors function
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
});


// Graph object
s = new sigma({
    graph: g,
    container: 'graph-container',
    renderer: {
        container: document.getElementById('graph-container'),
        type: 'canvas'
    },
    settings: {
        minNodeSize: 8,
        maxNodeSize: 16,
        labelColor: 'node'
    }
});

// Initialize node positions at random
// http://stackoverflow.com/questions/21795125/json-is-not-read-by-sigma-js
var i,
    nodes = s.graph.nodes(),
    lennodes = nodes.length;

for (i = 0; i < lennodes; i++) {
    nodes[i].x = Math.random();
    nodes[i].y = Math.random();
    nodes[i].size = s.graph.degree(nodes[i].id);
    nodes[i].color = nodes[i].center ? '#333' : '#666';
}

// Refresh the display and apply layout
s.refresh();
s.startForceAtlas2({ linLogMode: true });

// Add functions to click on graph and see neighbors [from sigma.js examples]


// We first need to save the original colors of our
// nodes and edges, like this:
s.graph.nodes().forEach(function(n) {
    n.originalColor = n.color;
});
s.graph.edges().forEach(function(e) {
    e.originalColor = e.color;
});

// When a node is clicked, we check for each node
// if it is a neighbor of the clicked one. If not,
// we set its color as grey, and else, it takes its
// original color.
// We do the same for the edges, and we only keep
// edges that have both extremities colored.
s.bind('clickNode', function(e) {
   var nodeId = e.data.node.id,
     toKeep = s.graph.neighbors(nodeId);
 toKeep[nodeId] = e.data.node;

 s.graph.nodes().forEach(function(n) {
   if (toKeep[n.id])
     n.color = n.originalColor;
   else
     n.color = '#eee';
 });

 s.graph.edges().forEach(function(e) {
   if (toKeep[e.source] && toKeep[e.target])
     e.color = e.originalColor;
   else
     e.color = '#eee';
 });

 // Since the data has been modified, we need to
 // call the refresh method to make the colors
 // update effective.
 s.refresh();
});

// When the stage is clicked, we just color each
// node and edge with its original color.
s.bind('clickStage', function(e) {
 s.graph.nodes().forEach(function(n) {
   n.color = n.originalColor;
 });

 s.graph.edges().forEach(function(e) {
   e.color = e.originalColor;
 });

 // Same as in the previous event:
 s.refresh();
});
    

var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
dragListener.bind('startdrag', function(event) {
s.killForceAtlas2();
});
