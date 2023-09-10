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
  if (arr.length - 1 > 0) {
    const mid = Math.floor((arr.length - 1) / 2);
    buildTree(arr.slice(0, mid + 1));
    const node1 = Node(arr[mid]);
    buildTree(arr.slice(mid + 1, arr.length));
    const node2 = Node(arr[mid]);
    console.log(node1, node2);
  } else {
    return null;
  }
}
const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const alterList = removeDuplicates(mergeSort(list));
console.log(alterList);
