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

  for (let k = 0; k < totalLength; k++) {
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

  delete(value) {}
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
  console.log(mid);
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
