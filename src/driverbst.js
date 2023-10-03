import Tree from './bst.js';
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

function createRandomArray(length) {
  return (length > 1)
    ? [Math.floor(Math.random() * 100)].concat(createRandomArray(length - 1))
    : [Math.floor(Math.random() * 100)];
}

function createRandomBST(length = 100) {
  const newArray = removeDuplicates(mergeSort(createRandomArray(length)));
  return newArray;
}

console.log(createRandomBST(28));
