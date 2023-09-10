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
        const rightRoot = currentRoot.right;
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

  function deleteNode(val, currentRoot = root) {
    const leftNode = currentRoot.left;
    const rightNode = currentRoot.right;
    const rootNode = currentRoot;

    const deleteWhenTwoChilds = (node) => {
      const alterNode = node;
      if (!alterNode.right.left) {
        alterNode.data = alterNode.right.data;
        alterNode.right = alterNode.right.right;
      } else {
        alterNode.data = alterNode.right.left.data;
        alterNode.right.left = alterNode.right.left.right;
      }
    };

    if (leftNode && val === leftNode.data) {
      if (!leftNode.left && !leftNode.right) rootNode.left = null;
      else if (leftNode.left && leftNode.right) deleteWhenTwoChilds(leftNode);
      else if (leftNode.left) rootNode.left = leftNode.left;
      else if (leftNode.right) rootNode.left = leftNode.right;
      return root;
    }

    if (rightNode && val === rightNode.data) {
      if (!rightNode.left && !rightNode.right) rootNode.right = null;
      else if (rightNode.left && rightNode.right) deleteWhenTwoChilds(rightNode);
      else if (rightNode.left) rootNode.right = rightNode.left;
      else if (rightNode.right) rootNode.right = rightNode.right;
      return root;
    }

    if (val > rootNode.data) deleteNode(val, rightNode);
    else if (val < rootNode.data) deleteNode(val, leftNode);
    return null;
  }

  return { root, insert, deleteNode };
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
treeNode.deleteNode(4);
prettyPrint(treeNode.root);
