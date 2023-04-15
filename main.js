"use strict";

class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

function merge(left, right) {
  const newArr = [];
  const totalLength = left.length + right.length;
  let leftIndex = 0;
  let rightIndex = 0;

  for (let value = 0; value < totalLength; value++) {
    if (left[leftIndex] > right[rightIndex]) {
      newArr.push(right[rightIndex]);
      rightIndex++;
      if (rightIndex === right.length) {
        newArr.push(...left.slice(leftIndex));
        return newArr;
      }
    } else {
      newArr.push(left[leftIndex]);
      leftIndex++;
      if (leftIndex === left.length) {
        newArr.push(...right.slice(rightIndex));
        return newArr;
      }
    }
  }
  return newArr;
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    const halfIndex = Math.floor(array.length / 2);

    const leftHalf = array.slice(0, halfIndex);
    const rightHalf = array.slice(halfIndex);

    const leftHalfSorted = mergeSort(leftHalf);
    const rightHalfSorted = mergeSort(rightHalf);

    return merge(leftHalfSorted, rightHalfSorted);
  }
}

// find middle and make it root, then perform the same operation
// on the lft subarray for the roots left child
// the same operation for the right subbarray for root's right child

// Set The middle element of the array as root.
// Recursively do the same for the left half and right half.
// Get the middle of the left half and make it the left child of the root created in step 1.
// Get the middle of the right half and make it the right child of the root created in step 1.

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  insert(value) {
    const result = this.#insertRec(this.root, value);
  }

  #insertRec(root, value) {
    /*
     * If the tree is empty, return a new node
     */
    if (root == null) {
      root = new Node(value);
      return root;
    }

    /* Otherwise, recur down the tree */
    if (value < root.data) root.left = this.#insertRec(root.left, value);
    else if (value > root.data) root.right = this.#insertRec(root.right, value);

    /* return the (unchanged) node pointer */
    return root;
  }

  find(root, value) {
    if (root.data === value) return root;

    if (root.data > value) {
      root.left = this.find(root.left, value);
      return root.left;
    } else if (root.data < value) {
      root.right = this.find(root.right, value);
      return root.right;
    }
  }

  deleteNode(root, value) {
    // Base case
    if (root == null) return root;

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > value) {
      root.left = this.deleteNode(root.left, value);
      return root;
    } else if (root.data < value) {
      root.right = this.deleteNode(root.right, value);
      return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;

      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      // Delete successor. Since successor
      // is always left child of its parent
      // we can safely make successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ->right to succParent->right
      if (succParent != root) succParent.left = succ.right;
      else succParent.right = succ.right;

      // Copy Successor Data to root
      root.data = succ.data;

      return root;
    }
  }

  levelOrder(root, func = null) {
    const queue = [root];
    const result = [];
    if (func === null) {
      return this.#levelOrderRecNoFunc(root, queue, result);
    }
    return this.#levelOrderRec(root, queue, func);
  }

  #levelOrderRecNoFunc(root, queue, result) {
    if (root.data === null) return null;
    result.push(queue[0].data);
    if (root.left !== null) {
      queue.push(root.left);
    }
    if (root.right !== null) {
      queue.push(root.right);
    }

    queue.shift();
    if (!queue[0]) return result;
    this.#levelOrderRecNoFunc(queue[0], queue, result);
    return result;
  }

  #levelOrderRec(root, queue, func) {
    if (root.data === null) return null;

    func(queue[0]);
    if (root.left !== null) {
      queue.push(root.left);
    }
    if (root.right !== null) {
      queue.push(root.right);
    }

    queue.shift();
    if (!queue[0]) return;
    this.#levelOrderRec(queue[0], queue, func);
  }

  #inorderRecNoFunc(root, result) {
    if (root !== null) {
      this.#inorderRecNoFunc(root.left, result);
      result.push(root.data);
      this.#inorderRecNoFunc(root.right, result);
    }
    return result;
  }

  #inorderRec(root, func) {
    if (root !== null) {
      this.#inorderRec(root.left, func);
      func(root.data);
      this.#inorderRec(root.right, func);
    }
  }

  inorder(func = null) {
    const result = [];
    if (!func) {
      this.#inorderRecNoFunc(this.root, result);
      return result;
    } else {
      this.#inorderRec(this.root, func);
    }
  }

  #preorderRecNoFunc(root, result) {
    if (root !== null) {
      result.push(root.data);
      this.#preorderRecNoFunc(root.left, result);
      this.#preorderRecNoFunc(root.right, result);
    }
    return result;
  }

  #preorderRec(root, func) {
    if (root !== null) {
      func(root.data);
      this.#preorderRec(root.left, func);
      this.#preorderRec(root.right, func);
    }
  }

  preorder(func = null) {
    const result = [];
    if (!func) {
      this.#preorderRecNoFunc(this.root, result);
      return result;
    } else {
      this.#preorderRec(this.root, func);
    }
  }

  #postorderRecNoFunc(root, result) {
    if (root !== null) {
      this.#postorderRecNoFunc(root.left, result);
      this.#postorderRecNoFunc(root.right, result);
      result.push(root.data);
    }
    return result;
  }

  #postorderRec(root, func) {
    if (root !== null) {
      this.#postorderRec(root.left, func);
      this.#postorderRec(root.right, func);
      func(root.data);
    }
  }

  postorder(func = null) {
    const result = [];
    if (!func) {
      this.#postorderRecNoFunc(this.root, result);
      return result;
    } else {
      this.#postorderRec(this.root, func);
    }
  }

  height(root) {
    if (root === null) return 0;

    let lHeight = this.height(root.left);
    let rHeight = this.height(root.right);

    if (lHeight > rHeight) {
      return lHeight + 1;
    } else {
      return rHeight + 1;
    }
  }

  depth(node, root, depth = 0) {
    if (root === null || node === null) return;
    // if (node === root) return depth;
    if (node === root) return `Depth: ${depth}`;
    if (node.data < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  isBalanced(root) {
    const lHeight = this.height(root.left);
    const rHeight = this.height(root.right);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2 ? "true" : "false";
  }

  rebalance(root) {
    console.log("HERE");
    let arr = this.levelOrder(root);
    console.log(arr);
    return (this.root = buildTree(arr));
  }
}

function buildTree(arr) {
  const sortedArray = mergeSort(arr);
  console.log(sortedArray);
  return sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
}

function sortedArrayToBST(arr, start, end) {
  // Base case
  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  const mid = parseInt((start + end) / 2);
  // console.log(mid)
  const node = new Node(arr[mid]);
  // Recursively constuct the left subtree and make it left child of root
  node.left = sortedArrayToBST(arr, start, mid - 1);
  // Recursively constuct the right subtree and make it right child of root
  node.right = sortedArrayToBST(arr, mid + 1, end);
  console.log(node);
  return node;
}

// JUST FOR PRINTING

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 2, 3, 4, 5, 6, 7];

const BST = new Tree(arr);
prettyPrint(BST.root);
BST.insert(8);
prettyPrint(BST.root);
BST.insert(9);
prettyPrint(BST.root);
BST.insert(-2);
prettyPrint(BST.root);
BST.deleteNode(BST.root, 1);
prettyPrint(BST.root);
BST.deleteNode(BST.root, 2);
prettyPrint(BST.root);
// console.log(BST.find(BST.root, 8));
BST.levelOrder(BST.root, console.log);
// console.log(BST.levelOrder(BST.root));
// console.log(BST.inorder());
// console.log(BST.preorder());
// console.log(BST.postorder());
// console.log(BST.height(BST.root));
prettyPrint(BST.root);
BST.rebalance(BST.root);
prettyPrint(BST.root);
