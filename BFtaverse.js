// Complete Implementation of a Queue
function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};

// Complete Implementation of a Tree
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};




// EXECUTION

// var tree = new Tree('one');
 
// tree._root.children.push(new Node('two'));
// tree._root.children[0].parent = tree;
 
// tree._root.children.push(new Node('three'));
// tree._root.children[1].parent = tree;
 
// tree._root.children.push(new Node('four'));
// tree._root.children[2].parent = tree;
 
// tree._root.children[0].children.push(new Node('five'));
// tree._root.children[0].children[0].parent = tree._root.children[0];
 
// tree._root.children[0].children.push(new Node('six'));
// tree._root.children[0].children[1].parent = tree._root.children[0];
 
// tree._root.children[2].children.push(new Node('seven'));
// tree._root.children[2].children[0].parent = tree._root.children[2];


var tree = { "children" : [ { "children" : [ { "children" : [  ],
              "data" : "five",
              "parent" : null
            },
            { "children" : [  ],
              "data" : "six",
              "parent" : null
            }
          ],
        "data" : "two",
        "parent" : null
      },
      { "children" : [  ],
        "data" : "three",
        "parent" : null
      },
      { "children" : [ { "children" : [  ],
              "data" : "seven",
              "parent" : null
            } ],
        "data" : "four",
        "parent" : null
      }
    ],
  "data" : "one",
  "parent" : null
};

/*
 
creates this tree
 
 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven
 
*/


console.log(tree);

// tree.traverseBF(function(node) {
//     console.log("/================================/");
//     console.log(node.data);
//     console.log("/================================/");
// });


