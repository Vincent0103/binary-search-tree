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

  function insert(val, currentRoot = this.root) {
    if (typeof val !== 'number') return null;
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

  function deleteNode(val, currentRoot = this.root) {
    // return null if value not in BST
    if (!currentRoot) return null;

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

    // if the target value is the first node from the original rootBST
    if (val === rootNode.data) {
      if (leftNode && rightNode) deleteWhenTwoChilds(rootNode);
      else if (leftNode) this.root = leftNode;
      else if (rightNode) this.root = rightNode;
      return root;
    }

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

  function find(val, currentRoot = this.root) {
    if (!currentRoot) return null;

    if (val > currentRoot.data) {
      return find(val, currentRoot.right);
    } if (val < currentRoot.data) {
      return find(val, currentRoot.left);
    } if (val === currentRoot.data) {
      return currentRoot;
    }

    // edge case
    return null;
  }

  function levelOrder(callback, queue = [], currentRoot = this.root) {
    if (currentRoot.left) queue.push(currentRoot.left);
    if (currentRoot.right) queue.push(currentRoot.right);
    if (queue.length > 0) {
      return [(callback) ? callback(currentRoot.data) : currentRoot.data]
        .concat(levelOrder(callback, queue, queue.shift()));
    }
    if (!callback) return (callback) ? callback(currentRoot.data) : currentRoot.data;
    return null;
  }

  function preorder(callback, currentRoot = this.root) {
    if (!currentRoot.left && !currentRoot.right) {
      return (callback) ? callback(currentRoot.data) : currentRoot.data;
    }
    if (!currentRoot.left) {
      return [(callback) ? callback(currentRoot.data) : currentRoot.data]
        .concat(preorder(callback, currentRoot.right));
    }
    if (!currentRoot.right) {
      return [(callback) ? callback(currentRoot.data) : currentRoot.data]
        .concat(preorder(callback, currentRoot.left));
    }

    // edge case
    if (!currentRoot) return null;

    return [(callback) ? callback(currentRoot.data) : currentRoot.data]
      .concat(preorder(callback, currentRoot.left), preorder(callback, currentRoot.right));
  }

  function inorder(callback, currentRoot = this.root) {
    if (!currentRoot.left && !currentRoot.right) {
      return (callback) ? callback(currentRoot.data) : currentRoot.data;
    }
    if (!currentRoot.left) {
      return [(callback) ? callback(currentRoot.data) : currentRoot.data]
        .concat(inorder(callback, currentRoot.right));
    }
    if (!currentRoot.right) {
      return [(callback) ? callback(currentRoot.data) : currentRoot.data]
        .concat(inorder(callback, currentRoot.left));
    }

    return [].concat(
      inorder(callback, currentRoot.left),
      (callback) ? callback(currentRoot.data) : currentRoot.data,
      inorder(callback, currentRoot.right),
    );
  }

  function postorder(callback, currentRoot = this.root) {
    if (!currentRoot.left && !currentRoot.right) {
      return (callback) ? callback(currentRoot.data) : currentRoot.data;
    }
    if (!currentRoot.left) {
      return [].concat(
        postorder(callback, currentRoot.right),
        (callback) ? callback(currentRoot.data) : currentRoot.data,
      );
    }
    if (!currentRoot.right) {
      return [].concat(
        postorder(callback, currentRoot.left),
        (callback) ? callback(currentRoot.data) : currentRoot.data,
      );
    }

    return [].concat(
      postorder(callback, currentRoot.left),
      postorder(callback, currentRoot.right),
      (callback) ? callback(currentRoot.data) : currentRoot.data,
    );
  }

  function height(currentRoot = this.root) {
    if (!currentRoot.left && !currentRoot.right) return 1;
    if (!currentRoot.left) return height(currentRoot.right) + 1;
    if (!currentRoot.right) return height(currentRoot.left) + 1;
    if (currentRoot.left && currentRoot.right) {
      const leftValue = height(currentRoot.left);
      const rightValue = height(currentRoot.right);
      return (leftValue > rightValue) ? leftValue + 1 : rightValue + 1;
    }
    return null;
  }

  function depth(node, currentRoot = this.root) {
    if (!currentRoot || !node) return null;
    if (node.data === currentRoot.data) return 0;
    if (node.data > currentRoot.data) {
      const rightNodeDepth = depth(node, currentRoot.right);
      return (rightNodeDepth !== null) ? rightNodeDepth + 1 : rightNodeDepth;
    }
    const leftNodeDepth = depth(node, currentRoot.left);
    return (leftNodeDepth !== null) ? leftNodeDepth + 1 : leftNodeDepth;
  }

  function isBalanced(currentRoot = this.root) {
    if (currentRoot.left && currentRoot.right) {
      if (Math.abs(height(currentRoot.left) - height(currentRoot.right)) > 1) {
        return false;
      }
      return !(!isBalanced(currentRoot.left) || !isBalanced(currentRoot.right));
    }
    return true;
  }

  function rebalance(currentRoot = this.root) {
    if (this.isBalanced()) return currentRoot;
    const nodeArr = this.levelOrder();
    const alterNodeArr = removeDuplicates(mergeSort(nodeArr));
    this.root = buildTree(alterNodeArr);
    return this.root;
  }

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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

export default Tree;
export { prettyPrint };
