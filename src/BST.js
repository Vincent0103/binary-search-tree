/* eslint-disable import/extensions */
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(arr) {
  this.root = buildTree(arr);
  return { root };
}

function buildTree(arr) {
  const len = arr.length;
  if (len - 1 < 0) return null;
  const mid = Math.floor((len - 1) / 2);
  const root = Node(arr[mid], buildTree(arr.slice(0, mid)), buildTree(arr.slice(mid + 1, len)));
  return root;
}

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
const treeNode = buildTree(alterList);
console.log(prettyPrint(treeNode));
