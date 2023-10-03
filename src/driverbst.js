import Tree, { prettyPrint } from './bst.js';
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

function createRandomArray(length) {
  return (length > 1)
    ? [Math.floor(Math.random() * 100)].concat(createRandomArray(length - 1))
    : [Math.floor(Math.random() * 100)];
}

function createRandomBST(length = 100) {
  const newArray = removeDuplicates(mergeSort(createRandomArray(length)));
  const treeNode = Tree(newArray);
  return treeNode;
}

const treeNode = createRandomBST(28);
prettyPrint(treeNode.root);
console.log(treeNode.isBalanced());
console.log(treeNode.levelOrder());
console.log(treeNode.preorder());
console.log(treeNode.inorder());
console.log(treeNode.postorder());
treeNode.insert(102);
treeNode.insert(135);
treeNode.insert(1026);
treeNode.insert(243);
treeNode.insert(2498);
treeNode.insert(348);
treeNode.insert(8392);
treeNode.insert(1409724);
treeNode.insert(321);
treeNode.insert(539);
treeNode.insert(742);
treeNode.insert(24853);
prettyPrint(treeNode.root);
console.log(treeNode.isBalanced());
treeNode.rebalance();
console.log(treeNode.isBalanced());
console.log(treeNode.levelOrder());
console.log(treeNode.preorder());
console.log(treeNode.inorder());
console.log(treeNode.postorder());
prettyPrint(treeNode.root);
