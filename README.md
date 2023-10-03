
# Binary Search Trees

this program implement using recursion the concept of binary search trees, a type of data structure like arrays.

## Demo

-> [src/driverbst.js](https://github.com/Vincent0103/binary-search-tree/blob/main/src/driverbst.js)

## Usage/Examples

```javascript
const treeNode = createRandomBST(28); // creates a random n elements BST tree
prettyPrint(treeNode.root); // prints the BST but prettier with nodes and clear indication of it's childs
console.log(treeNode.isBalanced());

// return the treeNode based on different depth-first or breadth-first level order
console.log(treeNode.levelOrder());
console.log(treeNode.preorder());
console.log(treeNode.inorder());
console.log(treeNode.postorder());

// inserts new elements into the treeNode
treeNode.insert(102);
treeNode.insert(278);
treeNode.insert(742);
treeNode.deleteNode(28); // deletes node from the given parameter, if node isn't present, it deletes nothing
treeNode.find(27); // returns the node containing the value from the parameter else returns null
treeNode.height(); // returns the height defined as the number of edges in longest path from a given node to a leaf node
treeNode.depth(); // return the depth defined as the number of edges in path from a given node to the tree’s root node.

treeNode.rebalance(); // rebalances the tree if you inserted new elements into it

```

