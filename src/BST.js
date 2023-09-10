/* eslint-disable import/extensions */
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

const Node = (data, left = null, right = null) => ({ data, left, right });

const buildTree = (arr) => {
  const len = arr.length;
  if (len - 1 < 0) return null;
  const mid = Math.floor((len - 1) / 2);
  const root = Node(arr[mid], buildTree(arr.slice(0, mid)), buildTree(arr.slice(mid + 1, len)));
  return root;
};

const Tree = (arr) => {
  const root = buildTree(arr);

  function insert(val, currentRoot = root) {
    if (val > currentRoot.data) {
      if (!currentRoot.right) {
        const rightRoot = currentRoot;
        rightRoot.right = Node(val);
        return root;
      }
      return insert(val, currentRoot.right);
    }
    if (!currentRoot.left) {
      const leftRoot = currentRoot;
      leftRoot.left = Node(val);
      return root;
    }
    return insert(val, currentRoot.left);
  }

  return { root, insert };
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const alterList = removeDuplicates(mergeSort(list));
const treeNode = Tree(alterList);
// console.log(prettyPrint(treeNode.root));
console.log(prettyPrint(treeNode.insert(18)));
console.log(prettyPrint(treeNode.insert(119)));
